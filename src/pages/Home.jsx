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

        <p style={platformDescStyle}>
          Valorem is a next-generation, AI-powered marketing agency redefining cinematic advertising.
          We offer industry-leading courses to master AI-driven advertising.
        </p>
      </div>

      {/* Animated Gradient Line */}
      <div style={gradientLineStyle}></div>

      {/* Add CSS Animations */}
      <style jsx>{`
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

          .about-section {
            padding: 1.5rem !important;
            margin-top: 2rem !important;
          }

          .about-title {
            font-size: 2rem !important;
          }

          .about-paragraph {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

// ========== STYLES ==========
const wrapperStyle = {
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
  margin: '2rem 0',
};

const titleStyle = {
  fontSize: '4.5rem',
  fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif",
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '1.5rem',
  letterSpacing: '-0.025em',
  lineHeight: 1.25,
  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
};

const titleHoverStyle = {
  transform: 'scale(1.02) translateY(-5px)',
  color: '#10b981',
  textShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
};

const subtitleStyle = {
  fontSize: '1.25rem',
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  fontWeight: 400,
  color: 'rgba(255, 255, 255, 0.9)',
  lineHeight: 1.75,
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

const platformDescStyle = {
  fontSize: '1.1rem',
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  fontWeight: 400,
  color: 'rgba(255, 255, 255, 0.85)',
  lineHeight: 1.6,
  maxWidth: '600px',
  textAlign: 'center',
  marginTop: '1rem',
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

export default Home;