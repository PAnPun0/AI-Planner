// src/components/ChatInput.jsx
import { useState } from 'react';

export function ChatInput({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  // Функция отправки
  const handleSend = () => {
    // Проверяем, чтобы не отправлять пустые сообщения (убираем пробелы по краям)
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue(''); // Очищаем поле после отправки
    }
  };

  // Обработка нажатия клавиши Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="w-full mt-auto pt-6 pb-2">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1 shadow-sm focus-within:border-[#1028D3] transition-colors">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите" 
          className="flex-1 bg-transparent outline-none px-4 py-2 text-slate-800 placeholder-slate-400"
        />
        <button 
          onClick={handleSend}
          className="bg-[#1028D3] hover:bg-blue-800 transition-colors w-10 h-10 flex items-center justify-center rounded-md text-white shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}