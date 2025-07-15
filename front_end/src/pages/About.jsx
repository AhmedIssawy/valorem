// src/pages/About.jsx
function About() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">About This Platform</h1>
      <p>This is an educational platform for students and admins to manage and view courses.</p>
    </div>
  );
}


const containerStyle = {
  padding: '2rem',
  maxWidth: '800px',
  margin: 'auto',
  lineHeight: '1.8',
  fontSize: '1.1rem',
  color: '#333',
};

const titleStyle = {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: '#00b894',
};

const paragraphStyle = {
  marginBottom: '1rem',
};

export default About;
