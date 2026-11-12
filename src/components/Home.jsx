import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, X } from 'lucide-react';
import TaskRow from './TaskRow';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { useUi } from '../hooks/useUi';
import { addDays, dayLabel, sameDay, weekStart } from '../services/dateService';
import { groupByWeek } from '../services/weekService';

function Stat({ label, value, tone, icon }) {
  return (
    <div className={`flex-1 rounded-sm p-4 ${tone.card}`}>
      <div className="flex items-center gap-2">
        <span className={`grid h-7 w-7 place-items-center rounded-[5px] ${tone.chip}`}>{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="mt-2 pl-9 text-3xl font-semibold leading-none">
        {String(value).padStart(2, '0')} <span className="text-[11px] font-normal text-mute">This Week</span>
      </p>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const { items, loading } = useTasks();
  const { openSheet } = useUi();
  const now = useMemo(() => new Date(), []);
  const [day, setDay] = useState(now);
  const weeks = useMemo(() => groupByWeek(items, now), [items, now]);
  const current = weeks.find((w) => w.isCurrent);
  const percent = current.tasks.length ? Math.round((current.done / current.tasks.length) * 100) : 0;
  const dayTasks = items.filter((t) => sameDay(t.dueAt, day));
  const strip = Array.from({ length: 7 }, (_, i) => addDays(weekStart(now), i));

  return (
    <main>
      <div className="mb-6 sm:mb-8">
        <p className="text-sm text-mute">Hello{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</p>
        <h1 className="text-2xl font-semibold sm:text-3xl">Your week at a glance</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] xl:gap-14 2xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] 2xl:gap-16">
        <section className="space-y-6">
          <div className="flex justify-between gap-1 overflow-x-auto pb-1 sm:gap-2 sm:overflow-visible">
            {strip.map((d) => {
              const on = sameDay(d, day);
              return (
                <button
                  key={d.getTime()}
                  onClick={() => setDay(d)}
                  aria-pressed={on}
                  className={`flex w-10 shrink-0 flex-col items-center rounded-sm py-1.5 text-xs sm:w-12 ${
                    on ? 'bg-brand text-white' : 'text-mute hover:bg-white'
                  }`}
                >
                  {d.toLocaleDateString('en-US', { weekday: 'short' })}
                  <span className="text-base font-semibold">{String(d.getDate()).padStart(2, '0')}</span>
                  <span className={`mt-0.5 h-1 w-1 rounded-full ${sameDay(d, now) ? (on ? 'bg-white' : 'bg-brand') : ''}`} />
                </button>
              );
            })}
          </div>

          <div className="flex flex-row gap-3 sm:gap-4 lg:flex-col">
            <Stat label="Task Complete" value={current.done} tone={{ card: 'bg-tint', chip: 'bg-brand/40' }} icon={<Check size={16} />} />
            <Stat label="Task Pending" value={current.open} tone={{ card: 'bg-blush', chip: 'bg-danger/30 text-danger' }} icon={<X size={16} />} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Weekly Progress</h2>
            <div className="mt-3 h-6 overflow-hidden bg-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-navy transition-[width] duration-500" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-2 text-sm text-mute">{percent}% complete this week</p>
          </div>
        </section>

        <section className="min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{sameDay(day, now) ? 'Tasks Today' : dayLabel(day)}</h2>
            <Link to="/search" className="text-sm font-medium text-brand">View All</Link>
          </div>
          <div className="mt-2 border-t border-track">
            {loading && <p className="py-6 text-sm text-mute">Loading tasks…</p>}
            {!loading && !dayTasks.length && (
              <p className="py-6 text-sm text-mute">Nothing planned for this day. Tap + to add a task.</p>
            )}
            {dayTasks.map((t) => <TaskRow key={t._id} task={t} />)}
          </div>
        </section>
      </div>

      <button
        onClick={() => openSheet()}
        aria-label="Add task"
        className="fixed bottom-6 left-1/2 z-10 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:scale-105 sm:left-auto sm:right-6 sm:translate-x-0 lg:bottom-8 lg:right-8"
      >
        <Plus size={30} />
      </button>
    </main>
  );
}
