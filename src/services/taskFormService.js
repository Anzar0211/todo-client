import { hm, ymd } from './dateService.js';

/** Task form defaults, validation, and payload mapping (SRP). */
export function createTaskFormState(task = {}) {
  const due = task.dueAt ? new Date(task.dueAt) : null;
  const ends = task.endsAt ? new Date(task.endsAt) : null;
  return {
    title: task.title || '',
    description: task.description || '',
    date: ymd(due || new Date()),
    startTime: due ? hm(due) : '',
    endTime: ends ? hm(ends) : '',
  };
}

export function validateTaskForm(form) {
  if (!form.title?.trim()) return 'Add a title for this task.';
  if (!form.date || !form.startTime) return 'Pick a date and a start time.';
  if (form.endTime && form.endTime < form.startTime) return 'End time must be after start time.';
  return null;
}

export function toTaskPayload(form) {
  return {
    title: form.title,
    description: form.description,
    dueAt: new Date(`${form.date}T${form.startTime}`).toISOString(),
    endsAt: form.endTime ? new Date(`${form.date}T${form.endTime}`).toISOString() : null,
  };
}

export function formatFormDate(ymdStr) {
  if (!ymdStr) return '';
  const d = new Date(`${ymdStr}T12:00:00`);
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
  const month = d.toLocaleDateString('en-US', { month: 'long' });
  return `${weekday} ${d.getDate()}, ${month}`;
}
