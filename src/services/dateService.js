/** Date helpers only (SRP). Weeks run Monday to Sunday. */

export const weekStart = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
};

export const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

export const sameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();

const fmt = (d, o) => new Date(d).toLocaleDateString('en-US', o);

export const weekLabel = (start) =>
  `${fmt(start, { day: 'numeric', month: 'short' })} to ${fmt(addDays(start, 6), { day: 'numeric', month: 'short' })}`;

export const dayLabel = (d) => fmt(d, { weekday: 'short', day: 'numeric', month: 'short' });

export const timeLabel = (d) => new Date(d).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

const pad = (n) => String(n).padStart(2, '0');

export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
