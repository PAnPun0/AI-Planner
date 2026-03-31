export function Sidebar() {
  return (
    <div className="w-[72px] bg-[#D1DDF7] flex flex-col items-center py-6 gap-6 shrink-0 relative">
      <div className="w-10 h-10 rounded-full bg-[#6B6B6B] cursor-pointer hover:opacity-80 transition-opacity"></div>
      <div className="w-10 h-10 rounded-full bg-[#6B6B6B] cursor-pointer hover:opacity-80 transition-opacity"></div>
      <div className="w-10 h-10 rounded-full bg-[#6B6B6B] cursor-pointer hover:opacity-80 transition-opacity"></div>
      
      {/* Аватарка пользователя / Настройки */}
      <div className="absolute bottom-6 w-10 h-10 rounded-full bg-white cursor-pointer hover:shadow-md transition-shadow"></div>
    </div>
  );
}