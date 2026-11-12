import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSheet, finishOnboarding, openSheet } from '../store';

export function useUi() {
  const dispatch = useDispatch();
  const { sheet, onboarded } = useSelector((s) => s.ui);

  const open = useCallback((task) => dispatch(openSheet(task || {})), [dispatch]);
  const close = useCallback(() => dispatch(closeSheet()), [dispatch]);
  const finish = useCallback(() => dispatch(finishOnboarding()), [dispatch]);

  return {
    sheet,
    onboarded,
    openSheet: open,
    closeSheet: close,
    finishOnboarding: finish,
  };
}
