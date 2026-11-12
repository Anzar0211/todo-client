import { createSlice } from '@reduxjs/toolkit';
import { tokenStorage } from '../../api/tokenStorage.js';
import { loadSession, login, register } from '../thunks/authThunks.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: tokenStorage.get() ? 'loading' : 'anonymous',
    error: null,
  },
  reducers: {
    logout: (s) => {
      tokenStorage.clear();
      s.user = null;
      s.status = 'anonymous';
      s.error = null;
    },
    clearAuthError: (s) => {
      s.error = null;
    },
  },
  extraReducers: (b) =>
    b
      .addCase(loadSession.pending, (s) => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(loadSession.fulfilled, (s, a) => {
        s.status = 'authenticated';
        s.user = a.payload;
      })
      .addCase(loadSession.rejected, (s) => {
        s.status = 'anonymous';
        s.user = null;
      })
      .addCase(login.pending, (s) => {
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.status = 'authenticated';
        s.user = a.payload;
        s.error = null;
      })
      .addCase(login.rejected, (s, a) => {
        s.error = a.error.message;
      })
      .addCase(register.pending, (s) => {
        s.error = null;
      })
      .addCase(register.fulfilled, (s, a) => {
        s.status = 'authenticated';
        s.user = a.payload;
        s.error = null;
      })
      .addCase(register.rejected, (s, a) => {
        s.error = a.error.message;
      }),
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
