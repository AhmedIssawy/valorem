// src/pages/Home.jsx
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../LanguageContext';
import logo from '../assets/logo-full.png';

function Home() {
  const { text } = useContext(LanguageContext);
  const user = useSelector((state) => state.app.user);
  const [hovered, setHovered] = useState({ title: false, subtitle: false });

  return (
    <div style={wrapperStyle}>
      <img src={logo} alt="logo" style={backgroundLogoStyle} />

      <h1
        style={{
          ...titleStyle,
          ...(hovered.title ? titleHoverStyle : {})
        }}
        onMouseEnter={() => setHovered({ ...hovered, title: true })}
        onMouseLeave={() => setHovered({ ...hovered, title: false })}
      >
        {text.welcome} {user?.name && `, ${user.name}`}
      </h1>

      <p
        style={{
          ...subtitleStyle,
          ...(hovered.subtitle ? subtitleHoverStyle : {})
        }}
        onMouseEnter={() => setHovered({ ...hovered, subtitle: true })}
        onMouseLeave={() => setHovered({ ...hovered, subtitle: false })}
      >
        {text.homeIntro}
      </p>
    </div>
  );
}

// ========== STYLES ==========
const wrapperStyle = {
  position: 'relative',
  height: '100vh',
  background: 'linear-gradient(135deg, #2c003e, #007bff)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  fontFamily: 'Nizzoli Rta, sans-serif',
  overflow: 'hidden',
};

const backgroundLogoStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  opacity: 0.04,
  zIndex: 0,
};

const titleStyle = {
  zIndex: 1,
  fontSize: '3.8rem',
  color: '#00FFFF', // Bright Cyan
  fontFamily: 'Nizzoli Rta, sans-serif',
  marginBottom: '1rem',
  transition: 'transform 0.3s ease, color 0.3s ease',
  cursor: 'default',
};

const titleHoverStyle = {
  transform: 'scale(1.05)',
  color: '#6bef6b',
};

const subtitleStyle = {
  zIndex: 1,
  fontSize: '1.5rem',
  color: '#ffffffdd',
  fontFamily: 'Aktiv Grotesk, sans-serif',
  textAlign: 'center',
  maxWidth: '800px',
  transition: 'transform 0.3s ease, color 0.3s ease',
  cursor: 'default',
};

const subtitleHoverStyle = {
  transform: 'scale(1.03)',
  color: '#aaffdd',
};

export default Home;
