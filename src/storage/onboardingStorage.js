const KEY = 'todo-onboarded';

export const onboardingStorage = {
  isDone() {
    try {
      return !!localStorage.getItem(KEY);
    } catch {
      return false;
    }
  },
  markDone() {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* storage unavailable */
    }
  },
};
