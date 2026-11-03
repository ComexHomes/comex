"use client";
import { useState } from "react";

const fmt = (n) => "KES " + Math.round(n).toLocaleString("en-KE");

// Rental yield calculator for investors. Defaults are Astana Residence studio
// figures; every assumption can be changed by the visitor.
export default function YieldCalculator() {
  const [v, setV] = useState({ price: 3510000, rent: 29000, occupancy: 92, service: 3000, mgmt: 10 });
  const set = (k) => (e) => setV({ ...v, [k]: Number(e.target.value) || 0 });

  const annualRent = v.rent * 12;
  const collected = annualRent * (v.occupancy / 100);
  const costs = v.service * 12 + collected * (v.mgmt / 100);
  const net = collected - costs;
  const gross = v.price ? (annualRent / v.price) * 100 : 0;
  const netYield = v.price ? (net / v.price) * 100 : 0;
  const payback = net > 0 ? v.price / net : 0;

  const field = (k, label, step) => (
    <label style={{ display: "block", marginBottom: 10 }}>
      <span style={{ display: "block", fontSize: 14, color: "#444" }}>{label}</span>
      <input type="number" step={step} value={v[k]} onChange={set(k)} style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6 }} />
    </label>
  );

  return (
    <section id="calculator" style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: 20, background: "#fafafa", marginTop: 28 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Rental yield calculator</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        <div>
          {field("price", "Purchase price (KES)", 10000)}
          {field("rent", "Monthly rent (KES)", 500)}
          {field("occupancy", "Occupancy (% of the year let)", 1)}
          {field("service", "Service charge per month (KES)", 500)}
          {field("mgmt", "Management fee (% of rent collected)", 1)}
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.9 }}>
          <div>Gross yield: <strong>{gross.toFixed(1)}%</strong></div>
          <div>Rent collected a year: <strong>{fmt(collected)}</strong></div>
          <div>Running costs a year: <strong>{fmt(costs)}</strong></div>
          <div>Net income a year: <strong>{fmt(net)}</strong></div>
          <div>Net yield: <strong>{netYield.toFixed(1)}%</strong></div>
          <div>Years to recover the price from rent: <strong>{payback ? payback.toFixed(1) : "-"}</strong></div>
          <p style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
            Defaults use the Astana Residence studio (KES 3.51M, expected rent KES 29,000). Occupancy, service charge and management fee are example assumptions; change them to match the unit you are quoted. Rent is an estimate, not a guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
