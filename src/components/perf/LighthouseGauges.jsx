// src/components/perf/LighthouseGauges.jsx
"use client";

import Gauge from "./Gauge";

export default function LighthouseGauges({ scores = [] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {scores.map((s) => (
        <div key={s.label} className="rounded-2xl border p-3">
          <Gauge value={s.value} label={s.label} />
        </div>
      ))}
    </div>
  );
}
