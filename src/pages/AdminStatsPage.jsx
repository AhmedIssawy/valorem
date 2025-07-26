import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminStatsPage() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h2>لوحة البيانات</h2>
      <p>اختر ما تريد إدارته:</p>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => navigate('/admin/users')}>
          👤 إدارة المستخدمين
        </button>
        <button style={buttonStyle} onClick={() => navigate('/admin/courses')}>
          📚 إدارة الكورسات
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  padding: '2rem',
  textAlign: 'center',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  marginTop: '2rem',
};

const buttonStyle = {
  padding: '1rem 2rem',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

export default AdminStatsPage;
