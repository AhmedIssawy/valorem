import React from 'react';
import logo from '../assets/logo-full.png'; // تأكد من المسار

function About() {
  return (
    <>
      {/* Brand-compliant CSS styles */}
      <style jsx>{`
        .about-container {
          font-family: var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif);
        }
        
        .title {
          font-family: var(--font-primary, 'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif);
          transition: transform 0.3s ease, color 0.3s ease;
        }
        
        .title:hover {
          transform: scale(1.05);
          color: var(--color-neo-mint, #10b981);
        }
        
        .paragraph {
          animation: fadeInUp 0.6s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .paragraph:nth-child(3) {
          animation-delay: 0.2s;
        }
        
        .paragraph:nth-child(4) {
          animation-delay: 0.4s;
        }
        
        .paragraph:nth-child(5) {
          animation-delay: 0.6s;
        }
        
        .cta-button {
          font-family: var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out 0.8s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .cta-button:hover {
          background-color: var(--color-deep-violet-dark, #3730a3) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(76, 29, 149, 0.3);
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
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .title {
            font-size: 2rem !important; /* --font-size-4xl mobile */
          }
          
          .paragraph {
            font-size: 1.125rem !important; /* --font-size-lg mobile */
            max-width: 90% !important;
          }
        }
      `}</style>
      
      <div className="about-container" style={aboutPageStyle}>
        <img src={logo} alt="Background Logo" style={bgLogoStyle} />
        
        <h1 className="title" style={titleStyle}>
          About This Platform
        </h1>
        
        <p className="paragraph" style={paragraphStyle}>
          Our educational platform is designed to empower both students and administrators 
          with cutting-edge learning technologies.
        </p>
        
        <p className="paragraph" style={paragraphStyle}>
          Students can explore interactive courses, track their learning progress, 
          and engage with a vibrant collaborative community.
        </p>
        
        <p className="paragraph" style={paragraphStyle}>
          Administrators can efficiently manage educational content, monitor user activity, 
          and provide comprehensive support through our powerful management tools.
        </p>
        
        <button className="cta-button" style={buttonStyle}>
          Start Your Journey
        </button>
      </div>
    </>
  );
}

// Brand-compliant styles using Valorem 2025 color system
const aboutPageStyle = {
  position: 'relative',
  background: `linear-gradient(135deg, var(--color-deep-violet, #4c1d95), var(--color-electric-blue, #3b82f6))`,
  minHeight: '100vh',
  padding: '4rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: `var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif)`,
  textAlign: 'center',
  overflow: 'hidden',
};

const bgLogoStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '600px',
  opacity: 0.04,
  zIndex: 0,
  pointerEvents: 'none',
  filter: 'brightness(0) invert(1)', // Makes logo white for better visibility
};

const titleStyle = {
  fontSize: 'var(--font-size-5xl, 3rem)', // 48px
  fontWeight: 'var(--font-weight-bold, 700)',
  color: 'var(--color-white, #ffffff)',
  marginBottom: '3rem',
  fontFamily: `var(--font-primary, 'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif)`,
  zIndex: 1,
  position: 'relative',
  cursor: 'pointer',
  letterSpacing: 'var(--letter-spacing-tight, -0.025em)',
  lineHeight: 'var(--line-height-tight, 1.25)',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
};

const paragraphStyle = {
  fontSize: 'var(--font-size-lg, 1.125rem)', // 18px
  color: 'rgba(255, 255, 255, 0.9)',
  fontFamily: `var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif)`,
  fontWeight: 'var(--font-weight-regular, 400)',
  marginBottom: '1.5rem',
  maxWidth: '800px',
  lineHeight: 'var(--line-height-relaxed, 1.75)',
  zIndex: 1,
  position: 'relative',
  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
};

const buttonStyle = {
  marginTop: '2rem',
  padding: '1rem 2rem',
  fontSize: 'var(--font-size-base, 1rem)',
  fontWeight: 'var(--font-weight-medium, 500)',
  color: 'var(--color-white, #ffffff)',
  backgroundColor: 'var(--color-deep-violet, #4c1d95)',
  border: '2px solid var(--color-bright-cyan, #06b6d4)',
  borderRadius: '0.75rem',
  cursor: 'pointer',
  fontFamily: `var(--font-secondary, 'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif)`,
  zIndex: 1,
  position: 'relative',
  boxShadow: '0 4px 15px rgba(76, 29, 149, 0.2)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--letter-spacing-wide, 0.025em)',
};

export default About;