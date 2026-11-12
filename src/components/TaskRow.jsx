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
    <div className="flex items-center gap-3 border-b border-track py-3">
      <button
        role="checkbox"
        aria-checked={done}
        aria-label={done ? 'Mark as in progress' : 'Mark as completed'}
        onClick={toggle}
        className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border border-brand text-brand"
      >
        {done && <Check size={14} strokeWidth={3} />}
      </button>
      <button onClick={() => openSheet(task)} className="min-w-0 flex-1 text-left">
        <span className={`block truncate text-[15px] font-medium ${done ? 'line-through' : ''}`}>{task.title}</span>
        <span className="text-xs text-mute">
          {showDate ? `${dayLabel(task.dueAt)}, ${timeLabel(task.dueAt)}` : timeLabel(task.dueAt)}
        </span>
      </button>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => remove(task._id)}
          aria-label="Delete task"
          className="p-1.5 text-mute transition hover:text-danger"
        >
          <Trash2 size={20} />
        </button>
        <button
          type="button"
          onClick={() => openSheet(task)}
          aria-label="Edit task"
          className="p-1.5 text-mute transition hover:text-ink"
        >
          <SquarePen size={20} />
        </button>
      </div>
    </div>
  );
}
