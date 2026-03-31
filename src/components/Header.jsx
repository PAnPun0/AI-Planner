
export function Header({ title, progress = 0 }) {
  return (
    <div className="relative w-full bg-[#BFD1FF] rounded-lg overflow-hidden py-6 text-center mb-8">
      <h1 className="text-2xl font-medium text-slate-800">{title}</h1>
      {/* Полоска прогресса */}
      <div 
        className="absolute bottom-0 left-0 h-[6px] bg-[#1028D3] transition-all duration-500" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}