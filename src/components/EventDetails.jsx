// src/components/EventDetails.jsx

const EVENT_TYPE_LABEL = {
  birthday: 'День рождения',
  wedding: 'Свадьба',
  corporate: 'Корпоратив',
  party: 'Вечеринка',
};

function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit',
  });
}

export function EventDetails({ event }) {
  const title = event?.title ?? 'Happy birthday';
  const description = event?.description ?? 'Описание мероприятия не указано.';
  const dateStr = formatDateTime(event?.date);
  const location = event?.location ?? 'Место не указано';
  const address = event?.address ?? '';
  const organizer = localStorage.getItem('full_name') ?? 'Организатор';

  return (
    <div className="flex-1 overflow-y-auto px-8 pt-6 pb-20 flex gap-8">

      {/* ЛЕВАЯ КОЛОНКА */}
      <div className="flex-1 flex flex-col max-w-2xl">
        <h1 className="text-5xl font-bold text-[#FF8A4C] mb-8 font-serif italic tracking-wide">
          {title}
        </h1>

        <div className="flex flex-col gap-5 mb-8">
          {/* Дата */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl border-2 border-[#8172F4] flex items-center justify-center shrink-0 text-[#8172F4] bg-white shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <circle cx="12" cy="15" r="1.5" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-medium text-slate-800 capitalize">{dateStr}</div>
              {event?.event_type && (
                <div className="text-sm text-gray-500">
                  {EVENT_TYPE_LABEL[event.event_type] ?? event.event_type}
                </div>
              )}
            </div>
          </div>

          {/* Место */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl border-2 border-[#8172F4] flex items-center justify-center shrink-0 text-[#8172F4] bg-white shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-medium text-slate-800">{location}</div>
              {address && <div className="text-sm text-gray-500">{address}</div>}
            </div>
          </div>

          {/* Бюджет */}
          {event?.budget > 0 && (
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl border-2 border-[#8172F4] flex items-center justify-center shrink-0 text-[#8172F4] bg-white shadow-sm text-lg font-bold">
                ₽
              </div>
              <div>
                <div className="text-lg font-medium text-slate-800">
                  {event.budget.toLocaleString('ru-RU')} ₽
                </div>
                {event.current_spent > 0 && (
                  <div className="text-sm text-gray-500">
                    Потрачено: {event.current_spent.toLocaleString('ru-RU')} ₽
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <p className="text-slate-800 leading-relaxed mb-8 text-[15px]">{description}</p>

        {/* Организатор */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden border border-gray-200 flex items-center justify-center text-white font-bold text-lg bg-[#6544FF]">
              {organizer.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white text-white text-[10px] font-bold">
              ★
            </div>
          </div>
          <span className="font-medium text-slate-800">{organizer}</span>
        </div>

        {/* Карта */}
        {address && (
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">Место проведения</h3>
            <div className="w-full h-48 bg-[#F0F2F5] rounded-2xl overflow-hidden border border-gray-200 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md font-medium text-xs text-slate-800">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                {address}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ПРАВАЯ КОЛОНКА */}
      <div className="w-[340px] shrink-0 flex flex-col gap-6">

        {/* Постер / заглушка */}
        <div className="w-full aspect-[4/3] bg-[#FFF5E6] rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center">
          <div className="text-6xl select-none">🎉</div>
        </div>

        {/* Статус мероприятия */}
        {event?.status && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4">
            <div className="text-xs text-gray-400 uppercase mb-1">Статус</div>
            <div className="text-sm font-medium text-slate-800 capitalize">{event.status}</div>
            {event.max_guests && (
              <div className="text-xs text-gray-400 mt-2">Макс. гостей: {event.max_guests}</div>
            )}
          </div>
        )}

        {/* Кнопка редактирования */}
        <div className="mt-auto">
          <button className="w-full bg-[#6544FF] hover:bg-[#5233E8] text-white font-medium py-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
            Редактировать мероприятие
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
