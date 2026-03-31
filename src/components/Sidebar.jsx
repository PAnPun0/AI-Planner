// src/components/dashboard/Sidebar.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Sidebar({ activeNav = 'events', onNavChange }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Закрытие меню профиля при клике вне его области
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-[88px] bg-[#DCE4FF] flex flex-col items-center py-6 gap-4 shrink-0 relative z-50 border-r border-indigo-50/50">
      
      {/* 1. Мои мероприятия (Звезда) */}
      <button 
        onClick={() => onNavChange('events')}
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm ${
          activeNav === 'events' 
            ? 'bg-[#1C007C] text-white shadow-md' // Активный темный стиль из макета
            : 'bg-white text-gray-400 hover:text-[#6544FF]'
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill={activeNav === 'events' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </button>

      {/* 2. Дашборд мероприятия (Сетка) */}
      <button 
        onClick={() => onNavChange('dashboard')}
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm ${
          activeNav === 'dashboard' 
            ? 'bg-[#1C007C] text-white shadow-md' 
            : 'bg-white text-gray-400 hover:text-[#6544FF]'
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>

      {/* 3. Контакты (Люди) */}
      <button className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#6544FF] hover:shadow-md transition-all">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </button>
      
      {/* --- ПРОФИЛЬ (Меню внизу) --- */}
      <div className="absolute bottom-6" ref={profileRef}>
        
        {/* Аватарка */}
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-12 h-12 rounded-full bg-[#1C007C] text-white flex items-center justify-center font-semibold text-lg shadow-md hover:opacity-90 transition-opacity"
        >
          Av
        </button>

        {/* Всплывающее меню (Меню появляется правее аватарки) */}
        {isProfileOpen && (
          <div className="absolute left-[60px] bottom-0 w-[200px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2 flex flex-col overflow-hidden animate-fade-in z-50">
            
            <button className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors w-full text-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Профиль
            </button>
            
            <button className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors w-full text-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Настройки
            </button>
            
            <button className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors w-full text-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Домены и отправители
            </button>

            <div className="h-[1px] bg-gray-100 my-1 w-full"></div>
            
            <button 
              onClick={() => navigate('/auth')} // При выходе кидаем на страницу авторизации
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Выйти
            </button>
          </div>
        )}
      </div>

    </div>
  );
}