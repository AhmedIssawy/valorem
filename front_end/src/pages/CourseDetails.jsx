import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../LanguageContext';
import axiosWithToken from '../utils/axiosWithToken';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { text } = useContext(LanguageContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const checkAccessAndFetch = async () => {
      try {
        const accessRes = await axiosWithToken.get(`/purchases/${id}`);
        if (!accessRes.data.hasAccess) {
          alert('لا يمكنك مشاهدة هذا الكورس قبل الشراء.');
          navigate('/courses');
          return;
        }
        setAccessGranted(true);

        const courseRes = await axiosWithToken.get(`/courses/${id}`);
        setCourse(courseRes.data);
      } catch (err) {
        console.error('فشل التحقق من الصلاحية أو تحميل الكورس:', err);
        alert('حدث خطأ، يرجى المحاولة لاحقًا.');
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };

    checkAccessAndFetch();
  }, [id, navigate]);

  if (loading) return <p style={{ padding: '2rem' }}>جاري التحميل...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{text.courseVideos}</h2>

      {accessGranted && course && course.videos?.length > 0 ? (
        course.videos.map((vid, idx) => (
          <div key={idx} style={{ marginBottom: '2rem' }}>
            <h4>{vid.title}</h4>
            <iframe
              width="100%"
              height="315"
              src={vid.url || vid.videoUrl}
              title={vid.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))
      ) : (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>{text.noVideos}</p>
      )}

      <button
        onClick={() => navigate('/courses')}
        style={{
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ← {text.backToCourses}
      </button>
    </div>
  );
}

export default CourseDetails;
