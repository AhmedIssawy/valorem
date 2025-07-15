import { useEffect, useState } from 'react';
import axiosWithToken from '../utils/axiosWithToken';

function UploadVideo() {
  const [video, setVideo] = useState({ courseId: '', title: '', file: null });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosWithToken.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        alert('فشل في تحميل الكورسات');
      }
    };
    fetchCourses();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!video.courseId) newErrors.courseId = 'يجب اختيار كورس';
    if (!video.title.trim()) newErrors.title = 'عنوان الفيديو مطلوب';
    if (!video.file) newErrors.file = 'يجب اختيار ملف فيديو';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const file = files[0];
      if (file) {
        const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'];
        if (!validTypes.includes(file.type)) {
          setErrors(prev => ({ ...prev, file: 'نوع الملف غير مدعوم' }));
          return;
        }
        if (file.size > 500 * 1024 * 1024) {
          setErrors(prev => ({ ...prev, file: 'الحجم يجب أن يكون أقل من 500MB' }));
          return;
        }
        setVideo(prev => ({ ...prev, file }));
        setErrors(prev => ({ ...prev, file: '' }));
      }
    } else {
      setVideo(prev => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('courseId', video.courseId);
    formData.append('title', video.title);
    formData.append('video', video.file);

    try {
      await axiosWithToken.post('/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      alert('تم رفع الفيديو بنجاح!');
      setVideo({ courseId: '', title: '', file: null });
      setUploadProgress(0);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('Error uploading video:', err);
      alert('فشل في رفع الفيديو');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '1.5rem' }}>رفع فيديو جديد</h2>
      <form onSubmit={handleSubmit}>
        <div style={fieldContainer}>
          <label style={labelStyle}>الكورس</label>
          <select
            name="courseId"
            value={video.courseId}
            onChange={handleChange}
            style={errors.courseId ? { ...inputStyle, borderColor: 'red' } : inputStyle}
          >
            <option value="">اختر الكورس</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
          {errors.courseId && <span style={errorStyle}>{errors.courseId}</span>}
        </div>

        <div style={fieldContainer}>
          <label style={labelStyle}>عنوان الفيديو</label>
          <input
            type="text"
            name="title"
            placeholder="عنوان الفيديو"
            value={video.title}
            onChange={handleChange}
            style={errors.title ? { ...inputStyle, borderColor: 'red' } : inputStyle}
          />
          {errors.title && <span style={errorStyle}>{errors.title}</span>}
        </div>

        <div style={fieldContainer}>
          <label style={labelStyle}>ملف الفيديو</label>
          <input
            type="file"
            name="file"
            accept="video/*"
            onChange={handleChange}
            style={{ ...inputStyle, padding: 0 }}
          />
          {errors.file && <span style={errorStyle}>{errors.file}</span>}
        </div>

        {loading && (
          <div style={progressContainer}>
            <div style={progressBar}>
              <div style={{ ...progressFill, width: `${uploadProgress}%` }} />
            </div>
            <span>{uploadProgress}%</span>
          </div>
        )}

        <button type="submit" disabled={loading} style={loading ? { ...btnStyle, opacity: 0.6 } : btnStyle}>
          {loading ? `جاري الرفع... ${uploadProgress}%` : 'رفع الفيديو'}
        </button>
      </form>
    </div>
  );
}

// ===================== Styles =====================

const containerStyle = {
  maxWidth: '600px',
  margin: '50px auto',
  padding: '2rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  display: 'block',
};

const fieldContainer = {
  marginBottom: '1.5rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
};

const errorStyle = {
  color: '#dc3545',
  fontSize: '14px',
  marginTop: '0.25rem',
  display: 'block',
};

const btnStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
};

const progressContainer = {
  margin: '1rem 0',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const progressBar = {
  flex: 1,
  height: '20px',
  backgroundColor: '#e9ecef',
  borderRadius: '10px',
  overflow: 'hidden',
};

const progressFill = {
  height: '100%',
  backgroundColor: '#007bff',
  transition: 'width 0.3s ease',
};

export default UploadVideo;
