export function formatDate(iso: string | null) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}. ${m}. ${y}`;
}
