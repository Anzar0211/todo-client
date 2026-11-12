import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useTasks } from '../hooks/useTasks';

export default function AppShell() {
  const { error, clearError } = useTasks();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(67,97,238,0.12),_transparent_60%)]" />
      <NavBar />
      <div className="shell pb-28 pt-6 lg:pb-16 lg:pt-8">
        <Outlet />
      </div>
      {error && (
        <button
          role="alert"
          onClick={clearError}
          className="fixed inset-x-4 top-20 z-30 mx-auto max-w-lg rounded-xl bg-danger px-4 py-3 text-left text-sm text-white shadow-lg sm:inset-x-auto sm:right-6 sm:top-24"
        >
          {error} <span className="underline">Dismiss</span>
        </button>
      )}
    </div>
  );
}
