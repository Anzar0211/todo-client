import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice.js';

export { openSheet, closeSheet, finishOnboarding } from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});
