import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearError, fetchTasks, removeTask, saveTask } from '../store';

export function useTasks() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s) => s.tasks);

  const fetchAll = useCallback(() => dispatch(fetchTasks()), [dispatch]);
  const create = useCallback((task) => dispatch(addTask(task)), [dispatch]);
  const update = useCallback((payload) => dispatch(saveTask(payload)), [dispatch]);
  const remove = useCallback((id) => dispatch(removeTask(id)), [dispatch]);
  const clearTasksError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError: clearTasksError,
  };
}
