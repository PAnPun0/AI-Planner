// src/components/dashboard/Budget.jsx
import { useState } from 'react';

// Стартовые моковые данные из макета
const initialBudgetItems = [
  { id: 1, name: 'Напитки', pricePerUnit: 200, total: 2000 },
  { id: 2, name: 'Напитки', pricePerUnit: 200, total: 2000 },
  { id: 3, name: 'Напитки', pricePerUnit: 200, total: 2000 },
  { id: 4, name: 'Напитки', pricePerUnit: 200, total: 2000 },
];

export function Budget() {
  const [items, setItems] = useState(initialBudgetItems);
  const [totalBudget, setTotalBudget] = useState('20000');
  const [guestsCount, setGuestsCount] = useState('12');

  // Функция для имитации добавления новой строки бюджета
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: 'Новая статья',
      pricePerUnit: 0,
      total: 0
    };
    setItems([newItem, ...items]);
  };

  return (
    <div className="flex-1 flex flex-col px-8 pt-6 pb-10 overflow-y-auto">
      
      {/* --- ВЕРХНЯЯ ПАНЕЛЬ (Общий бюджет и кнопка) --- */}
      <div className="flex justify-between items-start mb-8">
        
        {/* Контейнер с инпутами */}
        <div className="border border-gray-200 rounded-xl p-2 flex gap-3 bg-white shadow-sm">
          
          {/* Инпут: Мой бюджет */}
          <div className="border border-gray-200 rounded-lg px-3 py-1.5 w-[140px] focus-within:border-[#6544FF] focus-within:ring-1 focus-within:ring-[#6544FF] transition-all">
            <label className="text-[11px] text-gray-500 block mb-0.5">Мой бюджет</label>
            <div className="flex items-center text-lg font-medium text-slate-800">
              <input 
                type="text" 
                value={totalBudget} 
                onChange={(e) => setTotalBudget(e.target.value)}
                className="w-full bg-transparent outline-none p-0"
              />
              <span className="ml-1">₽</span>
            </div>
          </div>

          {/* Инпут: Количество гостей */}
          <div className="border border-gray-200 rounded-lg px-3 py-1.5 w-[140px] focus-within:border-[#6544FF] focus-within:ring-1 focus-within:ring-[#6544FF] transition-all">
            <label className="text-[11px] text-gray-500 block mb-0.5">Количество гостей</label>
            <input 
              type="text" 
              value={guestsCount} 
              onChange={(e) => setGuestsCount(e.target.value)}
              className="w-full bg-transparent outline-none p-0 text-lg font-medium text-slate-800"
            />
          </div>

        </div>

        {/* Кнопка Добавить */}
        <button 
          onClick={handleAddItem}
          className="bg-[#6544FF] hover:bg-[#5233E8] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm mt-2"
        >
          Добавить
        </button>

      </div>

      {/* --- СПИСОК РАСХОДОВ --- */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Название статьи (слева) */}
            <div className="text-[15px] font-medium text-slate-800 pl-2">
              {item.name}
            </div>

            {/* Блоки с ценами и меню (справа) */}
            <div className="flex items-center gap-4">
              
              {/* Цена за 1 шт */}
              <div className="border border-gray-200 rounded-lg px-3 py-1.5 w-[120px] bg-white">
                <div className="text-[11px] text-gray-500">1 шт</div>
                <div className="text-lg font-medium text-slate-800">
                  {item.pricePerUnit} ₽
                </div>
              </div>

              {/* Всего */}
              <div className="border border-gray-200 rounded-lg px-3 py-1.5 w-[120px] bg-white">
                <div className="text-[11px] text-gray-500">Всего</div>
                <div className="text-lg font-medium text-slate-800">
                  {item.total} ₽
                </div>
              </div>

              {/* Кнопка троеточия (Опции) */}
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 text-[#6544FF] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" />
                </svg>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}