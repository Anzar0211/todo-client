import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, loadSession, login, logout, register } from '../store';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((s) => s.auth);

  const loadSessionAction = useCallback(() => dispatch(loadSession()), [dispatch]);
  const loginAction = useCallback((payload) => dispatch(login(payload)), [dispatch]);
  const registerAction = useCallback((payload) => dispatch(register(payload)), [dispatch]);
  const clearError = useCallback(() => dispatch(clearAuthError()), [dispatch]);
  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    user,
    status,
    error,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    loadSession: loadSessionAction,
    login: loginAction,
    register: registerAction,
    clearError,
    signOut,
  };
}
