import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';
import axiosWithToken from '../utils/axiosWithToken';

function Products() {
  const { text } = useContext(LanguageContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosWithToken.get("/courses");
        const courses = res.data.data;
        setProducts(courses);

        const purchased = [];
        for (const course of courses) {
          try {
            const orderRes = await axiosWithToken.get(`/courses/${course._id}/order`);
            if (orderRes.data.success) {
              purchased.push(course._id);
            }
          } catch (err) {
            continue; // لو مفيش طلب، عادي
          }
        }
        setPurchasedProducts(purchased);

      } catch (err) {
        if (err.response?.status === 401) {
          alert('يرجى تسجيل الدخول للوصول إلى المنتجات');
          navigate('/login');
        } else {
          console.error('فشل تحميل المنتجات:', err.message);
          alert('حدث خطأ أثناء تحميل المنتجات');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBuyNow = async (course) => {
    try {
      const res = await axiosWithToken.post(`/courses/${course._id}/place`, {
        paymentMethod: "credit_card",
      });
      console.log("Order Placed:", res.data);
      setPurchasedProducts((prev) => [...prev, course._id]);
    } catch (err) {
      if (err.response?.status === 409) {
        alert("لقد اشتريت هذا المنتج مسبقًا.");
        setPurchasedProducts((prev) => [...prev, course._id]);
      } else if (err.response?.status === 401) {
        alert("انتهت الجلسة. يرجى تسجيل الدخول.");
        navigate("/login");
      } else {
        console.error("فشل تنفيذ الطلب:", err.response?.data?.message || err.message);
        alert("حدث خطأ أثناء تنفيذ الطلب");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {text.availableProducts || 'المنتجات المتاحة'}
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>جاري التحميل...</p>
      ) : (
        <div style={gridStyle}>
          {products.map((product) => (
            <div
              key={product._id}
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div style={imagePlaceholder}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>

              <h3 style={titleStyle}>{product.name}</h3>
              <p style={descriptionStyle}>{product.description}</p>
              <p style={priceStyle}>
                {text.price || 'السعر'}: ${product.price}
              </p>

              {expandedId === product._id && (
                <p style={detailStyle}>
                  {text.category || 'الفئة'}: {product.category}
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  onClick={() => setExpandedId(expandedId === product._id ? null : product._id)}
                  style={learnBtnStyle}
                >
                  {expandedId === product._id
                    ? text.hideDetails || 'إخفاء التفاصيل'
                    : text.learnMore || 'تفاصيل أكثر'}
                </button>

                {purchasedProducts.includes(product._id) ? (
                  <button onClick={() => navigate(`/product/${product._id}`)} style={watchBtnStyle}>
                    {text.watch || 'عرض'}
                  </button>
                ) : (
                  <button onClick={() => handleBuyNow(product)} style={buyBtnStyle}>
                    {text.buyNow || 'اشترِ الآن'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// -------------------- Styles --------------------
const containerStyle = {
  padding: '2rem',
  backgroundColor: '#f8f9fa',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
};

const cardStyle = {
  padding: '1.5rem',
  border: '1px solid #ddd',
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const imagePlaceholder = {
  width: '100%',
  height: '150px',
  backgroundColor: '#e9ecef',
  borderRadius: '8px',
  marginBottom: '1rem',
  overflow: 'hidden',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#343a40',
  marginBottom: '0.5rem',
};

const descriptionStyle = {
  fontSize: '14px',
  color: '#555',
};

const detailStyle = {
  fontSize: '14px',
  color: '#444',
  marginTop: '0.5rem',
  fontStyle: 'italic',
};

const priceStyle = {
  fontWeight: 'bold',
  color: '#007bff',
  fontSize: '16px',
  marginTop: '0.5rem',
};

const learnBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#17a2b8',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const buyBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const watchBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#ffc107',
  color: '#000',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default Products;
