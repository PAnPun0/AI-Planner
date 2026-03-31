import { useState, useEffect, useRef } from 'react';
import CoolBoxImage from '../assets/крутойбокс.png';
import { sendChatMessage } from '../api';

export function AIPanel({ userId, eventId }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Чем могу помочь?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text }]);
    setInputValue('');
    setLoading(true);

    try {
      const data = await sendChatMessage(userId, eventId, text);
      const botText = data.message || 'Нет ответа';
      const actions = data.suggested_actions ?? [];

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: botText, actions },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Ошибка связи с агентом. Попробуйте позже.',
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[340px] h-[calc(100vh-48px)] my-6 mr-6 bg-white flex flex-col shrink-0 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl relative overflow-hidden z-10 border border-gray-100">

      {/* Header с картинкой */}
      <div className="sticky top-0 z-20 w-full shrink-0">
        <img src={CoolBoxImage} alt="AI Agent" className="w-full h-auto rounded-t-3xl" />
      </div>

      {/* Зона сообщений */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
        {messages.map((msg) =>
          msg.sender === 'bot' ? (
            <div key={msg.id} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-[#6544FF] shrink-0 flex items-center justify-center mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M7 9C6.44772 9 6 9.44772 6 10V14C6 14.5523 6.44772 15 7 15C8.5 15 10 13 11 12.5V11.5C10 11 8.5 9 7 9Z" fill="#FF3B30" />
                  <path d="M17 9C17.5523 9 18 9.44772 18 10V14C18 14.5523 17.5523 15 17 15C15.5 15 14 13 13 12.5V11.5C14 11 15.5 9 17 9Z" fill="#FF3B30" />
                  <circle cx="12" cy="12" r="2" fill="#FF3B30" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <div className={`text-[14px] leading-relaxed font-medium ${msg.isError ? 'text-red-500' : 'text-slate-800'}`}>
                  {msg.text}
                </div>
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {msg.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => { setInputValue(action); }}
                        className="text-xs px-3 py-1.5 bg-[#F0EEFF] text-[#6544FF] rounded-lg hover:bg-[#E4DFFF] transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end pl-10">
              <div className="bg-[#F3F4F6] text-slate-800 text-[13px] px-4 py-3 rounded-2xl rounded-tr-sm">
                {msg.text}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-[#6544FF] shrink-0 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="2" fill="#FF3B30" />
              </svg>
            </div>
            <div className="text-[14px] text-slate-400 animate-pulse">Агент думает...</div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Поле ввода */}
      <div className="p-4 bg-white shrink-0 mb-2">
        <div className="w-full flex items-center bg-white border border-gray-200 rounded-xl px-2 py-1.5 focus-within:border-[#6544FF] transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
            placeholder={loading ? 'Ожидайте...' : 'Напишите сообщение'}
            className="flex-1 bg-transparent border-none outline-none text-[13px] px-2 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !inputValue.trim()}
            className="w-8 h-8 bg-[#6544FF] hover:bg-[#5233E8] disabled:bg-gray-300 rounded-lg flex items-center justify-center ml-1 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
