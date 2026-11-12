import { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useUi } from '../hooks/useUi';
import { createTaskFormState, formatFormDate, toTaskPayload, validateTaskForm } from '../services/taskFormService';

const input =
  'w-full rounded-lg border border-track bg-white px-3 py-3 text-sm text-ink outline-none placeholder:text-mute focus:border-brand focus:ring-2 focus:ring-brand/30';
const label = 'block text-sm text-mute';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

function parseHm(value) {
  if (!value) return { hour: 9, minute: 0, period: 'AM' };
  const [h, m] = value.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return { hour, minute: Number.isFinite(m) ? m : 0, period };
}

function toHm({ hour, minute, period }) {
  let h = hour % 12;
  if (period === 'PM') h += 12;
  return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function formatDisplay(value) {
  if (!value) return null;
  const { hour, minute, period } = parseHm(value);
  return `${hour}:${String(minute).padStart(2, '0')} ${period}`;
}

function TimePickerSheet({ title, value, onChange, onClose }) {
  const initial = useMemo(() => {
    const parsed = parseHm(value);
    const snapped = MINUTES.reduce((best, m) =>
      Math.abs(m - parsed.minute) < Math.abs(best - parsed.minute) ? m : best
    , 0);
    return { ...parsed, minute: snapped };
  }, [value]);
  const [draft, setDraft] = useState(initial);

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/40 sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-sm sm:rounded-3xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 text-mute hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="mb-5 flex items-center justify-center gap-2 rounded-2xl bg-tint px-4 py-4">
          <Clock size={20} className="text-brand" />
          <p className="text-3xl font-semibold tracking-tight text-ink">
            {draft.hour}:{String(draft.minute).padStart(2, '0')}
            <span className="ml-2 text-lg font-medium text-brand">{draft.period}</span>
          </p>
        </div>

        <div className="mb-3 flex gap-1 rounded-xl bg-canvas p-1">
          {['AM', 'PM'].map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => set({ period })}
              className={`h-10 flex-1 rounded-lg text-sm font-medium transition ${
                draft.period === period ? 'bg-brand text-white shadow-sm' : 'text-mute hover:text-ink'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        <p className="mb-2 text-xs font-medium text-mute">Hour</p>
        <div className="mb-4 grid grid-cols-6 gap-2">
          {HOURS.map((hour) => (
            <button
              key={hour}
              type="button"
              onClick={() => set({ hour })}
              className={`h-10 rounded-lg text-sm font-medium transition ${
                draft.hour === hour ? 'bg-brand text-white' : 'bg-canvas text-ink hover:bg-tint'
              }`}
            >
              {hour}
            </button>
          ))}
        </div>

        <p className="mb-2 text-xs font-medium text-mute">Minute</p>
        <div className="mb-5 grid grid-cols-6 gap-2">
          {MINUTES.map((minute) => (
            <button
              key={minute}
              type="button"
              onClick={() => set({ minute })}
              className={`h-10 rounded-lg text-sm font-medium transition ${
                draft.minute === minute ? 'bg-brand text-white' : 'bg-canvas text-ink hover:bg-tint'
              }`}
            >
              {String(minute).padStart(2, '0')}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            onChange(toHm(draft));
            onClose();
          }}
          className="h-12 w-full rounded-xl bg-brand font-medium text-white"
        >
          Set time
        </button>
      </div>
    </div>
  );
}

function TimeField({ value, onChange, placeholder, title }) {
  const [open, setOpen] = useState(false);
  const display = formatDisplay(value);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={title}
        className={`${input} flex flex-1 items-center gap-2 text-left ${display ? 'text-ink' : 'text-mute'}`}
      >
        <Clock size={18} className="shrink-0 text-mute" />
        <span className="truncate">{display || placeholder}</span>
      </button>
      {open && (
        <TimePickerSheet
          title={title}
          value={value}
          onChange={onChange}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function DateField({ value, onChange }) {
  const ref = useRef(null);
  return (
    <label className="relative mt-1.5 block">
      <span className={`${input} flex items-center pr-10 ${value ? 'text-ink' : 'text-mute'}`}>
        {value ? formatFormDate(value) : 'Pick a date'}
      </span>
      <Calendar size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-mute" />
      <input
        ref={ref}
        type="date"
        aria-label="Set date"
        value={value}
        onChange={onChange}
        onClick={() => ref.current?.showPicker?.()}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </label>
  );
}

function Form({ task, onClose }) {
  const { create, update } = useTasks();
  const [f, setF] = useState(() => createTaskFormState(task));
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setTime = (k) => (value) => setF((prev) => ({ ...prev, [k]: value }));

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const validationError = validateTaskForm(f);
    if (validationError) return setErr(validationError);

    setBusy(true);
    const body = toTaskPayload(f);
    try {
      await (task._id ? update({ id: task._id, ...body }) : create(body)).unwrap();
      onClose();
    } catch (x) {
      setErr(x.message);
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-ink/40 sm:items-center sm:p-6" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={task._id ? 'Edit task' : 'Add new task'}
        className="max-h-[92vh] w-full space-y-4 overflow-y-auto rounded-t-3xl bg-white p-5 sm:max-w-md sm:rounded-3xl sm:p-6 sm:shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{task._id ? 'Edit Task' : 'Add New Task'}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1"><X size={24} /></button>
        </div>

        <label className={label}>
          Task title
          <input
            autoFocus
            className={`${input} mt-1.5`}
            value={f.title}
            onChange={set('title')}
            maxLength={120}
            placeholder="Doing Homework"
          />
        </label>

        <div>
          <span className={label}>Set Time</span>
          <div className="mt-1.5 flex gap-3">
            <TimeField
              value={f.startTime}
              onChange={setTime('startTime')}
              placeholder="Start"
              title="Start time"
            />
            <TimeField
              value={f.endTime}
              onChange={setTime('endTime')}
              placeholder="Ends"
              title="End time"
            />
          </div>
        </div>

        <div>
          <span className={label}>Set Date</span>
          <DateField value={f.date} onChange={set('date')} />
        </div>

        <label className={label}>
          Description
          <textarea
            rows={4}
            className={`${input} mt-1.5 resize-none`}
            value={f.description}
            onChange={set('description')}
            placeholder="Add Description"
          />
        </label>

        {err && <p role="alert" className="text-sm text-danger">{err}</p>}

        <button disabled={busy} className="h-12 w-full rounded-xl bg-brand font-medium text-white disabled:opacity-60">
          {busy ? 'Saving…' : task._id ? 'Save changes' : 'Create task'}
        </button>
      </form>
    </div>
  );
}

export default function TaskSheet() {
  const { sheet, closeSheet } = useUi();
  if (!sheet) return null;
  return <Form key={sheet._id || 'new'} task={sheet} onClose={closeSheet} />;
}
