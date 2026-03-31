// src/components/ChatInput.jsx
import { useState } from 'react';

export function ChatInput({ onSendMessage, isLoading = false }) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue(''); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) handleSend();
  };

  return (
    <div className="w-full mt-auto pt-6 pb-2">
      <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm focus-within:border-[#6544FF] transition-colors">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Ждите ответа..." : "Напишите"} 
          disabled={isLoading}
          className="flex-1 bg-transparent outline-none px-4 py-2 text-slate-700 placeholder-slate-400 disabled:opacity-50"
        />
        {/* Кнопка отправки обновлена под дизайн */}
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-[#6544FF] hover:bg-[#5233E8] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors w-10 h-10 flex items-center justify-center rounded-lg text-white shrink-0"
        >
          {/* Иконка стрелки вправо */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}