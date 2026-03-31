// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateEventPage from './pages/CreateEventPage';
import AuthPage from './pages/AuthPage'; // Импортируем нашу новую страницу

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen font-sans text-slate-900 bg-white">
        <Routes>
          {/* Теперь стартовой страницей будет Авторизация */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          
          {/* Роут для Входа / Регистрации */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Роут для создания мероприятия (наш чат) */}
          <Route path="/create" element={<CreateEventPage />} />
          
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