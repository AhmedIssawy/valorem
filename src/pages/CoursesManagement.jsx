import React, { useEffect, useState } from 'react';
import axiosWithToken from '../utils/axiosWithToken';
import './CoursesManagement.css'; // تأكد أن الملف موجود

function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    instructor: '',
    duration: '',
    price: '',
    status: 'نشط'
  });
  const [editId, setEditId] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axiosWithToken.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error loading courses:', err);
      alert('فشل تحميل الكورسات');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosWithToken.put(`/courses/${editId}`, form);
        alert('تم تعديل الكورس بنجاح');
      } else {
        await axiosWithToken.post('/courses', form);
        alert('تم إضافة الكورس');
      }
      setForm({ title: '', instructor: '', duration: '', price: '', status: 'نشط' });
      setEditId(null);
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      console.error('Error saving course:', err);
      alert('فشل في حفظ الكورس');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الكورس؟')) return;
    try {
      await axiosWithToken.delete(`/courses/${id}`);
      alert('تم الحذف');
      fetchCourses();
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('فشل حذف الكورس');
    }
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditId(course._id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setForm({ title: '', instructor: '', duration: '', price: '', status: 'نشط' });
    setEditId(null);
    setShowForm(false);
  };

  const handleDeleteVideo = async (courseId, videoId) => {
    if (!window.confirm('هل تريد حذف هذا الفيديو؟')) return;
    try {
      await axiosWithToken.delete(`/courses/${courseId}/videos/${videoId}`);
      alert('تم حذف الفيديو');
      fetchCourses();
    } catch (err) {
      console.error('فشل حذف الفيديو:', err);
      alert('حدث خطأ أثناء الحذف');
    }
  };

  const handleUploadVideo = async (e, courseId) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('video', e.target.videoFile.files[0]);

    try {
      await axiosWithToken.post(`/courses/${courseId}/videos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('تم رفع الفيديو');
      fetchCourses();
    } catch (err) {
      console.error('فشل رفع الفيديو:', err);
      alert('حدث خطأ أثناء رفع الفيديو');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h2>إدارة الكورسات</h2>

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="add-user-btn">
          + إضافة كورس
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="user-form">
          <input name="title" placeholder="عنوان الكورس" value={form.title} onChange={handleInputChange} required />
          <input name="instructor" placeholder="اسم المدرب" value={form.instructor} onChange={handleInputChange} required />
          <input name="duration" placeholder="المدة" value={form.duration} onChange={handleInputChange} required />
          <input name="price" type="number" placeholder="السعر" value={form.price} onChange={handleInputChange} required />
          <select name="status" value={form.status} onChange={handleInputChange}>
            <option value="نشط">نشط</option>
            <option value="متوقف">متوقف</option>
          </select>
          <div className="form-buttons">
            <button type="submit">{editId ? 'تعديل الكورس' : 'حفظ الكورس'}</button>
            <button type="button" onClick={handleCancel}>إلغاء</button>
          </div>
        </form>
      )}

      {loading ? (
        <p>جاري تحميل الكورسات...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>العنوان</th>
              <th>المدرب</th>
              <th>المدة</th>
              <th>السعر</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>
                  <strong>{course.title}</strong>
                  <br />
                  {course.videos && course.videos.length > 0 && (
                    <ul>
                      {course.videos.map((video) => (
                        <li key={video._id}>
                          🎬 {video.title}
                          <button
                            onClick={() => handleDeleteVideo(course._id, video._id)}
                            style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                          >
                            حذف
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <form onSubmit={(e) => handleUploadVideo(e, course._id)} style={{ marginTop: '1rem' }}>
                    <input type="text" name="title" placeholder="عنوان الفيديو" required />
                    <input type="file" name="videoFile" accept="video/*" required />
                    <button type="submit" style={{ marginTop: '5px' }}>رفع فيديو</button>
                  </form>
                </td>
                <td>{course.instructor}</td>
                <td>{course.duration}</td>
                <td>{course.price} جنيه</td>
                <td>{course.status}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(course)}>تعديل</button>
                  <button className="delete" onClick={() => handleDelete(course._id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CoursesManagement;
