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
  const [showCustomPaymentModal, setShowCustomPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
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
    setShowCustomPaymentModal(true);
  };

  const handleDirectPurchase = async () => {
    if (!selectedProduct) return;
    
    setPaymentLoading(true);
    try {
      const res = await axiosWithToken.post(`/courses/${selectedProduct._id}/place`, {
        paymentMethod: "credit_card",
      });
      setPurchasedProducts((prev) => [...prev, selectedProduct._id]);
      alert('تم شراء الكورس بنجاح! 🎉');
      closePaymentModal();
    } catch (err) {
      if (err.response?.status === 409) {
        alert("لقد اشتريت هذا المنتج مسبقًا.");
        setPurchasedProducts((prev) => [...prev, selectedProduct._id]);
        closePaymentModal();
      } else if (err.response?.status === 401) {
        alert("انتهت الجلسة. يرجى تسجيل الدخول.");
        navigate("/login");
      } else {
        alert("حدث خطأ أثناء تنفيذ الطلب");
      }
    } finally {
      setPaymentLoading(false);
    }
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
      closePaymentModal();
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

  const closePaymentModal = () => {
    setShowCustomPaymentModal(false);
    setCouponCode('');
    setSelectedProduct(null);
    setPaymentLoading(false);
    setCouponLoading(false);
  };

  // Styles with enhanced branding and animations
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
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
    height: 'auto',
    opacity: 0.03,
    zIndex: 1,
    userSelect: 'none',
    pointerEvents: 'none'
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headingStyle = {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    marginBottom: '3rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: "var(--font-primary, 'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif)"
  };

  const titleHoverStyle = {
    transform: 'scale(1.05)',
    textShadow: '4px 4px 8px rgba(0,0,0,0.5)'
  };

  const loadingStyle = {
    fontSize: '1.5rem',
    color: 'white',
    textAlign: 'center',
    marginTop: '2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    padding: '1rem'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transformOrigin: 'center'
  };

  const imagePlaceholder = {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    borderRadius: '15px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
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
    color: '#333',
    marginBottom: '0.5rem'
  };

  const descriptionStyle = {
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.5'
  };

  const priceStyle = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '1rem'
  };

  const priceValueStyle = {
    color: '#667eea',
    marginLeft: '0.5rem'
  };

  const detailContainerStyle = {
    background: 'rgba(102, 126, 234, 0.1)',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem'
  };

  const detailStyle = {
    color: '#555',
    margin: 0
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
    fontWeight: 'var(--font-weight-medium, 500)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    flex: 1,
    minWidth: '120px',
    textTransform: 'uppercase',
    letterSpacing: 'var(--letter-spacing-wide, 0.025em)',
    fontFamily: "var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif)"
  };

  const detailsBtnStyle = {
    ...baseButtonStyle,
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: 'white'
  };

  const buyBtnStyle = {
    ...baseButtonStyle,
    background: 'linear-gradient(45deg, #4CAF50, #45a049)',
    color: 'white'
  };

  const watchBtnStyle = {
    ...baseButtonStyle,
    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
    color: 'white'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
  };

  const modalContentStyle = {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '25px',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    transform: 'scale(0.9)',
    animation: 'modalAppear 0.3s ease-out forwards'
  };

  const modalTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    fontFamily: "var(--font-primary, 'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif)"
  };

  const modalProductInfoStyle = {
    background: 'rgba(102, 126, 234, 0.1)',
    padding: '1rem',
    borderRadius: '15px',
    marginBottom: '2rem'
  };

  const paymentOptionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const paymentSectionStyle = {
    background: 'rgba(248, 250, 252, 0.8)',
    padding: '1.5rem',
    borderRadius: '15px',
    border: '2px solid transparent',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid #ddd',
    borderRadius: '10px',
    fontSize: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease'
  };

  const modalButtonStyle = {
    ...baseButtonStyle,
    marginRight: '0.5rem',
    minWidth: '140px'
  };

  const shape1Style = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '200px',
    height: '200px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  };

  const shape2Style = {
    position: 'absolute',
    top: '60%',
    right: '15%',
    width: '150px',
    height: '150px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '50%',
    animation: 'float 4s ease-in-out infinite reverse'
  };

  const shape3Style = {
    position: 'absolute',
    bottom: '20%',
    left: '20%',
    width: '100px',
    height: '100px',
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '50%',
    animation: 'float 5s ease-in-out infinite'
  };

  const gradientLineStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
    backgroundSize: '300% 300%',
    animation: 'gradientShift 3s ease infinite'
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
          background: var(--color-electric-blue-dark, #2563eb) !important;
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }
        
        .btn-buy:hover {
          background: var(--color-neo-mint-dark, #059669) !important;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
        }
        
        .btn-watch:hover {
          background: var(--color-deep-violet-dark, #3730a3) !important;
          color: var(--color-white, #ffffff) !important;
          box-shadow: 0 6px 20px rgba(76, 29, 149, 0.3);
        }
        
        .loading-text {
          animation: pulse 2s infinite;
        }
        
        .payment-section:hover {
          border-color: #667eea !important;
          background: rgba(102, 126, 234, 0.05) !important;
        }
        
        input:focus {
          border-color: #667eea !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
                        {text.buyNow || 'اشترِ الآن'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Payment Modal */}
        {showCustomPaymentModal && selectedProduct && (
          <div style={modalOverlayStyle} onClick={closePaymentModal}>
            <div className="modal-content" style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <h3 style={modalTitleStyle}>شراء الكورس</h3>
              
              <div style={modalProductInfoStyle}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{selectedProduct.name}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  السعر: <span style={{ color: '#667eea' }}>${selectedProduct.price}</span>
                </p>
              </div>

              <div style={paymentOptionsStyle}>
                {/* Direct Payment Section */}
                <div className="payment-section" style={paymentSectionStyle}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    💳 الدفع المباشر
                  </h4>
                  <button
                    onClick={handleDirectPurchase}
                    disabled={paymentLoading}
                    style={{
                      ...modalButtonStyle,
                      background: paymentLoading ? '#ccc' : 'linear-gradient(45deg, #4CAF50, #45a049)',
                      color: 'white',
                      width: '100%'
                    }}
                  >
                    {paymentLoading ? 'جاري المعالجة...' : `ادفع $${selectedProduct.price}`}
                  </button>
                </div>

                {/* Coupon Section */}
                <div className="payment-section" style={paymentSectionStyle}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    🎟️ استخدام كوبون
                  </h4>
                  <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
                    احصل على الكورس مجاناً باستخدام كود الكوبون
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
                      background: (couponLoading || !couponCode.trim()) ? '#ccc' : 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                      color: 'white',
                      width: '100%'
                    }}
                  >
                    {couponLoading ? 'جاري التحقق...' : 'استخدام الكوبون'}
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button
                  onClick={closePaymentModal}
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