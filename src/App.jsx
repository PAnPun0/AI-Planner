// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateEventPage from './pages/CreateEventPage';

export default function App() {
  return (
    // BrowserRouter оборачивает все приложение для работы навигации
    <BrowserRouter>
      {/* Контейнер для общих стилей приложения (на всякий случай) */}
      <div className="w-full min-h-screen font-sans text-slate-900 bg-white">
        
        <Routes>
          {/* Редирект с главной страницы на страницу создания, пока нет дашборда */}
          <Route path="/" element={<Navigate to="/create" replace />} />
          
          {/* Наша сверстанная страница */}
          <Route path="/create" element={<CreateEventPage />} />

          {/* 
            Задел на будущее для других страниц хакатона:
            <Route path="/events" element={<EventsListPage />} />
            <Route path="/event/:id" element={<EventDashboardPage />} />
          */}
          
          {/* Обработка несуществующих маршрутов (404) */}
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