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
  const [couponCode, setCouponCode] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
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
    setSelectedProduct(course);
    setShowCouponModal(true);
  };

  const handleCouponRedeem = async () => {
    if (!couponCode.trim()) {
      alert('يرجى إدخال كود الكوبون');
      return;
    }

    setCouponLoading(true);
    try {
      const res = await axiosWithToken.post('/coupons/redeem', {
        code: couponCode.trim()
      });
      
      // إضافة المنتج إلى قائمة المنتجات المشتراة
      if (selectedProduct) {
        setPurchasedProducts((prev) => [...prev, selectedProduct._id]);
      }
      
      alert('تم استخدام الكوبون بنجاح! 🎉');
      closeCouponModal();
    } catch (err) {
      if (err.response?.status === 404) {
        alert('كود الكوبون غير صحيح');
      } else if (err.response?.status === 400) {
        alert(err.response.data.message || 'لا يمكن استخدام هذا الكوبون');
      } else {
        alert('حدث خطأ أثناء استخدام الكوبون');
      }
    } finally {
      setCouponLoading(false);
    }
  };

  const closeCouponModal = () => {
    setShowCouponModal(false);
    setCouponCode('');
    setSelectedProduct(null);
    setCouponLoading(false);
  };

  // Updated Styles with Home page background
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
    overflow: 'hidden',
    padding: '80px 20px 20px',
    fontFamily: "var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif)"
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
    userSelect: 'none',
    pointerEvents: 'none',
    filter: 'blur(1px)'
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headingStyle = {
    fontSize: '4rem',
    fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 700,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '3rem',
    letterSpacing: '-0.025em',
    lineHeight: 1.25,
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const titleHoverStyle = {
    transform: 'scale(1.02) translateY(-5px)',
    color: '#10b981',
    textShadow: '0 8px 30px rgba(16, 185, 129, 0.4)'
  };

  const loadingStyle = {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: '2rem',
    fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif"
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    padding: '1rem'
  };

  const cardStyle = {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: '24px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transformOrigin: 'center'
  };

  const imagePlaceholder = {
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '15px',
    transition: 'transform 0.3s ease'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
    fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif"
  };

  const descriptionStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '1rem',
    lineHeight: '1.5',
    fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif"
  };

  const priceStyle = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '1rem',
    fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif"
  };

  const priceValueStyle = {
    color: '#10b981',
    marginLeft: '0.5rem',
    textShadow: '0 2px 10px rgba(16, 185, 129, 0.3)'
  };

  const detailContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '1rem',
    borderRadius: '15px',
    marginBottom: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const detailStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    margin: 0,
    fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif"
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  };

  const baseButtonStyle = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    flex: 1,
    minWidth: '120px',
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif"
  };

  const detailsBtnStyle = {
    ...baseButtonStyle,
    background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
    color: 'white',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
  };

  const buyBtnStyle = {
    ...baseButtonStyle,
    background: 'linear-gradient(45deg, #10b981, #059669)',
    color: 'white',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
  };

  const watchBtnStyle = {
    ...baseButtonStyle,
    background: 'linear-gradient(45deg, #4c1d95, #3730a3)',
    color: 'white',
    boxShadow: '0 10px 25px rgba(76, 29, 149, 0.3)'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(10px)'
  };

  const modalContentStyle = {
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '3rem',
    borderRadius: '25px',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'scale(0.9)',
    animation: 'modalAppear 0.3s ease-out forwards'
  };

  const modalTitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1.5rem',
    fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif"
  };

  const modalProductInfoStyle = {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
    padding: '1.5rem',
    borderRadius: '20px',
    marginBottom: '2rem',
    border: '1px solid rgba(16, 185, 129, 0.2)'
  };

  const couponSectionStyle = {
    background: 'rgba(248, 250, 252, 0.8)',
    padding: '2rem',
    borderRadius: '20px',
    border: '2px solid transparent',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid #ddd',
    borderRadius: '15px',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif"
  };

  const modalButtonStyle = {
    ...baseButtonStyle,
    marginRight: '0.5rem',
    minWidth: '140px'
  };

  // Floating Shapes (same as Home)
  const shape1Style = {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderRadius: '50%',
    filter: 'blur(30px)',
    animation: 'float 7s ease-in-out infinite',
    zIndex: 1,
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

  return (
    <>
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
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25) !important;
          background-color: rgba(255, 255, 255, 0.18) !important;
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
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        
        .btn:hover {
          transform: translateY(-2px) scale(1.05);
        }
        
        .btn-details:hover {
          background: linear-gradient(45deg, #2563eb, #0891b2) !important;
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4) !important;
        }
        
        .btn-buy:hover {
          background: linear-gradient(45deg, #059669, #047857) !important;
          box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4) !important;
        }
        
        .btn-watch:hover {
          background: linear-gradient(45deg, #3730a3, #312e81) !important;
          box-shadow: 0 15px 35px rgba(76, 29, 149, 0.4) !important;
        }
        
        .loading-text {
          animation: pulse 2s infinite;
        }
        
        .coupon-section:hover {
          border-color: #10b981 !important;
          background: rgba(16, 185, 129, 0.05) !important;
        }
        
        input:focus {
          border-color: #10b981 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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
        
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
          
          .modal-content {
            padding: 2rem !important;
            margin: 1rem !important;
          }
        }
      `}</style>
      
      <div className="products-container" style={containerStyle}>
        {/* Background Logo */}
        <img src={logo} alt="Valorem Logo" style={backgroundLogoStyle} />
        
        {/* Floating Shapes */}
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
            {text.availableProducts || 'الكورسات المتاحة'}
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
                        استخدام كوبون
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coupon Modal */}
        {showCouponModal && selectedProduct && (
          <div style={modalOverlayStyle} onClick={closeCouponModal}>
            <div className="modal-content" style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <h3 style={modalTitleStyle}>🎟️ استخدام كوبون</h3>
              
              <div style={modalProductInfoStyle}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif" }}>
                  {selectedProduct.name}
                </h4>
                <p style={{ margin: 0, color: '#666', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  السعر الأصلي: <span style={{ color: '#10b981' }}>${selectedProduct.price}</span>
                </p>
              </div>

              <div className="coupon-section" style={couponSectionStyle}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  احصل على الكورس مجاناً!
                </h4>
                <p style={{ margin: '0 0 1.5rem 0', color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  أدخل كود الكوبون للحصول على الكورس مجاناً بدون أي رسوم
                </p>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="أدخل كود الكوبون"
                  style={inputStyle}
                  disabled={couponLoading}
                />
                <button
                  onClick={handleCouponRedeem}
                  disabled={couponLoading || !couponCode.trim()}
                  style={{
                    ...modalButtonStyle,
                    background: (couponLoading || !couponCode.trim()) ? '#ccc' : 'linear-gradient(45deg, #10b981, #059669)',
                    color: 'white',
                    width: '100%',
                    boxShadow: (couponLoading || !couponCode.trim()) ? 'none' : '0 10px 25px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {couponLoading ? 'جاري التحقق...' : '🎉 استخدام الكوبون'}
                </button>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button
                  onClick={closeCouponModal}
                  style={{
                    ...modalButtonStyle,
                    background: 'linear-gradient(45deg, #6c757d, #5a6268)',
                    color: 'white'
                  }}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animated Gradient Line */}
        <div style={gradientLineStyle}></div>
      </div>
    </>
  );
}

export default Products;