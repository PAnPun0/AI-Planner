// src/components/Header.jsx
export function Header({ title, progress = 0 }) {
  return (
    <div className="bg-[#FFFFFF] w-full flex flex-col items-center py-6 mb-4 sticky top-0 z-10">
      <h1 className="text-2xl font-medium text-slate-900 mb-6">{title}</h1>
      
      {/* Контейнер прогресс-бара */}
      <div className="w-full h-[6px] bg-[#D6E4FF] rounded-full overflow-hidden">
        {/* Заполненная часть */}
        <div 
          className="h-full bg-[#1028D3] transition-all duration-700 ease-out rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}