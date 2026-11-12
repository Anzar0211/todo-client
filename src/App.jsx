import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import AppShell from './components/AppShell';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import Onboarding from './components/Onboarding';
import Search from './components/Search';

function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  const { fetchAll } = useTasks();

  useEffect(() => {
    if (isAuthenticated) fetchAll();
  }, [fetchAll, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-canvas text-sm text-mute">
        Checking your session…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const { isAuthenticated, loadSession } = useAuth();

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/welcome"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Onboarding />}
        />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
