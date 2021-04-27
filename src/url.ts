export default function getHost(str: string): string {
  const u = new URL(str);
  return u.hostname;
}
