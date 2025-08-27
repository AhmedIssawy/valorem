import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
// AUTH pages
import LoginPage from "../pages/login";
import Home from "../pages/home";
import SettingsPage from "../pages/settings";
// Course pages
import CoursesPage from "../pages/courses";
import CourseDetailPage from "../pages/course-detail";
import CourseWatchPage from "../pages/course-watch";
// Admin pages
import AdminCouponsPage from "../pages/admin-coupons";
import AdminOrdersPage from "../pages/admin-orders";
import AdminCourseVideosPage from "../pages/admin-course-videos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="courses" element={<CoursesPage />} />
      <Route path="courses/:id" element={<CourseDetailPage />} />
      <Route path="courses/:id/watch" element={<CourseWatchPage />} />
      <Route path="admin/coupons" element={<AdminCouponsPage />} />
      <Route path="admin/orders" element={<AdminOrdersPage />} />
      <Route path="admin/courses/:id/videos" element={<AdminCourseVideosPage />} />
    </Route>
  )
);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
