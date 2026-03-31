// src/components/Message.jsx

// Сообщение бота
export function BotMessage({ text, children }) {
  return (
    <div className="flex flex-col mb-8 w-full">
      <div className="flex items-center gap-4">
        {/* Круглый аватар ИИ с красной бабочкой */}
        <div className="w-12 h-12 rounded-full bg-[#6544FF] shrink-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9C6.44772 9 6 9.44772 6 10V14C6 14.5523 6.44772 15 7 15C8.5 15 10 13 11 12.5V11.5C10 11 8.5 9 7 9Z" fill="#FF3B30"/>
            <path d="M17 9C17.5523 9 18 9.44772 18 10V14C18 14.5523 17.5523 15 17 15C15.5 15 14 13 13 12.5V11.5C14 11 15.5 9 17 9Z" fill="#FF3B30"/>
            <circle cx="12" cy="12" r="1.5" fill="#FF3B30"/>
          </svg>
        </div>
        <div className="text-slate-900 font-medium text-[15px] leading-relaxed">
          {text}
        </div>
      </div>
      {/* Контейнер для кнопок, выравнивание по правому краю */}
      {children && (
        <div className="mt-4 flex justify-end gap-3 w-full">
          {children}
        </div>
      )}
    </div>
  );
}

// Сообщение пользователя
export function UserMessage({ text }) {
  return (
    <div className="flex mb-8 w-full justify-end pr-4 pl-16">
      {/* Новый дизайн пузыря пользователя: светло-серый фон, без рамок */}
      <div className="bg-[#EEF2F6] text-slate-800 rounded-2xl p-4 text-[15px] leading-relaxed inline-block">
        {text}
      </div>
    </div>
  );
}