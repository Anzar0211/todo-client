import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import uiReducer from './slices/uiSlice.js';

export { register, login, loadSession } from './thunks/authThunks.js';
export { logout, clearAuthError } from './slices/authSlice.js';
export { openSheet, closeSheet, finishOnboarding } from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});
