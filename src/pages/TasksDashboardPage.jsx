// src/pages/TasksDashboardPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { TaskFilters } from '../components/TaskFilters';
import { TaskRow } from '../components/TaskRow';
import { AIPanel } from '../components/AIPanel';
import { EventDetails } from '../components/EventDetails';
import { GuestList } from '../components/GuestList';
import { Budget } from '../components/Budget'
import { GuestChat } from '../components/GuestChat';
import { MyEvents } from '../components/MyEvents';
import { getEvents, getTasks } from '../api';

const STATUS_MAP = {
  pending: 'orange_empty',
  in_progress: 'orange_empty',
  completed: 'red_check',
  overdue: 'red_empty',
};

export default function TasksDashboardPage() {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [activeTab, setActiveTab] = useState('guests');
  const [globalNav, setGlobalNav] = useState('events'); 
  const navigate = useNavigate();

  const userId = Number(localStorage.getItem('user_id'));

  // Загружаем список мероприятий, берём первое
  useEffect(() => {
    getEvents()
      .then((data) => {
        const events = Array.isArray(data) ? data : data?.events ?? [];
        if (events.length === 0) {
          navigate('/create');
          return;
        }
        const event = events[0];
        setCurrentEvent(event);
        localStorage.setItem('current_event_id', event.id);
      })
      .catch(() => navigate('/create'));
  }, [navigate]);

  // Загружаем задачи при смене мероприятия
  useEffect(() => {
    if (!currentEvent) return;
    setLoadingTasks(true);
    getTasks(currentEvent.id)
      .then((data) => {
        const raw = Array.isArray(data) ? data : data?.tasks ?? [];
        setTasks(
          raw.map((t) => ({
            id: t.id,
            name: t.title,
            date: t.deadline
              ? new Date(t.deadline).toLocaleDateString('ru-RU')
              : '—',
            category: t.category ?? '—',
            status: STATUS_MAP[t.status] ?? 'black_empty',
          }))
        );
      })
      .catch(() => setTasks([]))
      .finally(() => setLoadingTasks(false));
  }, [currentEvent]);

  return (
    <div className="flex h-screen w-full bg-[#F8F9FB] font-sans overflow-hidden">
      <Sidebar activeNav={globalNav} onNavChange={setGlobalNav} />
      
      <div className="flex-1 flex flex-col overflow-hidden pt-6 relative">
        <div className="px-8 mb-4 shrink-0">
          <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {activeTab === 'event' ? (
          <EventDetails event={currentEvent} />
        ) : activeTab === 'tasks' ? (
          <div className="flex-1 flex flex-col px-8 pt-4">
            <div className="flex justify-between items-end mb-6">
              <h1 className="text-2xl font-semibold text-slate-900">
                {loadingTasks ? 'Загрузка...' : 'Все задачи'}
              </h1>
              <button className="bg-[#4038FF] text-white px-8 py-2.5 rounded-lg font-medium text-sm">
                Добавить задачу
              </button>
            </div>
            <TaskFilters />
            <div className="flex-1 overflow-y-auto pr-2 pb-10">
              <div className="grid grid-cols-[40px_1fr_120px_120px_40px] gap-4 mb-2 px-2 text-xs font-medium text-gray-500 uppercase">
                <div /><div>Название</div><div>Срок</div><div>Категория</div><div />
              </div>
              <div className="flex flex-col border-t border-gray-100 bg-white rounded-2xl border">
                {tasks.length === 0 && !loadingTasks ? (
                  <div className="py-10 text-center text-gray-400 text-sm">
                    Задач пока нет
                  </div>
                ) : (
                  tasks.map((task) => <TaskRow key={task.id} task={task} />)
                )}
              </div>
            </div>
          </div>
        ) : activeTab === 'guests' ? (
          <GuestList eventId={currentEvent?.id} />
        ) : activeTab === 'budget' ? (
          <Budget /> 
        ) : activeTab === 'chat' ? (
          <GuestChat /> 
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Раздел в разработке
          </div>
        )}
      </div>

      <AIPanel userId={userId} eventId={currentEvent?.id} />
    </div>
  );
}
