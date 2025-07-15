// =============================================================================
// 1. Enhanced AddCourse Component with Better Error Handling
// =============================================================================

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
    if (!course.price || course.price <= 0) newErrors.price = 'السعر يجب أن يكون أكبر من صفر';
    if (!course.paymentLink.trim()) newErrors.paymentLink = 'رابط الدفع مطلوب';
    if (!course.image) newErrors.image = 'الصورة مطلوبة';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'يجب أن تكون الصورة من نوع JPG أو PNG' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' }));
        return;
      }
      
      setCourse(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    const formData = new FormData();
    Object.keys(course).forEach(key => {
      formData.append(key, course[key]);
    });

    try {
      await axiosWithToken.post('/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('تم إضافة الكورس بنجاح!');
      navigate('/admin');
    } catch (error) {
      console.error('Error adding course:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء إضافة الكورس';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>إضافة كورس جديد</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={fieldContainer}>
          <input
            type="text"
            name="title"
            placeholder="عنوان الكورس"
            value={course.title}
            onChange={handleChange}
            style={errors.title ? { ...inputStyle, borderColor: 'red' } : inputStyle}
          />
          {errors.title && <span style={errorStyle}>{errors.title}</span>}
        </div>

        <div style={fieldContainer}>
          <input
            type="text"
            name="description"
            placeholder="وصف مختصر"
            value={course.description}
            onChange={handleChange}
            style={errors.description ? { ...inputStyle, borderColor: 'red' } : inputStyle}
          />
          {errors.description && <span style={errorStyle}>{errors.description}</span>}
        </div>

        <div style={fieldContainer}>
          <textarea
            name="details"
            placeholder="تفاصيل الكورس"
            value={course.details}
            onChange={handleChange}
            style={errors.details ? { ...textareaStyle, borderColor: 'red' } : textareaStyle}
          />
          {errors.details && <span style={errorStyle}>{errors.details}</span>}
        </div>

        <div style={fieldContainer}>
          <input
            type="number"
            name="price"
            placeholder="السعر (بالجنيه)"
            value={course.price}
            onChange={handleChange}
            style={errors.price ? { ...inputStyle, borderColor: 'red' } : inputStyle}
          />
          {errors.price && <span style={errorStyle}>{errors.price}</span>}
        </div>

        <div style={fieldContainer}>
          <input
            type="url"
            name="paymentLink"
            placeholder="رابط الدفع"
            value={course.paymentLink}
            onChange={handleChange}
            style={errors.paymentLink ? { ...inputStyle, borderColor: 'red' } : inputStyle}
          />
          {errors.paymentLink && <span style={errorStyle}>{errors.paymentLink}</span>}
        </div>

        <div style={fieldContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ margin: '1rem 0' }}
          />
          {errors.image && <span style={errorStyle}>{errors.image}</span>}
          {preview && (
            <img src={preview} alt="Course preview" style={previewStyle} />
          )}
        </div>

        <button type="submit" disabled={loading} style={loading ? { ...btnStyle, opacity: 0.6 } : btnStyle}>
          {loading ? 'جاري الإضافة...' : 'إضافة الكورس'}
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
  maxWidth: '200px',
  maxHeight: '150px',
  borderRadius: '4px',
  marginTop: '1rem',
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
export default AddCourse;
// ==================================================