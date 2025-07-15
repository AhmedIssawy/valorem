import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react'; // ✅ استيراد useContext
import { LanguageContext } from '../LanguageContext'; // ✅ مسار صحيح لملف السياق

const videoData = {
  1: [
    { title: 'Intro to Full Stack', url: 'https://www.youtube.com/embed/ZVnjOPwW4ZA' },
    { title: 'React Basics', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ],
  2: [
    { title: 'What is Data Science?', url: 'https://www.youtube.com/embed/jCzT9XFZ5bw' },
    { title: 'ML with Scikit-Learn', url: 'https://www.youtube.com/embed/NVDW6GzYIbk' },
  ],
  3: [
    { title: 'Figma Basics', url: 'https://www.youtube.com/embed/FTFaQWZBqQ8' },
    { title: 'Design Thinking', url: 'https://www.youtube.com/embed/_0Z8CPpmm88' },
  ],
  4: [
    { title: 'Cybersecurity Intro', url: 'https://www.youtube.com/embed/Wy4fAgzKLh8' },
    { title: 'Ethical Hacking', url: 'https://www.youtube.com/embed/Zsa_lCzAfZk' },
  ],
};

function CourseDetails() {
  const { id } = useParams();
  const courseId = parseInt(id);
  const videos = videoData[courseId] || [];
  const navigate = useNavigate();
  const { text } = useContext(LanguageContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{text.courseVideos}</h2>

      {videos.length === 0 ? (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>{text.noVideos}</p>
      ) : (
        videos.map((vid, idx) => (
          <div key={idx} style={{ marginBottom: '2rem' }}>
            <h4>{vid.title}</h4>
            <iframe
              width="100%"
              height="315"
              src={vid.url}
              title={vid.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))
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
