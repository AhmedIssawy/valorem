function About() {
  return (
    <div style={aboutPageStyle}>
      <div style={containerStyle}>
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
    </div>
  );
}

// ✅ تنسيقات مظبوطة
const aboutPageStyle = {
  background: 'linear-gradient(135deg, #4b0082 0%, #6a0dad 100%)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
};

const containerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)', // بوكس شفاف ناعم
  padding: '3rem',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
  maxWidth: '800px',
  color: '#ffffff',
  backdropFilter: 'blur(6px)', // بلور ناعم للخلفية
};

const titleStyle = {
  fontSize: '2.4rem',
  color: '#ffd700',
  marginBottom: '1.5rem',
  fontWeight: '700',
  textAlign: 'center',
};

const paragraphStyle = {
  fontSize: '1.15rem',
  lineHeight: '1.8',
  marginBottom: '1.2rem',
  textAlign: 'center',
};

export default About;
