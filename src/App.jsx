import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Onboarding from './components/Onboarding';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
