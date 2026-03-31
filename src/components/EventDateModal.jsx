// src/components/EventDateModal.jsx
import { useState } from 'react';

export function EventDateModal({ isOpen, onClose, onSave }) {
  // Состояния для хранения введенных данных
  const [timeZone, setTimeZone] = useState('Asia/Yakutsk (GMT+9)');
  const [startDate, setStartDate] = useState('2026-04-09');
  const [startTime, setStartTime] = useState('12:00');
  const [endDate, setEndDate] = useState('2026-04-10');
  const [endTime, setEndTime] = useState('10:45');
  const[hasNoEndDate, setHasNoEndDate] = useState(false);

  // Если окно закрыто, не рендерим ничего
  if (!isOpen) return null;

  // Функция для обработки кнопки "Сохранить"
  const handleSave = () => {
    // Формируем красивое текстовое сообщение для отправки ИИ-агенту
    let message = `Я выбрал дату проведения.\nЧасовой пояс: ${timeZone}\nНачало: ${startDate} в ${startTime}`;
    
    if (hasNoEndDate) {
      message += `\nМероприятие без четкого времени окончания.`;
    } else {
      message += `\nОкончание: ${endDate} в ${endTime}`;
    }

    onSave(message); // Передаем сообщение наверх
    onClose();       // Закрываем окно
  };

  return (
    // Задний фон: фиксируем на весь экран, добавляем затемнение и размытие (backdrop-blur)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      
      {/* Само окно */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
        
        {/* Кнопка закрытия крестиком */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-medium text-slate-800 mb-6">Настройка даты и времени</h2>

        {/* Выбор часового пояса */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-500 mb-1 px-1">Выберите часовой пояс</label>
          <select 
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full bg-[#F1F2F5] text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4038FF] transition-all cursor-pointer appearance-none"
          >
            <option value="Europe/Moscow (GMT+3)">Europe/Moscow (GMT+3)</option>
            <option value="Asia/Yekaterinburg (GMT+5)">Asia/Yekaterinburg (GMT+5)</option>
            <option value="Asia/Yakutsk (GMT+9)">Asia/Yakutsk (GMT+9)</option>
            <option value="Asia/Vladivostok (GMT+10)">Asia/Vladivostok (GMT+10)</option>
          </select>
        </div>

        {/* Контейнер дат: Начало и Конец */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-6">
          
          {/* Начало мероприятия */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1 px-1">Начало мероприятия</label>
            <div className="flex gap-2">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#F1F2F5] text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4038FF] transition-all"
              />
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-24 shrink-0 bg-[#F1F2F5] text-slate-800 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#4038FF] transition-all text-center"
              />
            </div>
          </div>

          {!hasNoEndDate && (
            <>
              <div className="hidden md:block pb-3 text-gray-400">—</div>

              {/* Конец мероприятия */}
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium text-gray-500 mb-1 px-1">Конец мероприятия</label>
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#F1F2F5] text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4038FF] transition-all"
                  />
                  <input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-24 shrink-0 bg-[#F1F2F5] text-slate-800 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#4038FF] transition-all text-center"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Чекбокс */}
        <label className="flex items-start gap-3 cursor-pointer mb-8 group">
          <input 
            type="checkbox" 
            checked={hasNoEndDate}
            onChange={(e) => setHasNoEndDate(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-[#4038FF] focus:ring-[#4038FF] cursor-pointer"
          />
          <div>
            <div className="text-sm font-medium text-slate-800 mb-1">У мероприятия нет даты окончания</div>
            <div className="text-xs text-gray-500 leading-relaxed">
              Например, если точное время завершения неизвестно при планировании (открытые выставки, арт-инсталляции или неформальные вечеринки).
            </div>
          </div>
        </label>

        {/* Кнопка сохранения */}
        <button 
          onClick={handleSave}
          className="w-full bg-[#4038FF] hover:bg-[#322AC9] text-white font-medium py-3.5 rounded-xl transition-colors shadow-sm"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}