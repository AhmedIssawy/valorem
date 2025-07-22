import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';
import axiosWithToken from '../utils/axiosWithToken';
import logo from '../assets/logo-full.png';

function Products() {
  const { text } = useContext(LanguageContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [hovered, setHovered] = useState({ title: false });
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
    <>
      {/* Brand-compliant CSS styles */}
      <style jsx>{`
        .products-container {
          font-family: var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif);
        }
        
        .products-heading {
          font-family: var(--font-primary, 'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideInDown 0.8s ease-out;
        }
        
        .products-grid {
          animation: fadeInUp 0.8s ease-out 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
          opacity: 0;
          animation: cardFadeIn 0.6s ease-out forwards;
        }
        
        .product-card:nth-child(1) { animation-delay: 0.1s; }
        .product-card:nth-child(2) { animation-delay: 0.2s; }
        .product-card:nth-child(3) { animation-delay: 0.3s; }
        .product-card:nth-child(4) { animation-delay: 0.4s; }
        .product-card:nth-child(5) { animation-delay: 0.5s; }
        .product-card:nth-child(6) { animation-delay: 0.6s; }
        
        .product-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(76, 29, 149, 0.2) !important;
        }
        
        .product-image {
          transition: transform 0.3s ease;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        
        .btn {
          font-family: var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: var(--font-weight-medium, 500);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide, 0.025em);
        }
        
        .btn:hover {
          transform: translateY(-2px);
        }
        
        .btn-details:hover {
          background-color: var(--color-electric-blue-dark, #2563eb) !important;
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }
        
        .btn-buy:hover {
          background-color: var(--color-neo-mint-dark, #059669) !important;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
        }
        
        .btn-watch:hover {
          background-color: var(--color-deep-violet-dark, #3730a3) !important;
          color: var(--color-white, #ffffff) !important;
          box-shadow: 0 6px 20px rgba(76, 29, 149, 0.3);
        }
        
        .loading-text {
          animation: pulse 2s infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.1); }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .products-heading {
            font-size: 2.5rem !important;
          }
          
          .products-grid {
            grid-template-columns: 1fr !important;
          }
          
          .content-container {
            padding: 2rem !important;
            margin: 1rem !important;
          }
        }
      `}</style>
      
      <div className="products-container" style={containerStyle}>
        {/* Background Logo - Same as Home */}
        <img src={logo} alt="Valorem Logo" style={backgroundLogoStyle} />
        
        {/* Floating Shapes - Same as Home */}
        <div style={shape1Style}></div>
        <div style={shape2Style}></div>
        <div style={shape3Style}></div>

        {/* Main Content Container */}
        <div className="content-container" style={contentContainerStyle}>
          <h2 
            className="products-heading" 
            style={{
              ...headingStyle,
              ...(hovered.title ? titleHoverStyle : {})
            }}
            onMouseEnter={() => setHovered({ ...hovered, title: true })}
            onMouseLeave={() => setHovered({ ...hovered, title: false })}
          >
            {text.availableProducts || 'Available Courses'}
          </h2>

          {loading ? (
            <p className="loading-text" style={loadingStyle}>
              جاري التحميل...
            </p>
          ) : (
            <div className="products-grid" style={gridStyle}>
              {products.map((product, index) => (
                <div key={product._id} className="product-card" style={cardStyle}>
                  <div style={imagePlaceholder}>
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                        style={imgStyle} 
                      />
                    )}
                  </div>

                  <h3 style={titleStyle}>{product.name}</h3>
                  <p style={descriptionStyle}>{product.description}</p>
                  <p style={priceStyle}>
                    {text.price || 'السعر'}: 
                    <span style={priceValueStyle}>${product.price}</span>
                  </p>

                  {expandedId === product._id && (
                    <div style={detailContainerStyle}>
                      <p style={detailStyle}>
                        {text.category || 'الفئة'}: {product.category}
                      </p>
                    </div>
                  )}

                  <div style={buttonGroupStyle}>
                    <button
                      onClick={() => setExpandedId(expandedId === product._id ? null : product._id)}
                      className="btn btn-details"
                      style={detailsBtnStyle}
                    >
                      {expandedId === product._id ? 
                        (text.hideDetails || 'إخفاء') : 
                        (text.learnMore || 'تفاصيل')
                      }
                    </button>

                    {purchasedProducts.includes(product._id) ? (
                      <button 
                        onClick={() => navigate(`/product/${product._id}`)} 
                        className="btn btn-watch"
                        style={watchBtnStyle}
                      >
                        {text.watch || 'عرض'}
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleBuyNow(product)} 
                        className="btn btn-buy"
                        style={buyBtnStyle}
                      >
                        {text.buyNow || 'اشترِ الآن'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Animated Gradient Line - Same as Home */}
        <div style={gradientLineStyle}></div>
      </div>
    </>
  );
}

// ========== STYLES - Updated to match Home ==========
const containerStyle = {
  position: 'relative',
  minHeight: '100vh',
  background: `
    linear-gradient(135deg, 
      #4c1d95 0%,    /* Deep Violet */
      #3730a3 25%,   /* Deep Violet Dark */
      #3b82f6 50%,   /* Electric Blue */
      #06b6d4 75%,   /* Bright Cyan */
      #10b981 100%   /* Neo Mint */
    )
  `,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  overflow: 'hidden',
  fontFamily: `var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif)`,
};

const backgroundLogoStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxWidth: '800px',
  opacity: 0.03,
  zIndex: 0,
  filter: 'blur(1px)',
};

const contentContainerStyle = {
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1400px',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  padding: '3rem',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
  margin: '2rem 0',
};

const headingStyle = {
  textAlign: 'center',
  color: '#ffffff',
  marginBottom: '3rem',
  fontSize: '4rem',        // Using --font-size-6xl equivalent
  fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif", // Primary font
  fontWeight: 700,         // Bold
  letterSpacing: '-0.025em', // Tight letter spacing
  lineHeight: 1.25,        // Tight line height
  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  cursor: 'default',
};

const titleHoverStyle = {
  transform: 'scale(1.02) translateY(-5px)',
  color: '#10b981',          // Neo Mint on hover
  textShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
};

const loadingStyle = {
  textAlign: 'center',
  color: '#ffffff',
  fontSize: '1.25rem',       // --font-size-xl
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif", // Secondary font
  fontWeight: 400,           // Regular
  lineHeight: 1.75,          // Relaxed line height
  textShadow: '0 2px 15px rgba(255, 255, 255, 0.1)',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '2rem',
  width: '100%',
};

const cardStyle = {
  padding: '2rem',
  borderRadius: '1rem',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  color: '#ffffff',
};

const imagePlaceholder = {
  height: '180px',
  marginBottom: '1.5rem',
  borderRadius: '0.5rem',
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '0.5rem',
};

const titleStyle = {
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
  fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif",
  color: '#ffffff',
  lineHeight: 1.25,
};

const descriptionStyle = {
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.8)',
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  lineHeight: 1.5,
  marginBottom: '1rem',
};

const priceStyle = {
  fontSize: '1rem',
  color: '#ffffff',
  fontWeight: 500,
  marginBottom: '1rem',
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
};

const priceValueStyle = {
  color: '#06b6d4',
  fontWeight: 700,
  fontSize: '1.125rem',
  marginLeft: '0.5rem',
};

const detailContainerStyle = {
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '0.5rem',
  borderLeft: '3px solid #10b981',
};

const detailStyle = {
  fontSize: '0.875rem',
  fontStyle: 'italic',
  color: '#10b981',
  margin: 0,
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '0.75rem',
  marginTop: '1.5rem',
  flexWrap: 'wrap',
};

const btnStyleBase = {
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.025em',
  flex: '1',
  minWidth: '120px',
};

const detailsBtnStyle = {
  ...btnStyleBase,
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
};

const buyBtnStyle = {
  ...btnStyleBase,
  backgroundColor: '#10b981',
  color: '#ffffff',
  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)',
};

const watchBtnStyle = {
  ...btnStyleBase,
  backgroundColor: '#ffffff',
  color: '#4c1d95',
  border: '2px solid #4c1d95',
  boxShadow: '0 4px 15px rgba(76, 29, 149, 0.1)',
};

const gradientLineStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '10%',
  right: '10%',
  height: '2px',
  background: `
    linear-gradient(90deg, 
      #4c1d95 0%,    /* Deep Violet */
      #3b82f6 50%,   /* Electric Blue */
      #10b981 100%   /* Neo Mint */
    )
  `,
  borderRadius: '2px',
  animation: 'pulse 3s ease-in-out infinite',
};

// Floating Shapes - Same as Home
const shape1Style = {
  position: 'absolute',
  top: '15%',
  left: '10%',
  width: '100px',
  height: '100px',
  backgroundColor: 'rgba(16, 185, 129, 0.1)', // Neo Mint with opacity
  borderRadius: '50%',
  filter: 'blur(40px)',
  animation: 'float 6s ease-in-out infinite',
  zIndex: 1,
};

const shape2Style = {
  position: 'absolute',
  top: '70%',
  right: '15%',
  width: '150px',
  height: '150px',
  backgroundColor: 'rgba(59, 130, 246, 0.1)', // Electric Blue with opacity
  borderRadius: '50%',
  filter: 'blur(50px)',
  animation: 'float 8s ease-in-out infinite reverse',
  zIndex: 1,
};

const shape3Style = {
  position: 'absolute',
  top: '40%',
  right: '5%',
  width: '80px',
  height: '80px',
  backgroundColor: 'rgba(6, 182, 212, 0.1)', // Bright Cyan with opacity
  borderRadius: '50%',
  filter: 'blur(30px)',
  animation: 'float 7s ease-in-out infinite',
  zIndex: 1,
};

export default Products;