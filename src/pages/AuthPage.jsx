// src/pages/AuthPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bigcircle.png';
import { requestOTP, verifyOTP, saveToken } from '../api';

export default function AuthPage() {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Введите номер телефона');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await requestOTP(phone);
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Не удалось отправить код');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Введите код из SMS');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await verifyOTP(phone, code);
      saveToken(data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Неверный код');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-[420px] p-8 md:p-10 relative z-10">
        <h2 className="text-2xl font-medium text-center text-slate-900 mb-8">
          {step === 'phone' ? 'Вход / Регистрация' : 'Введите код'}
        </h2>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleRequestOTP} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-600 px-1">
                Номер телефона
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                placeholder="+79991234567"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#6544FF] focus:ring-1 focus:ring-[#6544FF] transition-all placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6544FF] hover:bg-[#5233E8] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-colors shadow-sm mt-2"
            >
              {loading ? 'Отправка...' : 'Получить код'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="flex flex-col gap-5">
            <p className="text-sm text-gray-500 text-center">
              Код отправлен на <span className="font-medium text-slate-800">{phone}</span>
            </p>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-600 px-1">
                Код из SMS
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
                placeholder="123456"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#6544FF] focus:ring-1 focus:ring-[#6544FF] transition-all placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed tracking-widest text-center"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6544FF] hover:bg-[#5233E8] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-colors shadow-sm"
            >
              {loading ? 'Проверка...' : 'Войти'}
            </button>

            <button
              type="button"
              onClick={() => { setStep('phone'); setCode(''); setError(null); }}
              disabled={loading}
              className="text-sm text-[#6544FF] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Изменить номер
            </button>
          </form>
        )}

        <div className="mt-8">
          <div className="text-sm text-gray-700 mb-4 px-1">Войти через</div>
          <div className="flex gap-3">
            <button
              type="button"
              disabled={loading}
              className="flex-1 flex items-center justify-center border border-gray-400 hover:border-[#00A03E] hover:bg-green-50/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-full py-2.5 transition-colors"
            >
              <span className="text-[#00A03E] font-semibold text-sm">Сбер ID</span>
            </button>
            <button
              type="button"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-400 hover:border-[#00A03E] hover:bg-green-50/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-full py-2.5 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#00A03E" strokeWidth="2" />
                <path d="M7 12.5L10.5 16L17 8" stroke="#00A03E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[#00A03E] font-semibold text-sm">Сбер Бизнес</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
