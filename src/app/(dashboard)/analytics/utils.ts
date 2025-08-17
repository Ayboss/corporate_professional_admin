/* eslint-disable @typescript-eslint/no-explicit-any */
export function lastPct(trend?: { percentage_change: number }[]) {
  if (!trend || trend.length === 0) return undefined;
  return trend[trend.length - 1]?.percentage_change;
}
export function formatNumber(n?: number) {
  return typeof n === "number" ? n.toLocaleString() : "-";
}

export function buildQuery(
  params: Record<string, string | number | boolean | undefined>
) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "" && v !== null) qs.append(k, String(v));
  });
  return qs.toString();
}

export function toSeries(data: any[] | undefined) {
  return (data || []).map((d: any) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString(),
  }));
}

export function entriesFromRecord(rec?: Record<string, string>) {
  if (!rec) return [] as { name: string; value: number }[];
  return Object.entries(rec).map(([name, value]) => ({ name, value }));
}
