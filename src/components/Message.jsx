// src/components/BotMessage.jsx
export function BotMessage({ text, children }) {
  return (
    <div className="flex flex-col mb-8 w-full">
      <div className="flex items-center gap-4">
        {/* Квадратный аватар ИИ */}
        <div className="w-12 h-12 bg-[#6544FF] shrink-0"></div>
        <div className="text-slate-900 font-medium text-lg">
          {text}
        </div>
      </div>
      {/* Контейнер для кнопок (действий), если они переданы */}
      {children && (
        <div className="mt-4 flex justify-end gap-4 w-full">
          {children}
        </div>
      )}
    </div>
  );
}

// src/components/UserMessage.jsx
export function UserMessage({ text }) {
  return (
    <div className="flex mb-8 w-full justify-center">
      {/* Пузырь сообщения пользователя */}
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-slate-800 text-base leading-relaxed">
        {text}
      </div>
    </div>
  );
}