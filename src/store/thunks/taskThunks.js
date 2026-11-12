import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskApi } from '../../api/taskApi.js';

export const fetchTasks = createAsyncThunk('tasks/fetch', () => taskApi.list());
export const addTask = createAsyncThunk('tasks/add', (task) => taskApi.create(task));
export const saveTask = createAsyncThunk('tasks/save', ({ id, ...changes }) => taskApi.update(id, changes));
export const removeTask = createAsyncThunk('tasks/remove', async (id) => {
  await taskApi.remove(id);
  return id;
});
