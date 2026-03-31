import { useState } from 'react';

const initialGuests = [
  { id: 1, lastName: 'Фамилия', firstName: 'Имя', status: 'Идет', plusOne: '+1', type: 'Тип гостя', email: 'valefimova8@gmail.com' },
];

export function GuestList() {
  const [guests, setGuests] = useState(initialGuests);
  const [isAdding, setIsAdding] = useState(false); // Состояние модалки добавления

  // Состояния для формы нового гостя
  const [newGuest, setNewGuest] = useState({ lastName: '', firstName: '', email: '' });

  // Функция добавления в таблицу
  const handleAddGuest = (e) => {
    e.preventDefault();
    if (!newGuest.lastName || !newGuest.firstName) return;
    
    setGuests([...guests, { 
      id: Date.now(), 
      ...newGuest, 
      status: 'Неизвестно', 
      plusOne: '-', 
      type: 'Стандарт' 
    }]);
    
    setNewGuest({ lastName: '', firstName: '', email: '' }); // Очищаем форму
    setIsAdding(false); // Закрываем форму
  };

  return (
    <div className="flex-1 flex flex-col px-8 pt-6 pb-10 overflow-y-auto">
      
      {/* Панель управления (Фильтры и кнопка) */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">Все</button>
          
          <div className="relative">
            <select className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none cursor-pointer">
              <option>Статус</option>
              <option>Идет</option>
              <option>Не идет</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6544FF]">▼</div>
          </div>

          <div className="relative">
            <select className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none cursor-pointer">
              <option>Тип гостя</option>
              <option>VIP</option>
              <option>Стандарт</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6544FF]">▼</div>
          </div>
        </div>

        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#6544FF] hover:bg-[#5233E8] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Добавить гостя
        </button>
      </div>

      {/* Мини-форма добавления гостя (появляется при нажатии на кнопку) */}
      {isAdding && (
        <form onSubmit={handleAddGuest} className="bg-white border border-[#6544FF] rounded-2xl p-4 mb-6 shadow-sm flex gap-4 items-end animate-fade-in">
          <div className="flex-1"><label className="text-xs text-gray-500 mb-1 block">Фамилия</label><input required value={newGuest.lastName} onChange={e=>setNewGuest({...newGuest, lastName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]" /></div>
          <div className="flex-1"><label className="text-xs text-gray-500 mb-1 block">Имя</label><input required value={newGuest.firstName} onChange={e=>setNewGuest({...newGuest, firstName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]" /></div>
          <div className="flex-1"><label className="text-xs text-gray-500 mb-1 block">E-mail</label><input type="email" value={newGuest.email} onChange={e=>setNewGuest({...newGuest, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]" /></div>
          <button type="submit" className="bg-[#6544FF] text-white px-6 py-2 rounded-lg text-sm font-medium h-[38px]">Сохранить</button>
          <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium h-[38px]">Отмена</button>
        </form>
      )}

      {/* Таблица */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Шапка таблицы */}
        <div className="grid grid-cols-[1fr_1fr_120px_60px_1fr_1.5fr_40px] gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-200 text-xs font-medium text-gray-400">
          <div>Фамилия</div><div>Имя</div><div>Статус</div><div>+1</div><div>Тип гостя</div><div>E-mail</div><div></div>
        </div>

        {/* Тело таблицы */}
        <div className="flex flex-col">
          {guests.map((guest) => (
            <div key={guest.id} className="grid grid-cols-[1fr_1fr_120px_60px_1fr_1.5fr_40px] gap-4 px-6 py-4 items-center border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              <div className="text-sm text-slate-800">{guest.lastName}</div>
              <div className="text-sm text-slate-800">{guest.firstName}</div>
              
              {/* Статус селект (как в макете синяя стрелочка) */}
              <div className="relative flex items-center">
                <select className="text-sm text-slate-800 bg-transparent outline-none cursor-pointer appearance-none pr-6">
                  <option selected={guest.status === 'Идет'}>Идет</option>
                  <option selected={guest.status === 'Не идет'}>Не идет</option>
                  <option selected={guest.status === 'Возможно'}>Возможно</option>
                  <option selected={guest.status === 'Неизвестно'}>Неизвестно</option>
                </select>
                <div className="absolute right-0 pointer-events-none text-[#6544FF] text-xs">▼</div>
              </div>

              <div className="text-sm text-slate-800">{guest.plusOne}</div>
              <div className="text-sm text-slate-800">{guest.type}</div>
              <div className="text-sm text-slate-800 truncate">{guest.email}</div>
              
              {/* Кнопка троеточия */}
              <button className="text-[#6544FF] hover:bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center font-bold pb-2">
                ...
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}