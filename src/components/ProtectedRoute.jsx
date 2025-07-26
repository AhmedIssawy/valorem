import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = useSelector((state) => state.app.user);

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <h2 style={{ padding: '2rem', color: 'red' }}>🚫 Access Denied</h2>;
  }

  return children;
}

export default ProtectedRoute;
