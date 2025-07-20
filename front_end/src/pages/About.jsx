import logo from '../assets/logo-full.png'; // تأكد من المسار

function About() {
  return (
    <div style={aboutPageStyle}>
      <img src={logo} alt="Background Logo" style={bgLogoStyle} />

      <h1 style={titleStyle}>About This Platform</h1>

      <p style={paragraphStyle}>
        Our educational platform is designed to empower both students and administrators.
      </p>
      <p style={paragraphStyle}>
        Students can explore courses, track their progress, and engage with a collaborative learning community.
      </p>
      <p style={paragraphStyle}>
        Admins can manage content, monitor activity, and support users through powerful tools.
      </p>
    </div>
  );
}

// ✅ STYLES
const aboutPageStyle = {
  position: 'relative',
  background: 'linear-gradient(135deg, #2c003e, #007bff)',
  minHeight: '100vh',
  padding: '4rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Nizzoli Rta, sans-serif',
  textAlign: 'center',
  overflow: 'hidden',
};

const bgLogoStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  opacity: 0.035,
  zIndex: 0,
};

const titleStyle = {
  fontSize: '3rem',
  color: '#00FFFF',
  marginBottom: '2rem',
  fontFamily: 'Nizzoli Rta, sans-serif',
  zIndex: 1,
  transition: 'transform 0.3s ease, color 0.3s ease',
};

const paragraphStyle = {
  fontSize: '1.3rem',
  color: '#ffffffdd',
  fontFamily: 'Aktiv Grotesk, sans-serif',
  marginBottom: '1.2rem',
  maxWidth: '800px',
  lineHeight: '1.8',
  zIndex: 1,
};

// Hover effect via style tag injection
const style = document.createElement('style');
style.innerHTML = `
  h1:hover {
    transform: scale(1.05);
    color: #6bef6b;
  }
`;
document.head.appendChild(style);

export default About;
