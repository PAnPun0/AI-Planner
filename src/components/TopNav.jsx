// src/components/dashboard/TopNav.jsx
export function TopNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'event', icon: '📅', label: 'Мероприятие' },
    { id: 'tasks', icon: '💼', label: 'Задачи' },
    { id: 'invitations', icon: '📄', label: 'Приглашение' },
    { id: 'guests', icon: '👥', label: 'Гости' },
    { id: 'budget', icon: '💰', label: 'Бюджет' },
    { id: 'chat', icon: '💬', label: 'Чат' }, // Добавили Чат
  ];

  return (
    <div className="w-full bg-[#F5F5F5] rounded-xl flex items-center p-1.5 justify-between">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === tab.id 
              ? 'bg-[#DCE1FF] text-[#4038FF] shadow-sm' // Новый цвет из макета
              : 'text-slate-700 hover:bg-gray-200'
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}