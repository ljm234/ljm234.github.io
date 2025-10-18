// src/components/perf/TrendCard.jsx
"use client";

import { useMemo } from "react";

export default function TrendCard({ title, data = [], unit = "", caption }) {
  const points = useMemo(() => {
    if (!data.length) return "";
    const w = 240;
    const h = 60;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const dx = w / (data.length - 1 || 1);
    const norm = (v) => (max === min ? h / 2 : h - ((v - min) / (max - min)) * h);
    return data.map((v, i) => `${i * dx},${norm(v)}`).join(" ");
  }, [data]);

  const last = data[data.length - 1];
  const first = data[0];
  const delta = last - first;
  const up = delta <= 0;

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-baseline justify-between">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">{title}</div>
        <div
          className={
            "text-xs font-medium " + (up ? "text-emerald-600" : "text-rose-600")
          }
        >
          {up ? "▼" : "▲"} {Math.abs(delta)}
          {unit}
        </div>
      </div>

      <div className="mt-1 text-2xl font-semibold leading-none">
        {last}
        <span className="ml-1 text-sm font-normal text-neutral-500">{unit}</span>
      </div>

      <svg viewBox="0 0 240 60" width="100%" height="60" className="mt-2">
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(56,189,248,.35)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </linearGradient>
          <linearGradient id="trendLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke="url(#trendLine)"
          strokeWidth="2.5"
          pathLength="1"
          style={{ animation: "dash 1.2s ease forwards" }}
        />
        <polyline
          points={`0,60 ${points} 240,60`}
          fill="url(#trendFill)"
          opacity=".8"
          style={{ animation: "fade .8s ease forwards" }}
        />
        <style jsx>{`
          @keyframes dash {
            from { stroke-dasharray: 0 1 }
            to   { stroke-dasharray: 1 0 }
          }
          @keyframes fade {
            from { opacity: 0 }
            to   { opacity: .8 }
          }
        `}</style>
      </svg>

      {caption && (
        <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          {caption}
        </div>
      )}
    </div>
  );
}
