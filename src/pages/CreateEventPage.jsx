// src/pages/CreateEventPage.jsx
import { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { BotMessage, UserMessage } from '../components/Message';
import { ChatInput } from '../components/ChatInput';
import { EventDateModal } from '../components/EventDateModal';
import CreateEventBG from '../assets/CreateEventBG.png';

export default function CreateEventPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Обновил начальный массив сообщений, чтобы он в точности повторял твой скриншот
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Что ты хочешь организовать?' },
    { id: 2, sender: 'user', text: "Hey there! I'm super excited to celebrate my birthday, and I want you to join me for a day filled with joy, laughter, and unforgettable moments!" },
    { id: 3, sender: 'bot', text: 'На какую дату планируется мероприятие?', buttons:['Выбрать дату', 'Пока неизвестно'] },
    { id: 4, sender: 'bot', text: 'Хорошо, мероприятие запланировано на 24 января 2026 года. Кого вы хотите пригласить?', buttons: ['Выбрать тип гостей'] }
  ]);

  // Вычисляем прогресс на основе количества шагов/сообщений
  // Предположим, что полный опрос занимает около 8 сообщений (100%)
  const currentProgress = Math.min(100, (messages.length / 8) * 100);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserMessage = (text) => {
    const userMsg = { id: Date.now(), sender: 'user', text: text };
    setMessages((prev) =>[...prev, userMsg]);
    
    // Здесь в будущем будет вызов твоего API (бэкенда)
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 font-sans relative" style={{ backgroundImage: `url(${CreateEventBG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Правая часть с контентом */}
      <div className="w-full max-w-4xl flex flex-col flex-1 pb-4 pt-6">
        
        {/* Передаем вычисленный прогресс в шапку */}
        <Header title="Создание мероприятия" progress={currentProgress} />
        
        <div className="flex-1 overflow-y-auto flex flex-col w-full mt-4 pb-4 px-2">
          {messages.map((msg) => {
            if (msg.sender === 'bot') {
              return (
                <BotMessage key={msg.id} text={msg.text}>
                  {msg.buttons && msg.buttons.map((btnName, index) => {
                    
                    // Стилизация для главной кнопки
                    if (btnName === 'Выбрать дату') {
                      return (
                        <button key={index} onClick={() => setIsModalOpen(true)} className="px-6 py-2.5 bg-[#C6DDFB] border border-[#92BFFF] text-[#1028D3] rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                          {btnName}
                        </button>
                      );
                    }
                    
                    // Стилизация для второстепенных кнопок из нового дизайна
                    return (
                      <button key={index} onClick={() => handleUserMessage(btnName)} className="px-6 py-2.5 bg-[#E4EFFF] text-slate-800 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        {btnName}
                      </button>
                    );
                  })}
                </BotMessage>
              );
            }

            if (msg.sender === 'user') {
              return <UserMessage key={msg.id} text={msg.text} />;
            }

            return null;
          })}
          
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleUserMessage} />
      </div>
      
      <EventDateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={(dataText) => handleUserMessage(dataText)} 
      />

    </div>
  );
}