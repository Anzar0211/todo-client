export function filterTasks(tasks, query) {
  const term = String(query || '').trim().toLowerCase();
  if (!term) return tasks;
  return tasks.filter((t) => `${t.title} ${t.description}`.toLowerCase().includes(term));
}
