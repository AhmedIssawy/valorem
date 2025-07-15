import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosWithToken from '../utils/axiosWithToken';

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, courses: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          axiosWithToken.get('/users'),
          axiosWithToken.get('/courses'),
        ]);

        setStats({
          users: usersRes.data.length,
          courses: coursesRes.data.length,
        });
      } catch (err) {
        console.error('فشل تحميل الإحصائيات:', err);
        alert('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const adminCards = [
    {
      title: '➕ إضافة كورس',
      description: 'إنشاء كورسات جديدة بسهولة من خلال هذه الواجهة.',
      action: () => navigate('/admin/add-course'),
    },
    {
      title: '📤 رفع فيديو',
      description: 'ارفع فيديوهات خاصة بالكورسات المضافة.',
      action: () => navigate('/admin/upload-video'),
    },
    {
      title: '📊 لوحة البيانات',
      description: `عدد المستخدمين: ${stats.users} — عدد الكورسات: ${stats.courses}`,
      action: () => navigate('/admin/stats'),
    },
    {
      title: '🛠️ إدارة الكورسات والمستخدمين',
      description: 'تحكم كامل في تعديل أو حذف الكورسات واستعراض بيانات المستخدمين.',
      action: () => navigate('/admin/stats'),
    },
  ];

  if (loading) return <div style={{ padding: '2rem' }}>جاري تحميل البيانات...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>لوحة تحكم الأدمن</h2>
      <div style={cardContainer}>
        {adminCards.map((card, index) => (
          <div key={index} style={cardStyle}>
            <h3 style={{ marginBottom: '0.5rem' }}>{card.title}</h3>
            <p style={{ marginBottom: '1rem', fontSize: '14px', color: '#333' }}>{card.description}</p>
            <button onClick={card.action} style={btnStyle}>اذهب</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.5rem',
  marginTop: '2rem',
};

const cardStyle = {
  backgroundColor: '#f9f9f9',
  padding: '1.5rem',
  borderRadius: '8px',
  width: '250px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const btnStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default AdminDashboard;
