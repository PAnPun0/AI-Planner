// src/pages/BudgetTab.jsx
import { useState, useEffect, useRef } from 'react';
import { getBudgetItems, addBudgetItem, deleteBudgetItem, updateBudgetSettings } from '../api';

const EVENT_ID = 'demo_event_1';

function AddItemModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !pricePerUnit) return;
    setLoading(true);
    await onAdd({
      name: name.trim(),
      qty: Number(qty),
      pricePerUnit: Number(pricePerUnit),
      totalPrice: Number(totalPrice) || Number(qty) * Number(pricePerUnit),
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-slate-800">Добавить статью</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Напр. Напитки"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]"
              required
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1 block">Кол-во (шт)</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1 block">Цена за шт (₽)</label>
              <input
                type="number"
                min="0"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="200"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Итого (₽) — необязательно</label>
            <input
              type="number"
              min="0"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder={qty && pricePerUnit ? String(Number(qty) * Number(pricePerUnit)) : ''}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#6544FF] hover:bg-[#5233E8] disabled:bg-gray-300 text-white font-medium rounded-lg py-2.5 text-sm transition-colors"
          >
            {loading ? 'Добавляем...' : 'Добавить'}
          </button>
        </form>
      </div>
    </div>
  );
}

function ItemMenu({ itemId, onDelete, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute right-0 top-6 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-36">
      <button
        onClick={() => { onDelete(itemId); onClose(); }}
        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
      >
        Удалить
      </button>
    </div>
  );
}

export function BudgetTab() {
  const [items, setItems] = useState([]);
  const [totalBudget, setTotalBudget] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);

  useEffect(() => {
    getBudgetItems(EVENT_ID).then((data) => {
      setItems(data.items);
      setTotalBudget(data.totalBudget);
      setGuestCount(data.guestCount);
      setLoading(false);
    });
  }, []);

  const handleSettingsBlur = () => {
    if (totalBudget !== '' && guestCount !== '') {
      updateBudgetSettings(EVENT_ID, Number(totalBudget), Number(guestCount));
    }
  };

  const handleAddItem = async (item) => {
    const result = await addBudgetItem(EVENT_ID, item);
    setItems((prev) => [...prev, result.item]);
  };

  const handleDeleteItem = async (itemId) => {
    await deleteBudgetItem(EVENT_ID, itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const spent = items.reduce((sum, i) => sum + i.totalPrice, 0);
  const remaining = Number(totalBudget) - spent;

  if (loading) {
    return <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Загрузка...</div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Summary bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="border border-gray-200 rounded-xl px-4 py-2.5 bg-white">
          <div className="text-[10px] text-slate-400 mb-0.5">Мой бюджет</div>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              onBlur={handleSettingsBlur}
              className="w-24 outline-none text-sm font-semibold text-slate-800 bg-transparent"
            />
            <span className="text-sm font-semibold text-slate-800">₽</span>
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl px-4 py-2.5 bg-white">
          <div className="text-[10px] text-slate-400 mb-0.5">Количество гостей</div>
          <input
            type="number"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            onBlur={handleSettingsBlur}
            className="w-12 outline-none text-sm font-semibold text-slate-800 bg-transparent"
          />
        </div>
        <div className="border border-gray-200 rounded-xl px-4 py-2.5 bg-white ml-auto text-right">
          <div className="text-[10px] text-slate-400 mb-0.5">Остаток</div>
          <div className={`text-sm font-semibold ${remaining < 0 ? 'text-red-500' : 'text-green-600'}`}>
            {remaining.toLocaleString('ru-RU')} ₽
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="ml-2 px-5 py-2.5 bg-[#6544FF] hover:bg-[#5233E8] text-white text-sm font-medium rounded-xl transition-colors"
        >
          Добавить
        </button>
      </div>

      {/* Items list */}
      <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 text-slate-400 text-sm gap-2 py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-6-6h12" />
            </svg>
            Нет статей бюджета. Нажмите «Добавить».
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="relative bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4">
            <span className="flex-1 text-sm font-medium text-slate-800">{item.name}</span>
            <div className="border border-gray-200 rounded-lg px-3 py-1.5 text-center min-w-[80px]">
              <div className="text-[10px] text-slate-400">{item.qty} шт</div>
              <div className="text-sm font-semibold text-slate-800">{item.pricePerUnit.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="border border-gray-200 rounded-lg px-3 py-1.5 text-center min-w-[100px]">
              <div className="text-[10px] text-slate-400">Всего</div>
              <div className="text-sm font-semibold text-slate-800">{item.totalPrice.toLocaleString('ru-RU')} ₽</div>
            </div>
            <button
              onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>
            {menuOpenId === item.id && (
              <ItemMenu itemId={item.id} onDelete={handleDeleteItem} onClose={() => setMenuOpenId(null)} />
            )}
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddItemModal onClose={() => setShowAddModal(false)} onAdd={handleAddItem} />
      )}
    </div>
  );
}
