/**
 * getHost returns the host from a given URL. For example, `"https://example.com"` would return `"example.com"`
 *
 * @param str A URL string
 * @returns The URL's host
 */
export default function getHost(str: string): string {
  const u = new URL(str);
  return u.hostname;
}
