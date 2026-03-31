import { useState } from 'react';
import CoolBoxImage from '../assets/крутойбокс.png';

export function AIPanel() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Чем могу помочь?' },
    { id: 2, sender: 'user', text: 'Составь примерный бюджет для мероприятия' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'user', text: inputValue }]);
      setInputValue('');
    }
  };

  return (
    
    <div className="w-[340px] h-[calc(100vh-48px)] my-6 mr-6 bg-white flex flex-col shrink-0 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl relative overflow-hidden z-10 border border-gray-100">
      
      {/* Sticky Header с картинкой */}
      <div className="sticky top-0 z-20 w-full shrink-0">
        <img src={CoolBoxImage} alt="Cool Box" className="w-full h-auto rounded-t-3xl" />
      </div>
      

      {/* Зона сообщений */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
        {messages.map((msg) => (
          msg.sender === 'bot' ? (
            <div key={msg.id} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-[#6544FF] shrink-0 flex items-center justify-center mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 9C6.44772 9 6 9.44772 6 10V14C6 14.5523 6.44772 15 7 15C8.5 15 10 13 11 12.5V11.5C10 11 8.5 9 7 9Z" fill="#FF3B30"/><path d="M17 9C17.5523 9 18 9.44772 18 10V14C18 14.5523 17.5523 15 17 15C15.5 15 14 13 13 12.5V11.5C14 11 15.5 9 17 9Z" fill="#FF3B30"/><circle cx="12" cy="12" r="2" fill="#FF3B30"/></svg>
              </div>
              <div className="text-[14px] text-slate-800 leading-relaxed font-medium">{msg.text}</div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end pl-10">
              <div className="bg-[#F3F4F6] text-slate-800 text-[13px] px-4 py-3 rounded-2xl rounded-tr-sm">{msg.text}</div>
            </div>
          )
        ))}
      </div>

      {/* Поле ввода */}
      <div className="p-4 bg-white shrink-0 mb-2">
        <div className="w-full flex items-center bg-white border border-gray-200 rounded-xl px-2 py-1.5 focus-within:border-[#6544FF] transition-all">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Напишите сообщение" 
            className="flex-1 bg-transparent border-none outline-none text-[13px] px-2"
          />
          <button className="p-2 text-gray-400 hover:text-gray-600"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg></button>
          <button onClick={handleSend} className="w-8 h-8 bg-[#6544FF] hover:bg-[#5233E8] rounded-lg flex items-center justify-center ml-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
        </div>
      </div>
    </div>
  );
}