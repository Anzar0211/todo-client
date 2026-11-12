import { Check, SquarePen, Trash2 } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useUi } from '../hooks/useUi';
import { dayLabel, timeLabel } from '../services/dateService';

export default function TaskRow({ task, showDate = false }) {
  const { update, remove } = useTasks();
  const { openSheet } = useUi();
  const done = task.status === 'completed';

  const toggle = () =>
    update({ id: task._id, status: done ? 'in_progress' : 'completed' });

  return (
    <div className="flex items-center gap-3 border-b border-track py-3 xl:gap-4 xl:py-4 2xl:gap-5 2xl:py-5">
      <button
        role="checkbox"
        aria-checked={done}
        aria-label={done ? 'Mark as in progress' : 'Mark as completed'}
        onClick={toggle}
        className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border border-brand text-brand 2xl:h-6 2xl:w-6 2xl:rounded-md"
      >
        {done && <Check className="h-3.5 w-3.5 2xl:h-4 2xl:w-4" strokeWidth={3} />}
      </button>
      <button onClick={() => openSheet(task)} className="min-w-0 flex-1 text-left">
        <span
          className={`block truncate text-[15px] font-medium xl:text-base 2xl:text-lg ${
            done ? 'line-through' : ''
          }`}
        >
          {task.title}
        </span>
        <span className="text-xs text-mute xl:text-sm 2xl:text-base">
          {showDate ? `${dayLabel(task.dueAt)}, ${timeLabel(task.dueAt)}` : timeLabel(task.dueAt)}
        </span>
      </button>
      <div className="flex shrink-0 items-center gap-1 2xl:gap-2">
        <button
          type="button"
          onClick={() => remove(task._id)}
          aria-label="Delete task"
          className="p-1.5 text-mute transition hover:text-danger 2xl:p-2"
        >
          <Trash2 className="h-5 w-5 2xl:h-6 2xl:w-6" />
        </button>
        <button
          type="button"
          onClick={() => openSheet(task)}
          aria-label="Edit task"
          className="p-1.5 text-mute transition hover:text-ink 2xl:p-2"
        >
          <SquarePen className="h-5 w-5 2xl:h-6 2xl:w-6" />
        </button>
      </div>
    </div>
  );
}
