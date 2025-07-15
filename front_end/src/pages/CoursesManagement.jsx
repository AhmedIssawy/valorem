// src/pages/CoursesManagement.jsx
import React, { useEffect, useState } from 'react';
import axiosWithToken from '../utils/axiosWithToken';

function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>إدارة الكورسات</h2>
      {loading ? (
        <p>جاري تحميل الكورسات...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>العنوان</th>
              <th>المدرب</th>
              <th>المدة</th>
              <th>السعر</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.instructor}</td>
                <td>{course.duration}</td>
                <td>{course.price} جنيه</td>
                <td>{course.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CoursesManagement;
