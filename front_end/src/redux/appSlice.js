import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!JSON.parse(localStorage.getItem('user') || 'null'),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = appSlice.actions;
export default appSlice.reducer;