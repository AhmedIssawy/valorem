import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SocialIcon from './components/SocialIcon';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Community from './pages/Community';
import CourseDetails from './pages/CourseDetails';
import Courses from './pages/Courses';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCourse from './pages/AddCourse';
import UploadVideo from './pages/UploadVideo';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={<ProtectedRoute><About /></ProtectedRoute>}
        />
        <Route
          path="/courses"
          element={<ProtectedRoute><Courses /></ProtectedRoute>}
        />
        <Route
          path="/community"
          element={<ProtectedRoute><Community /></ProtectedRoute>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route path="/admin/add-course" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AddCourse />
  </ProtectedRoute>
} />

<Route path="/admin/upload-video" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <UploadVideo />
  </ProtectedRoute>
} />
      </Routes>

      <SocialIcon />
    </>
  );
}
