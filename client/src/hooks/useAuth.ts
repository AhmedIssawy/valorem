import { useState, useEffect } from 'react';
import { useGetMeQuery } from '../app/api/authApiSlice';
import { setAuthState, clearAuthState, isAuthStored } from '../utils/authHelpers';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  checkAuth: () => void;
}

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check localStorage on initial load
    return isAuthStored();
  });

  const { 
    data: userData, 
    isLoading: isQueryLoading, 
    error,
    refetch 
  } = useGetMeQuery({}, {
    skip: false, // Always try to fetch - let the server decide if authenticated
  });

  const user = userData?.data?.user;
  const isLoading = isQueryLoading;

  useEffect(() => {
    if (userData?.data?.user) {
      // User is authenticated, update localStorage
      setAuthState(userData.data.user);
      setIsAuthenticated(true);
    } else if (error && 'status' in error && (error.status === 401 || error.status === 403)) {
      // User is not authenticated, clear localStorage
      clearAuthState();
      setIsAuthenticated(false);
    } else if (!isQueryLoading && !userData && !error) {
      // Query completed but no user data and no error - likely not authenticated
      clearAuthState();
      setIsAuthenticated(false);
    }
  }, [userData, error, isQueryLoading]);


  const checkAuth = () => {
    // Force re-check authentication
    if (isAuthStored()) {
      setIsAuthenticated(true);
      refetch();
    }
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    checkAuth,
  };
};