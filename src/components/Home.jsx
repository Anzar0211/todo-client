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
    <div className={`flex-1 rounded-sm p-4 xl:p-5 2xl:rounded-md 2xl:p-7 ${tone.card}`}>
      <div className="flex items-center gap-2 2xl:gap-3">
        <span className={`grid h-7 w-7 place-items-center rounded-[5px] xl:h-8 xl:w-8 2xl:h-10 2xl:w-10 2xl:rounded-md ${tone.chip}`}>
          {icon}
        </span>
        <span className="text-sm font-medium xl:text-base 2xl:text-lg">{label}</span>
      </div>
      <p className="mt-2 pl-9 text-3xl font-semibold leading-none xl:mt-3 xl:pl-10 2xl:mt-4 2xl:pl-12 2xl:text-5xl">
        {String(value).padStart(2, '0')}{' '}
        <span className="text-[11px] font-normal text-mute xl:text-xs 2xl:text-sm">This Week</span>
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
    <main className="flex flex-1 flex-col">
      <div className="mb-6 sm:mb-8 xl:mb-10 2xl:mb-12">
        <p className="text-sm text-mute xl:text-base 2xl:text-lg">
          Hello{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </p>
        <h1 className="text-2xl font-semibold sm:text-3xl xl:text-4xl 2xl:text-5xl 2xl:leading-tight">
          Your week at a glance
        </h1>
      </div>

      <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] xl:gap-14 2xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] 2xl:gap-20">
        <section className="flex flex-col space-y-6 xl:space-y-8 2xl:space-y-10">
          <div className="flex justify-between gap-1 overflow-x-auto pb-1 sm:gap-2 sm:overflow-visible 2xl:gap-3">
            {strip.map((d) => {
              const on = sameDay(d, day);
              return (
                <button
                  key={d.getTime()}
                  onClick={() => setDay(d)}
                  aria-pressed={on}
                  className={`flex w-10 shrink-0 flex-col items-center rounded-sm py-1.5 text-xs sm:w-12 xl:w-14 xl:py-2 xl:text-sm 2xl:w-16 2xl:rounded-md 2xl:py-3 2xl:text-base ${
                    on ? 'bg-brand text-white' : 'text-mute hover:bg-white'
                  }`}
                >
                  {d.toLocaleDateString('en-US', { weekday: 'short' })}
                  <span className="text-base font-semibold xl:text-lg 2xl:text-2xl">
                    {String(d.getDate()).padStart(2, '0')}
                  </span>
                  <span
                    className={`mt-0.5 h-1 w-1 rounded-full 2xl:mt-1 2xl:h-1.5 2xl:w-1.5 ${
                      sameDay(d, now) ? (on ? 'bg-white' : 'bg-brand') : ''
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex flex-row gap-3 sm:gap-4 lg:flex-col xl:gap-5 2xl:gap-6">
            <Stat
              label="Task Complete"
              value={current.done}
              tone={{ card: 'bg-tint', chip: 'bg-brand/40' }}
              icon={<Check className="h-4 w-4 2xl:h-5 2xl:w-5" />}
            />
            <Stat
              label="Task Pending"
              value={current.open}
              tone={{ card: 'bg-blush', chip: 'bg-danger/30 text-danger' }}
              icon={<X className="h-4 w-4 2xl:h-5 2xl:w-5" />}
            />
          </div>

          <div className="mt-auto pt-2 2xl:pt-4">
            <h2 className="text-lg font-semibold xl:text-xl 2xl:text-2xl">Weekly Progress</h2>
            <div
              className="mt-3 h-6 overflow-hidden bg-track xl:mt-4 xl:h-7 2xl:mt-5 2xl:h-9"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full bg-navy transition-[width] duration-500" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-2 text-sm text-mute xl:mt-3 xl:text-base 2xl:text-lg">
              {percent}% complete this week
            </p>
          </div>
        </section>

        <section className="flex min-h-0 min-w-0 flex-col 2xl:pl-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold xl:text-xl 2xl:text-2xl">
              {sameDay(day, now) ? 'Tasks Today' : dayLabel(day)}
            </h2>
            <Link to="/search" className="text-sm font-medium text-brand xl:text-base 2xl:text-lg">
              View All
            </Link>
          </div>
          <div className="mt-2 flex flex-1 flex-col border-t border-track xl:mt-3 2xl:mt-4">
            {loading && <p className="py-6 text-sm text-mute 2xl:py-10 2xl:text-base">Loading tasks…</p>}
            {!loading && !dayTasks.length && (
              <p className="py-6 text-sm text-mute 2xl:py-10 2xl:text-base">
                Nothing planned for this day. Tap + to add a task.
              </p>
            )}
            {dayTasks.map((t) => (
              <TaskRow key={t._id} task={t} />
            ))}
          </div>
        </section>
      </div>

      <button
        onClick={() => openSheet()}
        aria-label="Add task"
        className="fixed bottom-6 left-1/2 z-10 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:scale-105 sm:left-auto sm:right-6 sm:translate-x-0 lg:bottom-8 lg:right-8 2xl:bottom-10 2xl:right-12 2xl:h-20 2xl:w-20"
      >
        <Plus className="h-[30px] w-[30px] 2xl:h-9 2xl:w-9" />
      </button>
    </main>
  );
}
