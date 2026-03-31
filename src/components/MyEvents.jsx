// src/components/dashboard/MyEvents.jsx

// Моковые данные карточек (размножим для сетки)
const mockEvents = Array(6).fill({
  id: Math.random(),
  title: 'Happybday',
  date: '12.01.26',
  image: 'https://img.freepik.com/free-vector/hand-drawn-birthday-cats-illustration_23-2148943809.jpg'
});

// Моковые данные для календаря (Январь 2026)
const calendarDays = [
  ...Array(1).fill(''), // Пустые дни до 1-го числа
  '01', '02', '03', '04', '05', '06', '07',
  '08', '09', '10', '11', '12', '13', '14',
  '15', '16', '17', '18', '19', '20', '21',
  '22', '23', '24', '25', '26', '27', '28',
  '29', '30', '31', '01', '02', '03', '04' // Хвост февраля
];

export function MyEvents() {
  return (
    <div className="flex-1 flex px-8 pt-8 pb-10 gap-8 h-full">
      
      {/* ЛЕВАЯ КОЛОНКА (Поиск и сетка) */}
      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Ваши мероприятия</h1>
        
        {/* Поиск */}
        <div className="relative w-full max-w-sm mb-8">
          <input 
            type="text" 
            placeholder="Поиск мероприятия" 
            className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1C007C] transition-colors"
          />
          <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Сетка мероприятий (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-4">
          {mockEvents.map((event, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="aspect-[4/3] bg-[#FFF5E6] overflow-hidden flex items-center justify-center border-b border-gray-100">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-[85%] h-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex justify-between items-center bg-white">
                <div className="font-medium text-slate-800 text-[15px]">{event.title}</div>
                <div className="text-sm font-semibold text-[#1C007C]">{event.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ПРАВАЯ КОЛОНКА (Кнопка и Календарь) */}
      <div className="w-[340px] shrink-0 flex flex-col gap-6">
        
        {/* Кнопка Добавить */}
        <button className="w-full bg-[#1C007C] hover:bg-blue-900 text-white font-medium py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-3">
          Добавить мероприятие
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </button>

        {/* Календарь */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6">
          
          {/* Шапка календаря */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-slate-800">Январь 2026</h3>
            <div className="flex gap-4 text-[#1C007C]">
              <button className="hover:opacity-70"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
              <button className="hover:opacity-70"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
          </div>

          {/* Дни недели */}
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
              <div key={day} className="text-xs font-medium text-gray-400">{day}</div>
            ))}
          </div>

          {/* Числа месяца */}
          <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-[13px] font-medium text-slate-700">
            {calendarDays.map((num, i) => {
              // Делаем 02-е число активным (синий кружок)
              const isActive = num === '02' && i === 2; 
              // Делаем числа из других месяцев серыми
              const isOtherMonth = i > 31;

              return (
                <div key={i} className="flex justify-center">
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full ${
                    isActive ? 'bg-[#1C007C] text-white shadow-md' : 
                    isOtherMonth ? 'text-gray-300' : 'hover:bg-gray-100 cursor-pointer'
                  }`}>
                    {num}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}