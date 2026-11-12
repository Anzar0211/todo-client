import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import AuthForm from './components/AuthForm';
import Onboarding from './components/Onboarding';

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
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="grid min-h-screen place-items-center bg-canvas text-sm text-mute">
                Signed in — home coming next.
              </div>
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
