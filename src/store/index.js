import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import tasksReducer from './slices/tasksSlice.js';
import uiReducer from './slices/uiSlice.js';

export { register, login, loadSession } from './thunks/authThunks.js';
export { fetchTasks, addTask, saveTask, removeTask } from './thunks/taskThunks.js';
export { logout, clearAuthError } from './slices/authSlice.js';
export { clearError, clearTasks } from './slices/tasksSlice.js';
export { openSheet, closeSheet, finishOnboarding } from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    ui: uiReducer,
  },
});
