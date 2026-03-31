// src/components/dashboard/TaskFilters.jsx
export function TaskFilters() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2">
        <button className="bg-[#4038FF] text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-blue-700">All</button>
        <button className="bg-[#F5F5F5] text-slate-700 hover:bg-gray-200 px-4 py-1.5 rounded-full text-xs font-medium transition-colors">Overdue</button>
        <button className="bg-[#F5F5F5] text-slate-700 hover:bg-gray-200 px-4 py-1.5 rounded-full text-xs font-medium transition-colors">Today</button>
        <button className="bg-[#F5F5F5] text-slate-700 hover:bg-gray-200 px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors">
          <span className="w-2 h-2 rounded-full border border-slate-700"></span> Priority
        </button>
        <button className="bg-[#F5F5F5] text-slate-700 hover:bg-gray-200 px-4 py-1.5 rounded-full text-xs font-medium transition-colors">Done</button>
      </div>

      <div className="bg-[#F5F5F5] flex items-center px-3 py-1.5 rounded-lg w-64 focus-within:ring-1 focus-within:ring-[#4038FF] transition-all">
        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Search tasks" className="bg-transparent border-none outline-none text-sm w-full" />
      </div>
    </div>
  );
}