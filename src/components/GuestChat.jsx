// src/components/dashboard/GuestChat.jsx
import { useState } from 'react';

// Моковые данные чата гостей
const initialMessages = [
  { 
    id: 1, 
    sender: 'friend1', 
    name: 'Алексей', 
    avatar: 'https://i.pravatar.cc/150?img=11', 
    text: 'Давайте мы ему подарим комп, как идея?' 
  },
  { 
    id: 2, 
    sender: 'me', 
    text: 'Да, отличная идея!' 
  },
  { 
    id: 3, 
    sender: 'friend2', 
    name: 'Иван', 
    avatar: 'https://i.pravatar.cc/150?img=68', 
    text: 'Я подарю мышку' 
  }
];

export function GuestChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'me', text: inputValue }]);
      setInputValue('');
    }
  };

  return (
    <div className="flex-1 flex flex-col px-8 pb-8">
      
      {/* Главный контейнер чата (светло-серый фон) */}
      <div className="flex-1 bg-[#F4F5F8] rounded-2xl flex flex-col p-6 relative shadow-sm border border-gray-100">
        
        {/* Плашка с датой */}
        <div className="flex justify-center mb-8 shrink-0">
          <div className="bg-[#E4DFFF] text-[#5A5A5A] text-xs font-medium px-6 py-2 rounded-full shadow-sm">
            30 мая 2026 г.
          </div>
        </div>

        {/* Область с сообщениями */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-6">
          {messages.map((msg) => {
            
            // Если отправил НЕ текущий пользователь (сообщение слева)
            if (msg.sender !== 'me') {
              return (
                <div key={msg.id} className="flex items-center gap-3">
                  <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                  <div className="text-[14px] text-slate-800 font-medium">
                    {msg.text}
                  </div>
                </div>
              );
            }

            // Если отправил текущий пользователь (сообщение справа в плашке)
            if (msg.sender === 'me') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-[#EBEBEB] text-slate-800 text-[14px] font-medium px-5 py-3 rounded-2xl rounded-tr-sm">
                    {msg.text}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Поле ввода внизу */}
        <div className="mt-4 shrink-0 bg-white rounded-xl flex items-center px-2 py-1.5 shadow-sm border border-gray-100 focus-within:border-[#6544FF] focus-within:ring-1 focus-within:ring-[#6544FF] transition-all">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Напишите сообщение" 
            className="flex-1 bg-transparent border-none outline-none text-[13px] px-3 placeholder-gray-400"
          />
          
          {/* Скрепка */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          {/* Кнопка отправки */}
          <button 
            onClick={handleSend}
            className="w-8 h-8 bg-[#6544FF] hover:bg-[#5233E8] rounded-lg flex items-center justify-center transition-colors ml-1 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}