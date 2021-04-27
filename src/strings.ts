export function parsePrice(ps: string): number {
  let priceString = ps;
  if (ps[0] === "$") {
    priceString = ps.substring(1);
  }
  return parseFloat(priceString);
}

export function prettyPercent(current: number, old: number): string {
  const p = 100 - (current / old) * 100;
  return `${p.toFixed(2)}%`;
}
