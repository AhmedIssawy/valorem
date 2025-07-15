import { useState } from 'react';

function SocialIcon() {
  const [show, setShow] = useState(false);

  return (
    <div style={containerStyle}>
      <button onClick={() => setShow(!show)} style={iconBtnStyle}>
        🌐
      </button>

      {show && (
        <div style={menuStyle}>
          <a href="https://www.instagram.com/bmbozya_designes?igsh=MWxzbGY0ajRscm8zYw==" target="_blank" rel="noopener noreferrer">📷 Instagram</a><br />
          <a href="https://wa.me/201015315584" target="_blank" rel="noopener noreferrer">📞 WhatsApp</a><br />
          <a href="https://www.facebook.com/share/15d2Kobc1A/" target="_blank" rel="noopener noreferrer">📘 Facebook</a><br />
          <a href="https://www.youtube.com/@alibmbozya" target="_blank" rel="noopener noreferrer">▶️ YouTube</a>
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
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '45px',
  height: '45px',
  fontSize: '20px',
  cursor: 'pointer',
};

const menuStyle = {
  marginTop: '10px',
  background: '#fff',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  boxShadow: '0 0 5px rgba(0,0,0,0.2)',
};

export default SocialIcon;
