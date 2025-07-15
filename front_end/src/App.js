import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Community from './pages/Community';
import Courses from './pages/Courses';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import SocialIcon from './components/SocialIcon';
import CourseDetails from './pages/CourseDetails';
import AdminDashboard from './pages/AdminDashboard';
import AddCourse from './pages/AddCourse';
import UploadVideo from './pages/UploadVideo';
import UsersManagement from './pages/UsersManagement';
import CoursesManagement from './pages/CoursesManagement';





function App() {
  return (
    <>
      <Navbar />
      <Routes>
  {/* صفحات المستخدم العادي */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
  <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
  <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />

  {/* صفحات الأدمن */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/add-course"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AddCourse />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/upload-video"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <UploadVideo />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/users"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <UsersManagement />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/courses"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <CoursesManagement />
      </ProtectedRoute>
    }
  />
</Routes>

            <SocialIcon />

    </>
  );
}

export default App;
