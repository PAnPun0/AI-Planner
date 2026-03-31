// src/pages/EventPage.jsx
import { useState } from 'react';
import { BudgetTab } from './BudgetTab';
import { BotMessage, UserMessage } from '../components/Message';
import { ChatInput } from '../components/ChatInput';
import { sendMessageToBot } from '../api';

const TABS = [
  {
    id: 'event',
    label: 'Мероприятие',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'tasks',
    label: 'Задачи',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'invite',
    label: 'Приглашение',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'guests',
    label: 'Гости',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'budget',
    label: 'Бюджет',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    id: 'chat',
    label: 'Чат',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

function PlaceholderTab({ label }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <span className="text-sm">Раздел «{label}» в разработке</span>
    </div>
  );
}

export default function EventPage() {
  const [activeTab, setActiveTab] = useState('budget');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Чем могу помочь?', buttons: ['Составь примерный бюджет для мероприятия'] },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleChatMessage = (text) => {
    setChatMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text }]);
    setChatLoading(true);
    sendMessageToBot(text, chatMessages)
      .then((response) => {
        setChatMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'bot', text: response.text, buttons: response.buttons },
        ]);
      })
      .finally(() => setChatLoading(false));
  };

  return (
    <div className="flex h-screen bg-[#F7F8FA] overflow-hidden">
      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Tab navigation */}
        <div className="bg-white border-b border-gray-100 px-6 pt-4">
          <nav className="flex gap-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EEE9FF] text-[#6544FF] border border-[#D4C8FF] border-b-white'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden flex flex-col p-6">
          {activeTab === 'budget' && <BudgetTab />}
          {activeTab !== 'budget' && (
            <PlaceholderTab label={TABS.find((t) => t.id === activeTab)?.label} />
          )}
        </div>
      </div>

      {/* Chat panel */}
      <div className="w-[300px] flex flex-col bg-white border-l border-gray-100 shrink-0">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="font-semibold text-slate-800 text-base">Чат-бот</span>
          <div className="flex items-center gap-1 bg-gradient-to-r from-[#1BB954] to-[#21C05A] rounded-lg px-2 py-1">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="8" />
            </svg>
            <span className="text-white text-[10px] font-bold tracking-wide">AI</span>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3">
          {chatMessages.map((msg) => {
            if (msg.sender === 'bot') {
              return (
                <div key={msg.id} className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#6544FF] shrink-0 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 9C6.44772 9 6 9.44772 6 10V14C6 14.5523 6.44772 15 7 15C8.5 15 10 13 11 12.5V11.5C10 11 8.5 9 7 9Z" fill="#FF3B30"/>
                        <path d="M17 9C17.5523 9 18 9.44772 18 10V14C18 14.5523 17.5523 15 17 15C15.5 15 14 13 13 12.5V11.5C14 11 15.5 9 17 9Z" fill="#FF3B30"/>
                        <circle cx="12" cy="12" r="1.5" fill="#FF3B30"/>
                      </svg>
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-slate-700 max-w-[200px]">
                      {msg.text}
                    </div>
                  </div>
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2 pl-10">
                      {msg.buttons.map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => handleChatMessage(btn)}
                          className="bg-[#EEE9FF] text-[#6544FF] text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-[#DDD5FF] transition-colors"
                        >
                          {btn}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="bg-[#EEF2F6] rounded-2xl rounded-tr-sm px-3 py-2 text-sm text-slate-700 max-w-[200px]">
                  {msg.text}
                </div>
              </div>
            );
          })}
          {chatLoading && (
            <div className="flex items-center gap-2 pl-10">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Chat input */}
        <div className="px-3 pb-3 border-t border-gray-100 pt-3">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
            <input
              type="text"
              placeholder="Напишите сообщение"
              disabled={chatLoading}
              className="flex-1 bg-transparent outline-none px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() && !chatLoading) {
                  handleChatMessage(e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
            <button
              disabled={chatLoading}
              className="bg-[#6544FF] hover:bg-[#5233E8] disabled:bg-gray-300 w-8 h-8 flex items-center justify-center rounded-lg text-white shrink-0 transition-colors"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling;
                if (input.value.trim() && !chatLoading) {
                  handleChatMessage(input.value.trim());
                  input.value = '';
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
