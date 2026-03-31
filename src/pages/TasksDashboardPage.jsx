// src/pages/TasksDashboardPage.jsx
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { TaskFilters } from '../components/TaskFilters';
import { TaskRow } from '../components/TaskRow';
import { AIPanel } from '../components/AIPanel';
import { EventDetails } from '../components/EventDetails';
import { GuestList } from '../components/GuestList';

const mockTasksFromServer = [
  { id: 1, name: 'Create Guest List', date: '11.03.2024', category: 'Conception', status: 'orange_empty' },
  { id: 2, name: 'Send Out Invitations', date: '21.03.2024', category: 'Promotion', status: 'red_empty' },
  { id: 3, name: 'Prepare Decorations', date: '06.04.2024', category: 'Design', status: 'black_empty' },
  { id: 4, name: 'Confirm RSVPs', date: '11.04.2024', category: 'Promotion', status: 'red_empty' },
  { id: 5, name: 'Set Up Event Space', date: '16.04.2024', category: 'Logistics', status: 'red_empty' },
  { id: 6, name: 'Establish Event Date', date: '02.03.2024', category: 'Conception', status: 'red_check' },
  { id: 7, name: 'Choose Event Location', date: '06.03.2024', category: 'Logistics', status: 'red_check' },
  { id: 8, name: 'Design Invitations', date: '16.03.2024', category: 'Design', status: 'orange_check' },
];


export default function TasksDashboardPage() {
  const [tasks] = useState(mockTasksFromServer);
  const [activeTab, setActiveTab] = useState('guests'); // Сделал Гостей открытыми по умолчанию для проверки

  return (
    // Изменили фон на светло-серый, чтобы белые карточки выделялись
    <div className="flex h-screen w-full bg-[#F8F9FB] font-sans overflow-hidden">
      
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden pt-6 relative">
        <div className="px-8 mb-4 shrink-0">
           <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Логика переключения вкладок */}
        {activeTab === 'event' ? (
          <EventDetails />
        ) : activeTab === 'tasks' ? (
          <div className="flex-1 flex flex-col px-8 pt-4">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">All tasks</h1>
              </div>
              <button className="bg-[#4038FF] text-white px-8 py-2.5 rounded-lg font-medium text-sm">Add task</button>
            </div>
            <TaskFilters />
            <div className="flex-1 overflow-y-auto pr-2 pb-10">
              <div className="grid grid-cols-[40px_1fr_120px_120px_40px] gap-4 mb-2 px-2 text-xs font-medium text-gray-500 uppercase">
                <div></div><div>Name</div><div>Due date</div><div>Category</div><div></div>
              </div>
              <div className="flex flex-col border-t border-gray-100 bg-white rounded-2xl border">
                {tasks.map((task) => <TaskRow key={task.id} task={task} />)}
              </div>
            </div>
          </div>
        ) : activeTab === 'guests' ? (
          <GuestList /> // Наш новый компонент!
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Раздел в разработке
          </div>
        )}
      </div>

      <AIPanel />

    </div>
  );
}