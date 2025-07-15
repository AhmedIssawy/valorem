import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';
import axiosWithToken from '../utils/axiosWithToken';

function Courses() {
  const { text } = useContext(LanguageContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('purchasedCourses');
    if (saved) setPurchasedCourses(JSON.parse(saved));

    const fetchCourses = async () => {
      try {
        const res = await axiosWithToken.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('فشل تحميل الكورسات:', err);
        alert('حدث خطأ أثناء تحميل الكورسات');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleBuyNow = (course) => {
    window.open(course.paymentLink, '_blank');
    setTimeout(() => {
      alert(`${text.purchased || 'تم الشراء'}: ${course.title}`);
      const updated = [...purchasedCourses, course._id];
      setPurchasedCourses(updated);
      localStorage.setItem('purchasedCourses', JSON.stringify(updated));
      navigate(`/course/${course._id}`);
    }, 500);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {text.availableCourses || 'الكورسات المتاحة'}
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>جاري التحميل...</p>
      ) : (
        <div style={gridStyle}>
          {courses.map((c) => (
            <div
              key={c._id}
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div style={imagePlaceholder}>
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>

              <h3 style={titleStyle}>{c.title}</h3>
              <p style={descriptionStyle}>{c.description}</p>
              <p style={priceStyle}>
                {text.price || 'السعر'}: ${c.price}
              </p>

              {expandedId === c._id && <p style={detailStyle}>{c.details}</p>}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  onClick={() =>
                    setExpandedId(expandedId === c._id ? null : c._id)
                  }
                  style={learnBtnStyle}
                >
                  {expandedId === c._id
                    ? text.hideDetails || 'إخفاء التفاصيل'
                    : text.learnMore || 'تعلم المزيد'}
                </button>

                {purchasedCourses.includes(c._id) ? (
                  <button onClick={() => navigate(`/course/${c._id}`)} style={watchBtnStyle}>
                    {text.watch || 'شاهد'}
                  </button>
                ) : (
                  <button onClick={() => handleBuyNow(c)} style={buyBtnStyle}>
                    {text.buyNow || 'اشترِ الآن'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------- Styles --------------------

const containerStyle = {
  padding: '2rem',
  backgroundColor: '#f8f9fa',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
};

const cardStyle = {
  padding: '1.5rem',
  border: '1px solid #ddd',
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
};

const imagePlaceholder = {
  width: '100%',
  height: '150px',
  backgroundColor: '#e9ecef',
  borderRadius: '8px',
  marginBottom: '1rem',
  overflow: 'hidden',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#343a40',
  marginBottom: '0.5rem',
};

const descriptionStyle = {
  fontSize: '14px',
  color: '#555',
};

const detailStyle = {
  fontSize: '14px',
  color: '#444',
  marginTop: '0.5rem',
  fontStyle: 'italic',
};

const priceStyle = {
  fontWeight: 'bold',
  color: '#007bff',
  fontSize: '16px',
  marginTop: '0.5rem',
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
