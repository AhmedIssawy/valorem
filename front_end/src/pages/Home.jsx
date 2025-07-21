// src/pages/Home.jsx
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../LanguageContext';
import logo from '../assets/logo-full.png';

function Home() {
  const { text, lang } = useContext(LanguageContext);
  const user = useSelector((state) => state.app.user);
  const [hovered, setHovered] = useState({ title: false, subtitle: false });

  return (
    <div style={wrapperStyle} className={lang === 'ar' ? 'text-arabic' : ''}>
      {/* Background Logo */}
      <img src={logo} alt="Valorem Logo" style={backgroundLogoStyle} />
      
      {/* Floating Shapes */}
      <div style={shape1Style}></div>
      <div style={shape2Style}></div>
      <div style={shape3Style}></div>

      {/* Main Content */}
      <div style={contentContainerStyle}>
        <h1
          style={{
            ...titleStyle,
            ...(hovered.title ? titleHoverStyle : {}),
            direction: lang === 'ar' ? 'rtl' : 'ltr'
          }}
          onMouseEnter={() => setHovered({ ...hovered, title: true })}
          onMouseLeave={() => setHovered({ ...hovered, title: false })}
        >
          {text.welcome} {user?.firstName || user?.lastName ? `, ${user.firstName ?? ''} ${user.lastName ?? ''}` : ''}

        </h1>

        <p
          style={{
            ...subtitleStyle,
            ...(hovered.subtitle ? subtitleHoverStyle : {}),
            direction: lang === 'ar' ? 'rtl' : 'ltr',
            textAlign: lang === 'ar' ? 'right' : 'center'
          }}
          onMouseEnter={() => setHovered({ ...hovered, subtitle: true })}
          onMouseLeave={() => setHovered({ ...hovered, subtitle: false })}
        >
          {text.homeIntro}
        </p>


      </div>

      {/* Animated Gradient Line */}
      <div style={gradientLineStyle}></div>
    </div>
  );
}

// ========== STYLES ==========
const wrapperStyle = {
  position: 'relative',
  height: '100vh',
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
  position: 'relative',
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
  textAlign: 'center',
  maxWidth: '900px',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  padding: '3rem',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
};

const titleStyle = {
  fontSize: '4.5rem',        // Using --font-size-6xl equivalent
  fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif", // Primary font
  fontWeight: 700,           // Bold
  color: '#ffffff',
  marginBottom: '1.5rem',
  letterSpacing: '-0.025em', // Tight letter spacing
  lineHeight: 1.25,          // Tight line height
  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
};

const titleHoverStyle = {
  transform: 'scale(1.02) translateY(-5px)',
  color: '#10b981',          // Neo Mint on hover
  textShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
};

const subtitleStyle = {
  fontSize: '1.25rem',       // --font-size-xl
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif", // Secondary font
  fontWeight: 400,           // Regular
  color: 'rgba(255, 255, 255, 0.9)',
  lineHeight: 1.75,          // Relaxed line height
  marginBottom: '2.5rem',
  maxWidth: '700px',
  transition: 'all 0.3s ease',
  cursor: 'default',
};

const subtitleHoverStyle = {
  transform: 'translateY(-2px)',
  color: '#ffffff',
  textShadow: '0 2px 15px rgba(255, 255, 255, 0.3)',
};

const ctaButtonStyle = {
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif", // Secondary font
  fontSize: '1.125rem',      // --font-size-lg
  fontWeight: 600,           // Semibold
  padding: '1rem 2.5rem',
  borderRadius: '50px',
  backgroundColor: '#10b981', // Neo Mint
  color: '#ffffff',
  border: '2px solid #10b981',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',   // Wider letter spacing
  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
  position: 'relative',
  overflow: 'hidden',
};

const ctaButtonHoverStyle = {
  transform: 'translateY(-3px) scale(1.05)',
  backgroundColor: '#059669', // Neo Mint Dark
  borderColor: '#059669',
  boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)',
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

// Floating Shapes
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

// CSS Animations (add this to your global CSS file)
const animations = `
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scaleX(1); }
  50% { opacity: 1; transform: scaleX(1.1); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-title {
    font-size: 2.5rem !important;
  }
  
  .home-subtitle {
    font-size: 1.1rem !important;
  }
  
  .home-content {
    padding: 2rem !important;
    margin: 1rem !important;
  }
}
`;

// Add animations to document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = animations;
  document.head.appendChild(styleElement);
}

export default Home;