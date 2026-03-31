// src/pages/CreateEventPage.jsx
import { useState } from 'react';
import { Header } from '../components/Header';
import { BotMessage, UserMessage } from '../components/Message';
import { ChatInput } from '../components/ChatInput';
import { EventDateModal } from '../components/EventDateModal'; // Импортируем наше окно

export default function CreateEventPage() {
  // Состояние для управления видимостью модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  const[messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Что ты хочешь организовать?',
    },
    {
      id: 2,
      sender: 'user',
      text: "Hey there! I'm super excited to celebrate my birthday, and I want you to join me for a day filled with joy, laughter, and unforgettable moments!",
    },
    {
      id: 3,
      sender: 'bot',
      text: 'На какую дату планируется мероприятие?',
      buttons: ['Выбрать дату', 'Пока неизвестно'],
    }
  ]);

  const handleUserMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
    };
    
    // Добавляем сообщение пользователя в чат
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex flex-col items-center p-4 font-sans relative">
      
      <div className="w-full max-w-4xl flex flex-col flex-1 pb-6 pt-10">
        
        <Header title="Создание мероприятия" progress={40} />
        
        <div className="flex-1 overflow-y-auto flex flex-col w-full mt-4 pb-4 px-2">
          {messages.map((msg) => {
            if (msg.sender === 'bot') {
              return (
                <BotMessage key={msg.id} text={msg.text}>
                  {msg.buttons && msg.buttons.includes('Выбрать дату') && (
                    <>
                      {/* При клике на кнопку открываем модалку */}
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2.5 bg-[#C6DDFB] border border-[#92BFFF] text-[#1028D3] rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Выбрать дату
                      </button>
                      <button 
                        onClick={() => handleUserMessage("Пока неизвестно")}
                        className="px-6 py-2.5 bg-white border border-gray-200 text-slate-800 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
                      >
                        Пока неизвестно
                      </button>
                    </>
                  )}
                </BotMessage>
              );
            }

            if (msg.sender === 'user') {
              return <UserMessage key={msg.id} text={msg.text} className="whitespace-pre-wrap" />;
            }

            return null;
          })}
        </div>

        <ChatInput onSendMessage={handleUserMessage} />
      </div>
      
      {/* Рендерим модальное окно поверх всего */}
      <EventDateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={(dataText) => handleUserMessage(dataText)} 
      />

    </div>
  );
}