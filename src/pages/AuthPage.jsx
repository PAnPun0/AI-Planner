// src/pages/AuthPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bigcircle.png';
import { loginUser, registerUser, saveToken } from '../api'; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phone.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      
      if (isLogin) {
        // Вход пользователя
        result = await loginUser(phone, password);
      } else {
        // Регистрация пользователя
        result = await registerUser(phone, password);
      }

      if (result.success && result.token) {
        // Сохраняем токен и перенаправляем на страницу создания события
        saveToken(result.token);
        navigate('/create');
      } else {
        setError(result.error || 'Произошла ошибка');
      }
    } catch (err) {
      const errorMsg = err?.error || 'Произошла ошибка. Попробуйте позже.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      {/* Карточка */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-[420px] p-8 md:p-10 relative z-10">
        
        <h2 className="text-2xl font-medium text-center text-slate-900 mb-8">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Поле: Номер телефона */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-600 px-1">
              Укажите номер телефона
            </label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              placeholder="Номер" 
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#6544FF] focus:ring-1 focus:ring-[#6544FF] transition-all placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Поле: Пароль */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-600 px-1">
              Введите пароль
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Пароль" 
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#6544FF] focus:ring-1 focus:ring-[#6544FF] transition-all placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Чекбокс согласия (показываем только при регистрации) */}
          {!isLogin && (
            <label className="flex items-start gap-3 mt-1 cursor-pointer group">
              <input 
                type="checkbox" 
                required
                disabled={loading}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#6544FF] focus:ring-[#6544FF] cursor-pointer disabled:cursor-not-allowed"
              />
              <span className="text-xs text-gray-500 leading-tight">
                Я даю согласие на использование{' '}
                <a href="#" className="text-[#6544FF] hover:underline">персональных данных</a>
              </span>
            </label>
          )}

          {/* Главная кнопка */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#6544FF] hover:bg-[#5233E8] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-colors shadow-sm mt-2"
          >
            {loading ? (isLogin ? 'Вход...' : 'Регистрация...') : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        {/* Смена режима Вход/Регистрация */}
        <div className="text-center mt-6 text-sm text-gray-500">
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            disabled={loading}
            className="text-[#6544FF] font-medium hover:underline outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>

        {/* Блок "Войти через Сбер" */}
        <div className="mt-8">
          <div className="text-sm text-gray-700 mb-4 px-1">
            Войти в аккаунт через
          </div>
          
          <div className="flex gap-3">
            {/* Кнопка Сбер ID */}
            <button 
              type="button"
              disabled={loading}
              className="flex-1 flex items-center justify-center border border-gray-400 hover:border-[#00A03E] hover:bg-green-50/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-full py-2.5 transition-colors"
            >
              <span className="text-[#00A03E] font-semibold text-sm">Сбер ID</span>
            </button>

            {/* Кнопка Сбер Бизнес */}
            <button 
              type="button"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-400 hover:border-[#00A03E] hover:bg-green-50/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-full py-2.5 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#00A03E" strokeWidth="2"/>
                <path d="M7 12.5L10.5 16L17 8" stroke="#00A03E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[#00A03E] font-semibold text-sm">Сбер Бизнес</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}