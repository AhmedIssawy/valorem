import { useState } from 'react';
import logoIcon from '../assets/logo-icon.png'; // ✅ استيراد الأيقونة من src/assets
function SocialIcon() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Valorem Professional Brand System */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        :root {
          /* Valorem Professional Colors */
          --valorem-primary: #1a1a2e;
          --valorem-secondary: #16213e;
          --valorem-accent: #0f4c75;
          --valorem-gold: #bb9457;
          --valorem-silver: #a8b2c8;
          --valorem-white: #ffffff;
          --valorem-light: #f8fafc;
          --valorem-shadow: rgba(26, 26, 46, 0.15);
          
          /* Professional Typography */
          --valorem-font: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .valorem-social-widget {
          position: fixed;
          bottom: 32px;
          left: 32px;
          z-index: 9999;
          font-family: var(--valorem-font);
        }
        
        .valorem-toggle-btn {
          width: 64px;
          height: 64px;
          background: linear-gradient(145deg, #1a1a2e, #0f4c75, #00c9a7);
          border: 2px solid var(--valorem-gold);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 
            0 8px 32px var(--valorem-shadow),
            0 0 0 0 rgba(187, 148, 87, 0.4);
          overflow: hidden;
        }
        
        .valorem-toggle-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.6s ease;
        }
        
        .valorem-toggle-btn:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 
            0 16px 48px rgba(26, 26, 46, 0.25),
            0 0 0 8px rgba(187, 148, 87, 0.1);
          border-color: var(--valorem-white);
        }
        
        .valorem-toggle-btn:hover::before {
          left: 100%;
        }
        
        .valorem-toggle-btn:active {
          transform: translateY(-6px) scale(1.02);
        }
        
        .valorem-logo-icon {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
        }
        
        .valorem-toggle-btn:hover .valorem-logo-icon {
          transform: rotate(5deg) scale(1.1);
          filter: drop-shadow(0 4px 12px rgba(187, 148, 87, 0.4)) brightness(1.1);
        }
        
        .valorem-social-panel {
          position: absolute;
          bottom: 80px;
          left: 0;
          background: var(--valorem-white);
          border-radius: 24px;
          padding: 24px;
          min-width: 220px;
          box-shadow: 
            0 20px 60px rgba(26, 26, 46, 0.15),
            0 0 0 1px rgba(187, 148, 87, 0.1);
          animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .valorem-panel-title {
          color: var(--valorem-primary);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          text-align: center;
          position: relative;
        }
        
        .valorem-panel-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--valorem-gold), var(--valorem-accent));
          border-radius: 1px;
        }
        
        .valorem-social-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .valorem-social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 16px;
          text-decoration: none;
          color: var(--valorem-primary);
          font-weight: 500;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          background: transparent;
        }
        
        .valorem-social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--valorem-light), rgba(187, 148, 87, 0.05));
          transition: left 0.4s ease;
        }
        
        .valorem-social-link:hover::before {
          left: 0;
        }
        
        .valorem-social-link:hover {
          transform: translateX(8px);
          color: var(--valorem-accent);
          background: rgba(187, 148, 87, 0.05);
        }
        
        .valorem-social-icon {
          width: 24px;
          height: 24px;
          background: var(--valorem-silver);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }
        
        .valorem-social-link:hover .valorem-social-icon {
          background: var(--valorem-gold);
          transform: scale(1.1) rotate(5deg);
        }
        
        .valorem-social-text {
          position: relative;
          z-index: 2;
        }
        
        /* Instagram specific styling */
        .valorem-social-link[data-platform="instagram"]:hover .valorem-social-icon {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
        
        /* WhatsApp specific styling */
        .valorem-social-link[data-platform="whatsapp"]:hover .valorem-social-icon {
          background: #25d366;
        }
        
        /* Facebook specific styling */
        .valorem-social-link[data-platform="facebook"]:hover .valorem-social-icon {
          background: #1877f2;
        }
        
        /* YouTube specific styling */
        .valorem-social-link[data-platform="youtube"]:hover .valorem-social-icon {
          background: #ff0000;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .valorem-social-widget {
            bottom: 24px;
            left: 24px;
          }
          
          .valorem-toggle-btn {
            width: 56px;
            height: 56px;
          }
          
          .valorem-logo-icon {
            width: 28px;
            height: 28px;
            font-size: 16px;
          }
          
          .valorem-social-panel {
            min-width: 200px;
            padding: 20px;
          }
        }
        
        /* Professional Loading Animation */
        .valorem-loading {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
      
      <div className="valorem-social-widget">
        <button 
          onClick={() => setShow(!show)}
          className="valorem-toggle-btn"
          aria-label="عرض روابط التواصل الاجتماعي"
        >
         <img 
  src={logoIcon} 
  alt="Valorem Icon" 
  className="valorem-logo-icon"
  style={{
    width: '32px',
    height: '32px',
    objectFit: 'contain',
    borderRadius: '8px',
    background: 'transparent'
  }}
/>

        </button>

        {show && (
          <div className="valorem-social-panel">
            <div className="valorem-panel-title">
              تواصل معنا
            </div>
            
            <div className="valorem-social-links">
              <a 
                href="https://www.instagram.com/bmbozya_designes?igsh=MWxzbGY0ajRscm8zYw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="valorem-social-link"
                data-platform="instagram"
              >
                <div className="valorem-social-icon">📷</div>
                <span className="valorem-social-text">Instagram</span>
              </a>
              
              <a 
                href="https://wa.me/201015315584" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="valorem-social-link"
                data-platform="whatsapp"
              >
                <div className="valorem-social-icon">💬</div>
                <span className="valorem-social-text">واتساب</span>
              </a>
              
              <a 
                href="https://www.facebook.com/share/15d2Kobc1A/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="valorem-social-link"
                data-platform="facebook"
              >
                <div className="valorem-social-icon">📘</div>
                <span className="valorem-social-text">فيسبوك</span>
              </a>
              
              <a 
                href="https://www.youtube.com/@alibmbozya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="valorem-social-link"
                data-platform="youtube"
              >
                <div className="valorem-social-icon">▶️</div>
                <span className="valorem-social-text">يوتيوب</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SocialIcon;