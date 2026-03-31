export function TaskRow({ task }) {
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'orange_empty': return <circle cx="12" cy="12" r="9" stroke="#F59E0B" strokeWidth="2" fill="none"/>;
      case 'red_empty': return <circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="2" fill="none"/>;
      case 'black_empty': return <circle cx="12" cy="12" r="9" stroke="#374151" strokeWidth="2" fill="none"/>;
      case 'red_check': return (
        <><circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="2" fill="none"/><path d="M8 12L11 15L16 9" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></>
      );
      case 'orange_check': return (
        <><circle cx="12" cy="12" r="9" stroke="#F59E0B" strokeWidth="2" fill="none"/><path d="M8 12L11 15L16 9" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/></>
      );
      default: return <circle cx="12" cy="12" r="9" stroke="#D1D5DB" strokeWidth="2" fill="none"/>;
    }
  };

  // Вычисляем цвет даты
  const dateColor = task.status.includes('red') 
    ? 'text-red-500' 
    : task.status.includes('orange') 
      ? 'text-orange-500' 
      : 'text-gray-500';

  return (
    <div className="grid grid-cols-[40px_1fr_120px_120px_40px] gap-4 items-center px-2 py-3.5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
      
      <div className="flex items-center justify-center cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {renderStatusIcon(task.status)}
        </svg>
      </div>

      <div className="font-medium text-sm text-slate-800">{task.name}</div>
      <div className={`text-xs font-medium ${dateColor}`}>{task.date}</div>
      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md w-max">{task.category}</div>

      <button className="flex items-center justify-center text-gray-300 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" />
        </svg>
      </button>
    </div>
  );
}