import { useState, useEffect } from 'react';
import { getGuests, inviteGuest, updateGuestStatus, removeGuest } from '../api';

// EventGuest.status → русский лейбл
const STATUS_LABEL = {
  invited: 'Неизвестно',
  confirmed: 'Идет',
  declined: 'Не идет',
  maybe: 'Возможно',
};

// Русский лейбл → EventGuest.status
const STATUS_API = {
  'Неизвестно': 'invited',
  'Идет': 'confirmed',
  'Не идет': 'declined',
  'Возможно': 'maybe',
};

export function GuestList({ eventId }) {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newGuest, setNewGuest] = useState({ full_name: '', phone: '', role: 'guest' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    getGuests(eventId)
      .then((data) => setGuests(Array.isArray(data) ? data : []))
      .catch(() => setGuests([]))
      .finally(() => setLoading(false));
  }, [eventId]);

  const handleAddGuest = async (e) => {
    e.preventDefault();
    if (!newGuest.full_name || !newGuest.phone) return;
    setSaving(true);
    try {
      const created = await inviteGuest(eventId, newGuest);
      setGuests((prev) => [...prev, created]);
      setNewGuest({ full_name: '', phone: '', role: 'guest' });
      setIsAdding(false);
    } catch (err) {
      alert(err.message || 'Ошибка при добавлении гостя');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (userId, labelRu) => {
    const status = STATUS_API[labelRu];
    try {
      const updated = await updateGuestStatus(eventId, userId, { status });
      setGuests((prev) =>
        prev.map((g) => (g.user_id === userId ? { ...g, status: updated.status } : g))
      );
    } catch (err) {
      alert(err.message || 'Ошибка обновления статуса');
    }
  };

  const handleRemove = async (userId) => {
    try {
      await removeGuest(eventId, userId);
      setGuests((prev) => prev.filter((g) => g.user_id !== userId));
    } catch (err) {
      alert(err.message || 'Ошибка удаления гостя');
    }
  };

  return (
    <div className="flex-1 flex flex-col px-8 pt-6 pb-10 overflow-y-auto">

      {/* Панель управления */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
            Все ({guests.length})
          </button>
          <div className="relative">
            <select className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none cursor-pointer">
              <option>Статус</option>
              <option>Идет</option>
              <option>Не идет</option>
              <option>Возможно</option>
              <option>Неизвестно</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6544FF]">▼</div>
          </div>
          <div className="relative">
            <select className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none cursor-pointer">
              <option>Роль</option>
              <option>guest</option>
              <option>helper</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6544FF]">▼</div>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          disabled={!eventId}
          className="bg-[#6544FF] hover:bg-[#5233E8] disabled:bg-gray-300 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Добавить гостя
        </button>
      </div>

      {/* Форма добавления */}
      {isAdding && (
        <form onSubmit={handleAddGuest} className="bg-white border border-[#6544FF] rounded-2xl p-4 mb-6 shadow-sm flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Имя и фамилия</label>
            <input
              required
              value={newGuest.full_name}
              onChange={(e) => setNewGuest({ ...newGuest, full_name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Телефон</label>
            <input
              required
              type="tel"
              value={newGuest.phone}
              onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
              placeholder="+79991234567"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF]"
            />
          </div>
          <div className="w-32">
            <label className="text-xs text-gray-500 mb-1 block">Роль</label>
            <div className="relative">
              <select
                value={newGuest.role}
                onChange={(e) => setNewGuest({ ...newGuest, role: e.target.value })}
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6544FF] pr-7"
              >
                <option value="guest">Гость</option>
                <option value="helper">Помощник</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#6544FF] text-xs">▼</div>
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#6544FF] disabled:bg-gray-400 text-white px-6 py-2 rounded-lg text-sm font-medium h-[38px]"
          >
            {saving ? '...' : 'Сохранить'}
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium h-[38px]"
          >
            Отмена
          </button>
        </form>
      )}

      {/* Таблица */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Шапка — поля EventGuest + User */}
        <div className="grid grid-cols-[1fr_160px_130px_100px_160px_40px] gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-200 text-xs font-medium text-gray-400 uppercase">
          <div>ФИО</div>
          <div>Телефон</div>
          <div>Статус</div>
          <div>Роль</div>
          <div>Приглашён</div>
          <div />
        </div>
        <div className="flex flex-col">
          {loading ? (
            <div className="py-10 text-center text-gray-400 text-sm">Загрузка...</div>
          ) : guests.length === 0 ? (
            <div className="py-10 text-center text-gray-400 text-sm">Гостей пока нет</div>
          ) : (
            guests.map((guest) => (
              <div
                key={guest.user_id}
                className="grid grid-cols-[1fr_160px_130px_100px_160px_40px] gap-4 px-6 py-4 items-center border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm text-slate-800 font-medium">{guest.full_name}</div>
                <div className="text-sm text-slate-500">{guest.phone}</div>

                {/* Статус — обновляет через API */}
                <div className="relative flex items-center">
                  <select
                    value={STATUS_LABEL[guest.status] ?? 'Неизвестно'}
                    onChange={(e) => handleStatusChange(guest.user_id, e.target.value)}
                    className="text-sm text-slate-800 bg-transparent outline-none cursor-pointer appearance-none pr-6"
                  >
                    <option>Идет</option>
                    <option>Не идет</option>
                    <option>Возможно</option>
                    <option>Неизвестно</option>
                  </select>
                  <div className="absolute right-0 pointer-events-none text-[#6544FF] text-xs">▼</div>
                </div>

                <div className="text-sm text-slate-500">
                  {guest.role === 'helper' ? 'Помощник' : 'Гость'}
                </div>

                <div className="text-xs text-gray-400">
                  {guest.invited_at
                    ? new Date(guest.invited_at).toLocaleDateString('ru-RU')
                    : '—'}
                </div>

                <button
                  onClick={() => handleRemove(guest.user_id)}
                  className="text-gray-300 hover:text-red-400 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  title="Удалить"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
