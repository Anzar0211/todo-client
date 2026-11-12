import { useSearchParams } from 'react-router-dom';
import TaskRow from './TaskRow';
import { useTasks } from '../hooks/useTasks';
import { filterTasks } from '../services/taskQueryService';

export default function Search() {
  const { items, loading } = useTasks();
  const [params] = useSearchParams();
  const term = (params.get('q') || '').trim();
  const results = filterTasks(items, term);

  return (
    <main className="w-full">
      <p className="text-sm text-mute">
        {term
          ? `${results.length} result${results.length === 1 ? '' : 's'}`
          : 'Search your tasks'}
      </p>
      <div className="mt-3 border-t border-track">
        {loading && <p className="py-6 text-sm text-mute">Loading tasks…</p>}
        {!loading && results.map((t) => <TaskRow key={t._id} task={t} showDate />)}
        {!loading && term && !results.length && (
          <p className="py-6 text-sm text-mute">No tasks match "{term}". Try another keyword.</p>
        )}
        {!loading && !term && !items.length && (
          <p className="py-6 text-sm text-mute">No tasks yet. Tap + to add one.</p>
        )}
      </div>
    </main>
  );
}
