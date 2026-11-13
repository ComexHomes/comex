// Small display pieces shared across the dashboard.
const nf = new Intl.NumberFormat("en-KE");
export const int = (n) => nf.format(Math.round(n || 0));
export const pct = (n) => `${((n || 0) * 100).toFixed(1)}%`;
export const pos = (n) => (n ? n.toFixed(1) : "n/a");

// Change against the previous period. `lowerIsBetter` is for search position,
// where a smaller number is the win. `points` shows a plain difference instead of a percentage.
export function Delta({ cur, prev, lowerIsBetter = false, points = false, scale = 1 }) {
  if (prev == null) return <span className="chip flat">new</span>;
  if (!prev && !cur) return <span className="chip flat">no change</span>;
  if (!prev) return <span className="chip up">▲ new</span>;
  const diff = cur - prev;
  const rel = diff / prev;
  if (Math.abs(points ? diff * scale : rel) < (points ? 0.05 : 0.005)) return <span className="chip flat">no change</span>;
  const good = lowerIsBetter ? diff < 0 : diff > 0;
  const arrow = diff > 0 ? "▲" : "▼";
  const text = points ? Math.abs(diff * scale).toFixed(1) : `${Math.abs(rel * 100).toFixed(rel * 100 >= 100 ? 0 : 1)}%`;
  return <span className={`chip ${good ? "up" : "down"}`}>{arrow} {text}</span>;
}

export function Tile({ label, value, was, children }) {
  return (
    <div className="card tile">
      <div className="lab">{label}</div>
      <div className="val">{value}</div>
      {children}
      {was != null && <span className="was">was {was}</span>}
    </div>
  );
}

export function Table({ head, rows, empty = "Nothing to show for this period yet." }) {
  if (!rows || !rows.length) return <div className="empty">{empty}</div>;
  return (
    <div className="scroll">
      <table>
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export function Problem({ title, error }) {
  return (
    <div className="alert" role="status">
      <b>{title}</b>
      {error}
    </div>
  );
}
