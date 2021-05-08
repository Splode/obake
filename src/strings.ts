/**
 * elide returns a new string trimmed from the beginning up to n characters. Finally, the string is terminated with an
 * ellipsis. For example `Foobar...`
 *
 * @param str The string to trim
 * @param max The number of characters to keep before trimming
 * @returns The truncated string
 */
export function elide(str: string, max = 24): string {
  return `${str.substr(0, max)}...`;
}

/**
 * parsePrice attempts to parse a price represented in string format into a float. Prices with and without leading `"$""`
 * are supported.
 *
 * @param ps The price string
 * @returns The price
 */
export function parsePrice(ps: string): number {
  let priceString = ps;
  if (ps[0] === "$") {
    priceString = ps.substring(1);
  }
  return parseFloat(priceString);
}

/**
 * prettyPercent returns a human-friendly string representation of a fraction. For example, `1/2` would return `"50%""`
 *
 * @param numerator The fraction's numerator
 * @param denominator The fraction's denominator
 * @returns A string representing the percentage
 */
export function prettyPercent(numerator: number, denominator: number): string {
  const p = 100 - (numerator / denominator) * 100;
  return `${p.toFixed(2)}%`;
}
