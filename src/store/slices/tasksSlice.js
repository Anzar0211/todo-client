import { createSlice } from '@reduxjs/toolkit';
import { addTask, fetchTasks, removeTask, saveTask } from '../thunks/taskThunks.js';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    clearError: (s) => {
      s.error = null;
    },
    clearTasks: (s) => {
      s.items = [];
      s.loading = false;
      s.error = null;
    },
  },
  extraReducers: (b) =>
    b
      .addCase(fetchTasks.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchTasks.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(addTask.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })
      .addCase(saveTask.fulfilled, (s, a) => {
        const i = s.items.findIndex((t) => t._id === a.payload._id);
        if (i >= 0) s.items[i] = a.payload;
      })
      .addCase(removeTask.fulfilled, (s, a) => {
        s.items = s.items.filter((t) => t._id !== a.payload);
      })
      .addMatcher(
        (a) => a.type.startsWith('tasks/') && a.type.endsWith('/rejected'),
        (s, a) => {
          s.loading = false;
          s.error = a.error.message;
        }
      ),
});

export const { clearError, clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
