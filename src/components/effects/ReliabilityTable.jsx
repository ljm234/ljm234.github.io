// /src/components/ReliabilityTable.jsx
"use client";

import { useMemo } from "react";

/**
 * Reliability by diagnostic availability
 * - Fills the whole box (responsive)
 * - Two full-width mini calibration charts: PCR and Microscopy
 * - 10 bins with expected vs observed (synthetic demo)
 */
export default function ReliabilityTable() {
  const binsPCR = useMemo(() => makeCalib(10, 0.06, 0.10), []);
  const binsMIC = useMemo(() => makeCalib(10, 0.03, 0.07), []);

  return (
    <div className="w-full">
      <div className="text-sm font-semibold">Reliability by diagnostic availability</div>
      <p className="mt-1 text-xs text-neutral-500">
        Binned calibration (expected vs. observed). Demo ilustrativa.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <CalibCard title="PCR disponible" bins={binsPCR} />
        <CalibCard title="Microscopía disponible" bins={binsMIC} />
      </div>
    </div>
  );
}

function CalibCard({ title, bins }) {
  const pathExp =
    "M " +
    bins
      .map((b) => `${b.x * 100} ${100 - b.x * 100}`)
      .join(" L ");
  const pathObs =
    "M " +
    bins
      .map((b) => `${b.x * 100} ${100 - b.y * 100}`)
      .join(" L ");

  return (
    <div className="rounded-lg border p-3">
      <div className="text-sm font-medium">{title}</div>
      <svg viewBox="0 0 100 100" className="mt-2 h-44 w-full rounded-md border bg-neutral-50 dark:bg-neutral-900">
        {/* axes */}
        <path d="M 0 100 L 100 0" stroke="rgba(0,0,0,.12)" strokeWidth="1" />
        {/* expected (perfect) */}
        <path d={pathExp} fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
        {/* observed */}
        <path
          d={pathObs}
          fill="none"
          stroke="rgb(99 102 241)"
          strokeWidth="2.25"
          style={{ transition: "d 400ms cubic-bezier(.22,.61,.36,1)" }}
        />
        {/* points */}
        {bins.map((b, i) => (
          <circle key={i} cx={b.x * 100} cy={100 - b.y * 100} r="1.7" fill="rgb(99 102 241)" />
        ))}
      </svg>

      {/* table under chart (full width, responsive) */}
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
        <div className="text-neutral-500">Bin</div>
        <div className="text-neutral-500">Esperado</div>
        <div className="text-neutral-500">Observado</div>
        {bins.map((b, i) => (
          <FragmentRow key={i} i={i} x={b.x} y={b.y} />
        ))}
      </div>
    </div>
  );
}

function FragmentRow({ i, x, y }) {
  return (
    <>
      <div className="tabular-nums">{i + 1}</div>
      <div className="tabular-nums">{(x * 100).toFixed(0)}%</div>
      <div className="tabular-nums">{(y * 100).toFixed(0)}%</div>
    </>
  );
}

/* ---------------------------- */
/* demo calibration generator   */
/* ---------------------------- */
function makeCalib(n, wobbleLow = 0.04, wobbleHigh = 0.08) {
  const bins = [];
  for (let i = 0; i < n; i++) {
    const x = (i + 0.5) / n; // expected
    const w = lerp(wobbleLow, wobbleHigh, i / (n - 1 || 1));
    // observed deviates a bit: under-confident at low, over-confident mid, recovers high
    const y = clamp(x + (Math.sin(i * 0.7) * w - 0.5 * w));
    bins.push({ x, y });
  }
  return bins;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp(v, a = 0, b = 1) {
  return Math.max(a, Math.min(b, v));
}
