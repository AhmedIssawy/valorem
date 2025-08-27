// Authentication helper functions for localStorage management

export const setAuthState = (user: any) => {
  localStorage.setItem('valorem_auth', 'true');
  localStorage.setItem('valorem_user', JSON.stringify(user));
};

export const clearAuthState = () => {
  localStorage.removeItem('valorem_auth');
  localStorage.removeItem('valorem_user');
};

export const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('valorem_user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export const isAuthStored = () => {
  return localStorage.getItem('valorem_auth') === 'true';
};