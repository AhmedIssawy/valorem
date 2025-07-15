import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // لازم هنا الـ payload يحتوي على firstName و lastName
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = appSlice.actions;
export default appSlice.reducer;
