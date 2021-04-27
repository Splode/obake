export default function prettyPercent(current: number, old: number): string {
  const p = 100 - (current / old) * 100;
  return `${p.toFixed(2)}%`;
}
