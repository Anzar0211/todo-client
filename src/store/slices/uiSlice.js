import { createSlice } from '@reduxjs/toolkit';
import { onboardingStorage } from '../../storage/onboardingStorage.js';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { sheet: null, onboarded: onboardingStorage.isDone() },
  reducers: {
    openSheet: (s, a) => {
      s.sheet = a.payload || {};
    },
    closeSheet: (s) => {
      s.sheet = null;
    },
    finishOnboarding: (s) => {
      onboardingStorage.markDone();
      s.onboarded = true;
    },
  },
});

export const { openSheet, closeSheet, finishOnboarding } = uiSlice.actions;
export default uiSlice.reducer;
