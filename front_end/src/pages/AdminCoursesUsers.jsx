import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosWithToken from '../utils/axiosWithToken';

function AdminCoursesUsers() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, coursesRes] = await Promise.all([
        axiosWithToken.get('/users'),
        axiosWithToken.get('/courses'),
      ]);

      setUsers(usersRes.data);
      setCourses(coursesRes.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('فشل في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('هل أنت متأكد أنك تريد حذف هذا الكورس؟')) return;

    try {
      await axiosWithToken.delete(`/courses/${id}`);
      setCourses(prev => prev.filter(course => course._id !== id));
      alert('تم حذف الكورس بنجاح');
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('فشل في حذف الكورس');
    }
  };

  const handleEditCourse = (id) => {
    navigate(`/admin/edit-course/${id}`);
  };

  if (loading) return <div style={loadingStyle}>جاري تحميل البيانات...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>📚 إدارة الكورسات والمستخدمين</h2>
        <button onClick={() => navigate('/admin/add-course')} style={addBtnStyle}>
          إضافة كورس جديد
        </button>
      </div>

      {/* كورسات */}
      <section style={sectionStyle}>
        <h3>الكورسات ({courses.length})</h3>
        {courses.length === 0 ? (
          <p>لا توجد كورسات حالياً</p>
        ) : (
          <div style={tableContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>الصورة</th>
                  <th>العنوان</th>
                  <th>الوصف</th>
                  <th>السعر</th>
                  <th>تاريخ الإنشاء</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course._id}>
                    <td>
                      {course.image && (
                        <img src={course.image} alt={course.title} style={courseImageStyle} />
                      )}
                    </td>
                    <td>{course.title}</td>
                    <td>{course.description}</td>
                    <td>{course.price} جنيه</td>
                    <td>{new Date(course.createdAt).toLocaleDateString('ar-EG')}</td>
                    <td>
                      <button onClick={() => handleEditCourse(course._id)} style={editBtnStyle}>✏️ تعديل</button>
                      <button onClick={() => handleDeleteCourse(course._id)} style={deleteBtnStyle}>🗑️ حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* المستخدمين */}
      <section style={sectionStyle}>
        <h3>المستخدمين ({users.length})</h3>
        {users.length === 0 ? (
          <p>لا يوجد مستخدمين حالياً</p>
        ) : (
          <div style={tableContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>رقم الهاتف</th>
                  <th>الدور</th>
                  <th>تاريخ التسجيل</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber || 'غير محدد'}</td>
                    <td>
                      <span style={user.role === 'admin' ? adminBadgeStyle : userBadgeStyle}>
                        {user.role === 'admin' ? 'مدير' : 'مستخدم'}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString('ar-EG')}</td>
                    <td>
                      <span style={user.status === 'active' ? activeBadgeStyle : inactiveBadgeStyle}>
                        {user.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

// ✅ STYLES

const loadingStyle = {
  padding: '2rem',
  textAlign: 'center',
};

const errorStyle = {
  padding: '2rem',
  color: 'red',
  textAlign: 'center',
};

const containerStyle = {
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const addBtnStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const sectionStyle = {
  marginTop: '2rem',
};

const tableContainer = {
  marginTop: '1rem',
  overflowX: 'auto',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
};

const courseImageStyle = {
  width: '80px',
  height: '50px',
  objectFit: 'cover',
  borderRadius: '4px',
};

const editBtnStyle = {
  backgroundColor: '#ffc107',
  color: '#000',
  padding: '0.3rem 0.7rem',
  marginRight: '0.5rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteBtnStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '0.3rem 0.7rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const adminBadgeStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '12px',
};

const userBadgeStyle = {
  backgroundColor: '#6c757d',
  color: '#fff',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '12px',
};

const activeBadgeStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '12px',
};

const inactiveBadgeStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '12px',
};

export default AdminCoursesUsers;
