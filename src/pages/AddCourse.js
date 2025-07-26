import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosWithToken from '../utils/axiosWithToken';

function AddCourse() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    details: '',
    price: '',
    paymentLink: '',
    instructor: '',
    duration: '',
    status: 'نشط',
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!course.title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!course.description.trim()) newErrors.description = 'الوصف مطلوب';
    if (!course.details.trim()) newErrors.details = 'التفاصيل مطلوبة';
    if (!course.price || course.price <= 0) newErrors.price = 'السعر غير صالح';
    if (!course.paymentLink.trim()) newErrors.paymentLink = 'رابط الدفع مطلوب';
    if (!course.instructor.trim()) newErrors.instructor = 'اسم المدرب مطلوب';
    if (!course.duration.trim()) newErrors.duration = 'المدة مطلوبة';
    if (!course.image) newErrors.image = 'الصورة مطلوبة';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      return setErrors(prev => ({ ...prev, image: 'يجب أن تكون الصورة من نوع JPG أو PNG' }));
    }

    if (file.size > 5 * 1024 * 1024) {
      return setErrors(prev => ({ ...prev, image: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' }));
    }

    setCourse(prev => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();
    Object.keys(course).forEach(key => formData.append(key, course[key]));

    try {
      await axiosWithToken.post('/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ تم إضافة الكورس بنجاح');
      navigate('/admin');
    } catch (err) {
      console.error('Error:', err);
      alert(err.response?.data?.message || '❌ حدث خطأ أثناء إضافة الكورس');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>إضافة كورس جديد</h2>
      <form onSubmit={handleSubmit}>
        {['title', 'description', 'details', 'price', 'paymentLink', 'instructor', 'duration'].map(field => (
          <div key={field} style={fieldContainer}>
            {field === 'details' ? (
              <textarea
                name={field}
                placeholder={`أدخل ${field === 'details' ? 'تفاصيل الكورس' : field}`}
                value={course[field]}
                onChange={handleChange}
                style={errors[field] ? { ...textareaStyle, borderColor: 'red' } : textareaStyle}
              />
            ) : (
              <input
                type={field === 'price' ? 'number' : 'text'}
                name={field}
                placeholder={`أدخل ${field === 'price' ? 'السعر' : field}`}
                value={course[field]}
                onChange={handleChange}
                style={errors[field] ? { ...inputStyle, borderColor: 'red' } : inputStyle}
              />
            )}
            {errors[field] && <span style={errorStyle}>{errors[field]}</span>}
          </div>
        ))}

        <div style={fieldContainer}>
          <select name="status" value={course.status} onChange={handleChange} style={inputStyle}>
            <option value="نشط">نشط</option>
            <option value="متوقف">متوقف</option>
          </select>
        </div>

        <div style={fieldContainer}>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {errors.image && <span style={errorStyle}>{errors.image}</span>}
          {preview && <img src={preview} alt="preview" style={previewStyle} />}
        </div>

        <button type="submit" disabled={loading} style={loading ? { ...btnStyle, opacity: 0.6 } : btnStyle}>
          {loading ? 'جاري الإضافة...' : 'إضافة الكورس'}
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '600px',
  margin: '2rem auto',
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const fieldContainer = {
  marginBottom: '1rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const textareaStyle = {
  ...inputStyle,
  height: '100px',
  resize: 'vertical',
};

const errorStyle = {
  color: '#dc3545',
  fontSize: '14px',
  marginTop: '0.25rem',
  display: 'block',
};

const previewStyle = {
  maxWidth: '100%',
  maxHeight: '150px',
  marginTop: '1rem',
  borderRadius: '4px',
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

export default AddCourse;
