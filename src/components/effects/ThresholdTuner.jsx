// /src/components/ThresholdTuner.jsx
"use client";

import { useMemo, useState } from "react";
import CountUpNumber from "@/components/effects/CountUpNumber";

/**
 * Safety & Threshold — premium UI
 * - Animated donut gauges (Alert rate, PPV)
 * - Confusion matrix with live counts
 * - Operating point slider + tiny ROC sketch
 * - Reduced-motion friendly (CSS transitions only)
 */
export default function ThresholdTuner() {
  const [t, setT] = useState(0.20); // threshold (0..1)

  // Simple toy operating characteristics (keep as your previous demo)
  const N = 500;
  const prev = 0.12;                  // prevalence
  const TPR = clamp(0.95 - 0.50 * t); // sensitivity
  const FPR = clamp(0.40 * (1 - t));  // 1 - specificity

  const P = Math.round(N * prev);
  const Nn = N - P;
  const TP = Math.round(TPR * P);
  const FN = P - TP;
  const FP = Math.round(FPR * Nn);
  const TN = Nn - FP;

  const alertRate = (TP + FP) / N;                 // % predicted positive
  const ppv = (TP + FP) > 0 ? TP / (TP + FP) : 0;  // precision

  const roc = useMemo(() => {
    // Tiny ROC polyline (coarse) just for visual feedback
    const pts = [];
    for (let k = 0; k <= 10; k++) {
      const tk = k / 10;
      const tpr = clamp(0.95 - 0.50 * tk);
      const fpr = clamp(0.40 * (1 - tk));
      pts.push([fpr, tpr]);
    }
    return pts;
  }, []);

  // current operating point on ROC
  const op = { fpr: FPR, tpr: TPR };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[160px,1fr]">
        {/* Donuts column */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          <Donut label="Alert rate" value={alertRate} colorScale="ok" />
          <Donut label="PPV" value={ppv} colorScale="risk" />
        </div>

        {/* Controls + ROC */}
        <div className="rounded-lg border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-medium">Operating threshold</div>
            <div className="text-xs text-neutral-500">
              t = <span className="tabular-nums">{t.toFixed(2)}</span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={t}
            onChange={(e) => setT(parseFloat(e.target.value))}
            className="mt-2 w-full"
            aria-label="Decision threshold"
          />

          {/* tiny ROC sketch */}
          <div className="mt-4">
            <RocMini roc={roc} op={op} />
            <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
              <span>FPR: <span className="tabular-nums">{(FPR * 100).toFixed(1)}%</span></span>
              <span>TPR: <span className="tabular-nums">{(TPR * 100).toFixed(1)}%</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Confusion matrix */}
      <div className="rounded-lg border p-4">
        <div className="text-sm font-semibold">Confusion matrix (N = {N})</div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          <Cell title="TP" value={TP} hint="True Positive" accent="ok" />
          <Cell title="FP" value={FP} hint="False Positive" accent="warn" />
          <Cell title="FN" value={FN} hint="False Negative" accent="risk" />
          <Cell title="TN" value={TN} hint="True Negative" />
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Demo ilustrativa (no clínica). Muestra cómo cambian FP/FN con el umbral.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------- */
/* Donut gauge (animated arc)   */
/* ---------------------------- */
function Donut({ value, label, colorScale = "ok" }) {
  const v = clamp(value);
  const r = 44;
  const c = 2 * Math.PI * r;
  const dash = c * (1 - v);

  const color = pickColor(v, colorScale);
  return (
    <div className="relative flex items-center gap-3 rounded-lg border p-3">
      <div className="h-[96px] w-[96px]">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="12" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={dash}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 420ms cubic-bezier(.22,.61,.36,1)" }}
          />
        </svg>
      </div>
      <div>
        <div className="text-xs text-neutral-500">{label}</div>
        <div className="text-2xl font-semibold tabular-nums">
          <CountUpNumber value={Math.round(v * 100)} />%
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- */
/* Tiny ROC sketch              */
/* ---------------------------- */
function RocMini({ roc, op }) {
  // draw in 0..1 space → 0..120 viewbox
  const path = "M " + roc.map((p) => `${p[0] * 120} ${120 - p[1] * 120}`).join(" L ");
  const x = op.fpr * 120;
  const y = 120 - op.tpr * 120;

  return (
    <svg viewBox="0 0 120 120" className="h-28 w-full rounded-md border bg-neutral-50 dark:bg-neutral-900">
      {/* diagonal */}
      <path d="M 0 120 L 120 0" stroke="rgba(0,0,0,.12)" strokeWidth="1.5" />
      {/* roc line */}
      <path d={path} fill="none" stroke="rgb(59 130 246)" strokeWidth="2.5" />
      {/* operating point */}
      <circle cx={x} cy={y} r="4.5" fill="rgb(59 130 246)" />
    </svg>
  );
}

/* ---------------------------- */
/* Confusion matrix cell        */
/* ---------------------------- */
function Cell({ title, value, hint, accent }) {
  const ring =
    accent === "ok"
      ? "ring-emerald-400/40"
      : accent === "warn"
      ? "ring-amber-400/40"
      : accent === "risk"
      ? "ring-rose-400/40"
      : "ring-neutral-300/30";

  return (
    <div className={`rounded-lg border p-3 ring-1 ${ring}`}>
      <div className="text-xs text-neutral-500">{hint || "\u00A0"}</div>
      <div className="text-lg font-semibold">
        <CountUpNumber value={value} />
      </div>
      <div className="text-xs text-neutral-500">{title}</div>
    </div>
  );
}

/* ---------------------------- */
/* utils                        */
/* ---------------------------- */
function clamp(v, a = 0, b = 1) {
  return Math.max(a, Math.min(b, v));
}
function pickColor(v, scale) {
  // scale "ok": greener as it grows; "risk": redder as it grows
  if (scale === "risk") {
    return v >= 0.66 ? "rgb(239 68 68)" : v >= 0.33 ? "rgb(245 158 11)" : "rgb(16 185 129)";
  }
  // ok scale: low→teal, mid→sky, high→violet
  return v >= 0.66 ? "rgb(139 92 246)" : v >= 0.33 ? "rgb(56 189 248)" : "rgb(20 184 166)";
}
