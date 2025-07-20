import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';
import axiosWithToken from '../utils/axiosWithToken';
import logo from '../assets/logo-full.png'; // تأكد من المسار الصحيح

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
            if (orderRes.data.success) purchased.push(course._id);
          } catch {
            continue;
          }
        }
        setPurchasedProducts(purchased);
      } catch (err) {
        if (err.response?.status === 401) {
          alert('يرجى تسجيل الدخول للوصول إلى المنتجات');
          navigate('/login');
        } else {
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
      setPurchasedProducts((prev) => [...prev, course._id]);
    } catch (err) {
      if (err.response?.status === 409) {
        alert("لقد اشتريت هذا المنتج مسبقًا.");
        setPurchasedProducts((prev) => [...prev, course._id]);
      } else if (err.response?.status === 401) {
        alert("انتهت الجلسة. يرجى تسجيل الدخول.");
        navigate("/login");
      } else {
        alert("حدث خطأ أثناء تنفيذ الطلب");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <img src={logo} alt="background logo" style={bgLogoStyle} />

      <h2 style={headingStyle}>{text.availableProducts || 'Available Courses'}</h2>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#fff' }}>جاري التحميل...</p>
      ) : (
        <div style={gridStyle}>
          {products.map((product) => (
            <div key={product._id} style={cardStyle}>
              <div style={imagePlaceholder}>
                {product.image && (
                  <img src={product.image} alt={product.name} style={imgStyle} />
                )}
              </div>

              <h3 style={titleStyle}>{product.name}</h3>
              <p style={descriptionStyle}>{product.description}</p>
              <p style={priceStyle}>{text.price || 'السعر'}: ${product.price}</p>

              {expandedId === product._id && (
                <p style={detailStyle}>{text.category || 'الفئة'}: {product.category}</p>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  onClick={() => setExpandedId(expandedId === product._id ? null : product._id)}
                  style={learnBtnStyle}
                >
                  {expandedId === product._id ? text.hideDetails || 'إخفاء' : text.learnMore || 'تفاصيل'}
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

// Styles
const containerStyle = {
  position: 'relative',
  padding: '3rem 2rem',
  background: 'linear-gradient(135deg, #2c003e, #007bff)',
  minHeight: '100vh',
  fontFamily: 'Nizzoli Rta, sans-serif',
  overflow: 'hidden',
};

const bgLogoStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  opacity: 0.035,
  zIndex: 0,
};

const headingStyle = {
  textAlign: 'center',
  color: '#00FFFF',
  marginBottom: '2rem',
  fontSize: '2.5rem',
  fontFamily: 'Nizzoli Rta, sans-serif',
  zIndex: 1,
  position: 'relative',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  zIndex: 1,
  position: 'relative',
};

const cardStyle = {
  padding: '1.5rem',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(200,200,255,0.1))',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  color: '#fff',
  transition: 'transform 0.3s ease',
};

const imagePlaceholder = {
  height: '150px',
  marginBottom: '1rem',
  borderRadius: '8px',
  overflow: 'hidden',
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  fontFamily: 'Nizzoli Rta, sans-serif',
};

const descriptionStyle = {
  fontSize: '14px',
  color: '#e0e0e0',
  fontFamily: 'Aktiv Grotesk, sans-serif',
};

const priceStyle = {
  fontSize: '16px',
  color: '#00FFFF',
  fontWeight: 'bold',
};

const detailStyle = {
  fontSize: '13px',
  fontStyle: 'italic',
  color: '#aaf',
};

const btnStyleBase = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontFamily: 'Aktiv Grotesk, sans-serif',
};

const learnBtnStyle = {
  ...btnStyleBase,
  backgroundColor: '#17a2b8',
  color: '#fff',
};

const buyBtnStyle = {
  ...btnStyleBase,
  backgroundColor: '#28a745',
  color: '#fff',
};

const watchBtnStyle = {
  ...btnStyleBase,
  backgroundColor: '#ffc107',
  color: '#000',
};

export default Products;
