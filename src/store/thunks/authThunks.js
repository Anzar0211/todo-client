import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi.js';
import { tokenStorage } from '../../api/tokenStorage.js';

export const register = createAsyncThunk('auth/register', async (payload) => {
  const data = await authApi.register(payload);
  tokenStorage.set(data.token);
  return data.user;
});

export const login = createAsyncThunk('auth/login', async (payload) => {
  const data = await authApi.login(payload);
  tokenStorage.set(data.token);
  return data.user;
});

export const loadSession = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  if (!tokenStorage.get()) return rejectWithValue('No session');
  try {
    const data = await authApi.me();
    return data.user;
  } catch (err) {
    tokenStorage.clear();
    return rejectWithValue(err.message);
  }
});
