export function toSlashDate(d: Date): string {
  const monthStr = zeroPadNumber(d.getMonth() + 1);
  return `${d.getFullYear()}/${monthStr}/${d.getDate()}`;
}

export function toTime(d: Date): string {
  const hrStr = zeroPadNumber(d.getHours());
  const minStr = zeroPadNumber(d.getMinutes());
  const secStr = zeroPadNumber(d.getSeconds());
  return `${hrStr}:${minStr}:${secStr}`;
}

function zeroPadNumber(n: number): string {
  if (n < 10) return `0${n}`;
  return String(n);
}
