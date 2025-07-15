import React, { useEffect, useState } from 'react';
import axiosWithToken from '../utils/axiosWithToken';
import './UsersManagement.css';

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    status: 'نشط'
  });
  const [editId, setEditId] = useState(null);

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

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosWithToken.put(`/users/${editId}`, form);
        alert('تم تعديل المستخدم');
      } else {
        await axiosWithToken.post('/users', form);
        alert('تم إضافة مستخدم');
      }
      setForm({ firstName: '', lastName: '', email: '', phoneNumber: '', status: 'نشط' });
      setEditId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error('Error saving user:', err);
      alert('فشل حفظ المستخدم');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    try {
      await axiosWithToken.delete(`/users/${id}`);
      alert('تم حذف المستخدم');
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('فشل حذف المستخدم');
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user._id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setForm({ firstName: '', lastName: '', email: '', phoneNumber: '', status: 'نشط' });
    setEditId(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>إدارة المستخدمين</h2>

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="add-user-btn">
          + إضافة مستخدم
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="user-form">
          <input name="firstName" placeholder="الاسم الأول" value={form.firstName} onChange={handleInputChange} required />
          <input name="lastName" placeholder="الاسم الأخير" value={form.lastName} onChange={handleInputChange} required />
          <input name="email" type="email" placeholder="البريد الإلكتروني" value={form.email} onChange={handleInputChange} required />
          <input name="phoneNumber" placeholder="رقم الهاتف" value={form.phoneNumber} onChange={handleInputChange} />
          <select name="status" value={form.status} onChange={handleInputChange}>
            <option value="نشط">نشط</option>
            <option value="محظور">محظور</option>
          </select>
          <div className="form-buttons">
            <button type="submit">{editId ? 'تعديل المستخدم' : 'حفظ المستخدم'}</button>
            <button type="button" onClick={handleCancel}>إلغاء</button>
          </div>
        </form>
      )}

      {loading ? (
        <p>جاري تحميل المستخدمين...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>رقم الهاتف</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.status}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(user)}>تعديل</button>
                  <button className="delete" onClick={() => handleDelete(user._id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersManagement;
