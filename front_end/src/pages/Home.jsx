// src/pages/Home.jsx
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../LanguageContext';
import logo from '../assets/logo-full.png'; // تأكد من المسار الصحيح

function Home() {
  const { text } = useContext(LanguageContext);
  const user = useSelector((state) => state.app.user);

  return (
    <div style={wrapperStyle}>
      {/* خلفية لوجو شفافة */}
      <img src={logo} alt="logo" style={backgroundLogoStyle} />

      {/* النصوص مباشرة على الخلفية */}
      <div style={textContentStyle}>
        <h1 style={titleStyle}>
          {text.welcome} {user?.name && `, ${user.name}`}
        </h1>
        <p style={subtitleStyle}>{text.homeIntro}</p>
      </div>
    </div>
  );
}

// ============= STYLES ================
const wrapperStyle = {
  position: 'relative',
  height: '100vh',
  background: 'linear-gradient(to right, #6a11cb, #2575fc)',
  display: 'flex',
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
  width: '70%',
  opacity: 0.05,
  zIndex: 0,
};

const textContentStyle = {
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  color: 'white',
};

const titleStyle = {
  fontSize: '3rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const subtitleStyle = {
  fontSize: '1.2rem',
  opacity: 0.9,
};

// =====================================

export default Home;
