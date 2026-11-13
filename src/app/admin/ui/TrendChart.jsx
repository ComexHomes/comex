"use client";
// Line chart: this period against the previous period, one shared axis.
// Hover or tap to read the exact figures for a day.
import { useRef, useState } from "react";

const W = 720, H = 230, L = 46, R = 12, T = 12, B = 26;
const fmt = (n) => new Intl.NumberFormat("en-KE", { maximumFractionDigits: 1 }).format(n);
const short = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

function niceMax(v) {
  if (v <= 0) return 4;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 4 ? 4 : f <= 5 ? 5 : f <= 8 ? 8 : 10) * p;
}

export default function TrendChart({ title, unit, points }) {
  // points: [{ date, prevDate, cur, prev }]
  const [hover, setHover] = useState(null);
  const ref = useRef(null);
  const n = points.length;
  const max = niceMax(Math.max(1, ...points.map((p) => Math.max(p.cur, p.prev))));
  const x = (i) => L + (n <= 1 ? 0 : (i * (W - L - R)) / (n - 1));
  const y = (v) => T + (1 - v / max) * (H - T - B);
  const path = (key) => points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join("");
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const labelEvery = Math.max(1, Math.ceil(n / 7));

  const move = (e) => {
    const box = ref.current.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * W;
    const i = Math.max(0, Math.min(n - 1, Math.round(((px - L) / (W - L - R)) * (n - 1))));
    setHover(i);
  };
  const h = hover == null ? null : points[hover];

  return (
    <div>
      <h3>{title}</h3>
      <div className="legend">
        <span><i className="sw" style={{ background: "#b45309" }} />This period</span>
        <span><i className="sw" style={{ background: "repeating-linear-gradient(90deg,#2563eb 0 4px,transparent 4px 7px)" }} />Previous period</span>
      </div>
      <div className="chart">
        <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: this period against the previous period`}
          onPointerMove={move} onPointerDown={move} onPointerLeave={() => setHover(null)} style={{ touchAction: "pan-y" }}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#ece7e4" strokeWidth="1" />
              <text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#8a8486">{fmt(t)}</text>
            </g>
          ))}
          {points.map((p, i) => (i % labelEvery === 0 ? (
            <text key={p.date} x={x(i)} y={H - 7} textAnchor={i === 0 ? "start" : "middle"} fontSize="11" fill="#8a8486">{short(p.date)}</text>
          ) : null))}
          <path d={path("prev")} fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round" />
          <path d={path("cur")} fill="none" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {h && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke="#8a8486" strokeWidth="1" />
              <circle cx={x(hover)} cy={y(h.prev)} r="4.5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
              <circle cx={x(hover)} cy={y(h.cur)} r="4.5" fill="#b45309" stroke="#fff" strokeWidth="2" />
            </g>
          )}
        </svg>
        {h && (
          <div className="tip" style={{ left: `${Math.min(86, Math.max(14, (x(hover) / W) * 100))}%` }}>
            <b>{fmt(h.cur)}</b> {unit} <span>on {short(h.date)}</span><br />
            <b>{fmt(h.prev)}</b> {unit} <span>on {short(h.prevDate)}</span>
          </div>
        )}
      </div>
      <details>
        <summary>Show as a table</summary>
        <div className="scroll">
          <table>
            <thead><tr><th>Day</th><th>This period</th><th>Previous period</th></tr></thead>
            <tbody>
              {points.map((p) => (<tr key={p.date}><td>{short(p.date)}</td><td>{fmt(p.cur)}</td><td>{fmt(p.prev)}</td></tr>))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
