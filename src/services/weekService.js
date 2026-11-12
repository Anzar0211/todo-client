import { weekStart } from './dateService.js';

export function groupByWeek(tasks, now = new Date()) {
  const map = new Map();
  const slot = (d) => {
    const start = weekStart(d);
    const key = start.getTime();
    if (!map.has(key)) map.set(key, { key, start, tasks: [], open: 0, done: 0 });
    return map.get(key);
  };

  slot(now);
  tasks.forEach((t) => {
    const w = slot(t.dueAt);
    w.tasks.push(t);
    w[t.status === 'completed' ? 'done' : 'open'] += 1;
  });

  const current = weekStart(now).getTime();
  return [...map.values()]
    .sort((a, b) => a.start - b.start)
    .map((w) => ({ ...w, isCurrent: w.key === current }));
}
