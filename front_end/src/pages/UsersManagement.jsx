// src/pages/UsersManagement.jsx
import React, { useEffect, useState } from 'react';
import axiosWithToken from '../utils/axiosWithToken';

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axiosWithToken.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error loading users:', err);
      alert('فشل تحميل المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>إدارة المستخدمين</h2>
      {loading ? (
        <p>جاري تحميل المستخدمين...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>رقم الهاتف</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersManagement;
