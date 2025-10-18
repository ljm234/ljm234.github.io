// src/components/perf/VitalsLive.jsx
"use client";

import { useEffect, useState } from "react";

function Card({ title, value, unit, hint }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm text-neutral-500 dark:text-neutral-400">{title}</div>
      <div className="mt-1 text-3xl font-semibold leading-none">
        {value}
        <span className="ml-1 text-base font-normal text-neutral-500">{unit}</span>
      </div>
      {hint && <div className="mt-1 text-xs text-neutral-500">{hint}</div>}
    </div>
  );
}

export default function VitalsLive() {
  const [lcp, setLcp] = useState(null);
  const [cls, setCls] = useState(0);
  const [fid, setFid] = useState(null);

  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

    // LCP
    try {
      const po = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) setLcp(Math.round(last.startTime));
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
      const end = () => po.disconnect();
      window.addEventListener("pagehide", end);
      return () => {
        po.disconnect();
        window.removeEventListener("pagehide", end);
      };
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

    // CLS
    try {
      let value = 0;
      const po = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (!e.hadRecentInput) value += e.value;
        }
        setCls(Number(value.toFixed(3)));
      });
      po.observe({ type: "layout-shift", buffered: true });
      return () => po.disconnect();
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

    // FID
    try {
      const po = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          setFid(Math.round(e.processingStart - e.startTime));
        }
      });
      po.observe({ type: "first-input", buffered: true });
      return () => po.disconnect();
    } catch {}
  }, []);

  return (
    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
      <Card title="LCP" value={lcp ?? "—"} unit="ms" hint="Largest Contentful Paint" />
      <Card title="CLS" value={cls} unit="" hint="Cumulative Layout Shift" />
      <Card title="FID" value={fid ?? "—"} unit="ms" hint="First Input Delay" />
      {/* keep three “spacers” so the grid stays symmetric on wide screens */}
      <div className="hidden sm:block rounded-2xl border p-4 opacity-0" />
      <div className="hidden sm:block rounded-2xl border p-4 opacity-0" />
      <div className="hidden sm:block rounded-2xl border p-4 opacity-0" />
    </div>
  );
}
