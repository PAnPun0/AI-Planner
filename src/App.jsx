// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateEventPage from './pages/CreateEventPage';
import AuthPage from './pages/AuthPage';
import TasksDashboardPage from './pages/TasksDashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen font-sans text-slate-900 bg-white">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/dashboard" element={<TasksDashboardPage />} />
          <Route 
            path="*" 
            element={
              <div className="flex items-center justify-center min-h-screen text-2xl font-bold text-gray-400">
                404 | Страница не найдена
              </div>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}