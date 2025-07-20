import { useState } from 'react';
import logoIcon from '../assets/logo-icon.png'; // ✅ استيراد الأيقونة من src/assets

function SocialIcon() {
  const [show, setShow] = useState(false);

  return (
    <div style={containerStyle}>
      <button onClick={() => setShow(!show)} style={iconBtnStyle}>
        <img src={logoIcon} alt="Valorem Icon" style={iconImageStyle} />
      </button>

      {show && (
        <div style={menuStyle}>
          <a href="https://www.instagram.com/bmbozya_designes?igsh=MWxzbGY0ajRscm8zYw==" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            📷 Instagram
          </a>
          <a href="https://wa.me/201015315584" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            📞 WhatsApp
          </a>
          <a href="https://www.facebook.com/share/15d2Kobc1A/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            📘 Facebook
          </a>
          <a href="https://www.youtube.com/@alibmbozya" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            ▶️ YouTube
          </a>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  zIndex: 1000,
};

const iconBtnStyle = {
  background: '#ffffff',
  border: '2px solid #00d1b2',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0,
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};

const iconImageStyle = {
  width: '28px',
  height: '28px',
  objectFit: 'contain',
};

const menuStyle = {
  marginTop: '10px',
  background: '#fff',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const linkStyle = {
  color: '#333',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '15px',
  transition: 'color 0.2s',
};

export default SocialIcon;
