import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../hooks/useAuth';
import { useLogoutMutation } from '../app/api/authApiSlice';
import { clearAuthState } from '../utils/authHelpers';
import { toast } from 'react-toastify';
import { Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [logout] = useLogoutMutation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      clearAuthState();
      toast.success('Logged out successfully');
      window.location.href = '/'; // Force refresh to clear all state
    } catch (error) {
      // Even if logout fails on server, clear local state
      clearAuthState();
      window.location.href = '/';
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Valorem
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/">
                <Button 
                  variant={isActive('/') ? 'default' : 'ghost'}
                  size="sm"
                >
                  Home
                </Button>
              </Link>
              
              <Link to="/courses">
                <Button 
                  variant={isActive('/courses') ? 'default' : 'ghost'}
                  size="sm"
                >
                  Courses
                </Button>
              </Link>

              <Link to="/settings">
                <Button 
                  variant={isActive('/settings') ? 'default' : 'ghost'}
                  size="sm"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name || 'User'}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
            
            {/* Admin Links - Show only for authenticated admin users */}
            {isAuthenticated && user?.isAdmin && (
              <div className="hidden md:flex space-x-2">
                <Link to="/admin/orders">
                  <Button 
                    variant={isActive('/admin/orders') ? 'default' : 'ghost'}
                    size="sm"
                  >
                    Orders
                  </Button>
                </Link>
                
                <Link to="/admin/coupons">
                  <Button 
                    variant={isActive('/admin/coupons') ? 'default' : 'ghost'}
                    size="sm"
                  >
                    Coupons
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;