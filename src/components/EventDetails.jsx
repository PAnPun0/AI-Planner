// src/components/dashboard/EventDetails.jsx

export function EventDetails() {
  return (
    <div className="flex-1 overflow-y-auto px-8 pt-6 pb-20 flex gap-8">
      
      {/* ЛЕВАЯ КОЛОНКА: Описание мероприятия */}
      <div className="flex-1 flex flex-col max-w-2xl">
        
        {/* Декоративный заголовок (используем стандартный курсив Tailwind, но если у вас есть кастомный шрифт, можно подключить его) */}
        <h1 className="text-5xl font-bold text-[#FF8A4C] mb-8 font-serif italic tracking-wide">
          Happy birthday
        </h1>

        {/* Блок с Датой и Местом */}
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
              <div className="text-lg font-medium text-slate-800">Вторник, 09. Апрель 12:00</div>
              <div className="text-sm text-gray-500">до 23:00</div>
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
              <div className="text-lg font-medium text-slate-800">Аммосова 14</div>
              <div className="text-sm text-gray-500">город Якутск</div>
            </div>
          </div>
        </div>

        {/* Описание (Текст) */}
        <p className="text-slate-800 leading-relaxed mb-8 text-[15px]">
          Hey there! I'm super excited to celebrate my birthday, and I want you to join me for a day filled with joy, laughter, and unforgettable moments! It's all about good vibes and great company, so come as you are and let's make some amazing memories together. Whether it's sharing stories, enjoying delicious treats, or just hanging out, your presence will make my special day even brighter. So, let's light up the room with our smiles! I can't wait to celebrate with you-let's make it epic!
        </p>

        {/* Организатор */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative">
            {/* Имитация аватарки */}
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden border border-gray-200">
              <img src="https://i.pravatar.cc/150?img=47" alt="Организатор" className="w-full h-full object-cover" />
            </div>
            {/* Желтая галочка/звездочка (организатор) */}
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white text-white text-[10px] font-bold">
              ★
            </div>
          </div>
          <span className="font-medium text-slate-800">Иванова Виктория</span>
        </div>

        {/* Карта */}
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Место проведение</h3>
          <div className="w-full h-48 bg-[#F0F2F5] rounded-2xl overflow-hidden border border-gray-200 relative">
            {/* Моковая картинка карты. В реальности тут будет iframe Яндекс.Карт */}
            <div className="absolute inset-0 opacity-50 bg-[url('https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A94a87a2a7f50a8d56b06ab3f4a362db6623d38c642e05786edb071de6e864831&width=600&height=300&lang=ru_RU')] bg-cover bg-center"></div>
            
            {/* Пин на карте */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md font-medium text-xs text-slate-800">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              улица Аммосова, 14
            </div>
          </div>
        </div>

      </div>

      {/* ПРАВАЯ КОЛОНКА (внутри центральной области): Картинка и Статусы */}
      <div className="w-[340px] shrink-0 flex flex-col gap-6">
        
        {/* Картинка (Постер) */}
        <div className="w-full aspect-[4/3] bg-[#FFF5E6] rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center">
           {/* Моковая картинка котиков с ДР */}
           <img 
             src="https://img.freepik.com/free-vector/hand-drawn-birthday-cats-illustration_23-2148943809.jpg" 
             alt="Happy Birthday Cats" 
             className="w-full h-full object-cover mix-blend-multiply"
           />
        </div>

        {/* Кнопки статуса гостя */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex justify-between items-center px-8">
          <button className="flex flex-col items-center gap-2 group hover:opacity-80 transition-opacity">
            <span className="text-3xl filter group-hover:scale-110 transition-transform">😆</span>
            <span className="text-sm font-medium text-slate-800">Иду</span>
          </button>
          <button className="flex flex-col items-center gap-2 group hover:opacity-80 transition-opacity">
            <span className="text-3xl filter group-hover:scale-110 transition-transform">🤔</span>
            <span className="text-sm font-medium text-slate-800">Возможно</span>
          </button>
          <button className="flex flex-col items-center gap-2 group hover:opacity-80 transition-opacity">
            <span className="text-3xl filter group-hover:scale-110 transition-transform">😢</span>
            <span className="text-sm font-medium text-slate-800">Не иду</span>
          </button>
        </div>

        {/* Кнопка редактирования (прижата к низу) */}
        <div className="mt-auto">
          <button className="w-full bg-[#6544FF] hover:bg-[#5233E8] text-white font-medium py-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
            Редактировать мероприятие
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </div>

      </div>

    </div>
  );
}