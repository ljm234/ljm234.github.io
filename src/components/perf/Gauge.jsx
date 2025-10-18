// src/components/perf/Gauge.jsx
"use client";

import { useEffect, useState } from "react";

export default function Gauge({ value = 0, label }) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = 46;
  const c = 2 * Math.PI * r;
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const target = c - (clamped / 100) * c;
    // animate on mount
    const t = setTimeout(() => setOffset(target), 50);
    return () => clearTimeout(t);
  }, [c, clamped]);

  // color by score
  const hue = clamped >= 90 ? 156 : clamped >= 70 ? 200 : 12; // green/blue/orange
  const stroke = `hsl(${hue} 70% 45%)`;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 120" width="120" height="120" className="block">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(156 70% 45%)" />
            <stop offset="100%" stopColor="hsl(210 80% 55%)" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="rgba(0,0,0,.08)"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={clamped >= 90 ? "url(#g)" : stroke}
          strokeLinecap="round"
          strokeWidth="10"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.22,.61,.36,1)" }}
        />
        <text
          x="60"
          y="66"
          textAnchor="middle"
          className="fill-current"
          style={{ fontSize: 26, fontWeight: 700 }}
        >
          {clamped}
        </text>
      </svg>
      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{label}</div>
    </div>
  );
}
