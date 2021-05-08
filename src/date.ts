/**
 * toSlashDate returns a date string in slash format from a given date. For example, `"2021/05/15"`
 *
 * @param d A Date object
 * @returns The date string
 */
export function toSlashDate(d: Date): string {
  const monthStr = zeroPadNumber(d.getMonth() + 1);
  return `${d.getFullYear()}/${monthStr}/${d.getDate()}`;
}

/**
 * toTime returns a time string in 24hr format from a given date. For example, `"13:51:32"`
 *
 * @param d A Date object
 * @returns The time string
 */
export function toTime(d: Date): string {
  const hrStr = zeroPadNumber(d.getHours());
  const minStr = zeroPadNumber(d.getMinutes());
  const secStr = zeroPadNumber(d.getSeconds());
  return `${hrStr}:${minStr}:${secStr}`;
}

/**
 * zeroPadNumber pads a number with a leading zero and returns it as a string. For example, `9` would become `"09"`.
 *
 * @param n The number to pad
 * @returns A padded number string
 */
function zeroPadNumber(n: number): string {
  if (n < 10) return `0${n}`;
  return String(n);
}
