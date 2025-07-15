import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';

const courses = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    description: 'HTML, CSS, JavaScript, React, Node.js, MongoDB',
    details: 'تعلم كيف تبني مواقع احترافية وتشتغل Freelancer أو في شركات برمجة عالمية 🔥',
    price: 200,
    paymentLink: 'https://www.paypal.com/',
  },
  {
    id: 2,
    title: 'Data Science & Machine Learning',
    description: 'Python, Pandas, Scikit-learn, Deep Learning',
    details: 'ادخل عالم الذكاء الاصطناعي وحل مشاكل العالم باستخدام البيانات 📊🤖',
    price: 250,
    paymentLink: 'https://stripe.com/',
  },
  {
    id: 3,
    title: 'UI/UX Design Bootcamp',
    description: 'Figma, Prototyping, Design Thinking',
    details: 'صمّم تجارب جذابة وابدأ مسيرتك كمصمم محترف 💡🎨',
    price: 150,
    paymentLink: 'https://www.paypal.com/',
  },
  {
    id: 4,
    title: 'Cybersecurity Essentials',
    description: 'Network Security, Ethical Hacking, Linux Basics',
    details: 'احمي الأنظمة وابدأ طريقك كهاكر أخلاقي 🔐💻',
    price: 180,
    paymentLink: 'https://stripe.com/',
  },
];

function Courses() {
  const { text } = useContext(LanguageContext);
  const [expandedId, setExpandedId] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('purchasedCourses');
    if (saved) setPurchasedCourses(JSON.parse(saved));
  }, []);

  const handleBuyNow = (course) => {
    window.open(course.paymentLink, '_blank');
    setTimeout(() => {
      alert(`${text.purchased}: ${course.title}`);
      const updated = [...purchasedCourses, course.id];
      setPurchasedCourses(updated);
      localStorage.setItem('purchasedCourses', JSON.stringify(updated));
      navigate(`/course/${course.id}`);
    }, 500);
  };

  return (
    <div style={containerStyle}>
      <h2>{text.availableCourses}</h2>
      <div style={gridStyle}>
        {courses.map(c => (
          <div key={c.id} style={cardStyle}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p style={{ fontWeight: 'bold', color: '#007bff' }}>
              {text.price}: ${c.price}
            </p>

            {expandedId === c.id && <p style={{ fontStyle: 'italic' }}>{c.details}</p>}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={() => setExpandedId(c.id)} style={learnBtnStyle}>
                {text.learnMore}
              </button>
              {purchasedCourses.includes(c.id) ? (
                <button onClick={() => navigate(`/course/${c.id}`)} style={watchBtnStyle}>
                  {text.watch}
                </button>
              ) : (
                <button onClick={() => handleBuyNow(c)} style={buyBtnStyle}>
                  {text.buyNow}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
  padding: '2rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
};

const cardStyle = {
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 0 5px rgba(0,0,0,0.05)',
};

const learnBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#17a2b8',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const buyBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const watchBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#ffc107',
  color: '#000',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default Courses;
