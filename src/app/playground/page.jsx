// /src/app/playground/page.jsx
"use client";

import { useState, useMemo } from "react";
import { predictRisk, contributions, DEFAULT_INPUT } from "@/lib/model";
import ModelCard from "@/components/ModelCard";
import card from "@/content/data/model_card.json";

// effects (note: these live under components/effects in your tree)
import ThresholdTuner from "@/components/effects/ThresholdTuner";
import ReliabilityTable from "@/components/effects/ReliabilityTable";
import HoverLift from "@/components/effects/HoverLift";
import Reveal from "@/components/effects/Reveal";
import TopProgress from "@/components/effects/TopProgress";

export default function Playground() {
  const [x, setX] = useState(DEFAULT_INPUT);

  const out = useMemo(() => predictRisk(x), [x]);
  const parts = useMemo(() => contributions(x), [x]);

  const p = Number.isFinite(out.p) ? Math.max(0, Math.min(1, out.p)) : 0;
  const pct = Number.isFinite(out.p) ? (p * 100).toFixed(1) + "%" : "—";
  const band = out.band ?? "—";

  const reset = () => setX(DEFAULT_INPUT);

  return (
    <>
      {/* animated top progress for long pages */}
      <TopProgress />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT: inputs */}
        <section className="space-y-4">
          <Reveal effect="fade-up">
            <h1 className="text-3xl font-bold tracking-tight">
              Amoebanator — Triage Demo
            </h1>
          </Reveal>
          <p className="text-sm text-neutral-500">
            Demo only — not for clinical use.
          </p>

          <Form x={x} setX={setX} />

          <div className="flex gap-2 pt-1">
            <button onClick={reset} className="rounded-md border px-3 py-1.5 text-sm">
              Reset
            </button>
          </div>
        </section>

        {/* RIGHT: outputs */}
        <section className="space-y-4">
          <HoverLift>
            <div className="rounded-lg border p-4 lg:sticky lg:top-4">
              <div className="text-sm text-neutral-500">Estimated risk</div>

              <div className="mt-3 grid grid-cols-[120px,1fr] items-center gap-4">
                <RiskGauge p={p} band={band} />
                <div aria-live="polite">
                  <div className="text-4xl font-bold tabular-nums">{pct}</div>
                  <div className="mt-1 text-sm">
                    Band: <span className="font-medium">{band}</span>
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    Simple logistic demo; uncertainty not calibrated to real data.
                  </div>
                </div>
              </div>
            </div>
          </HoverLift>

          <HoverLift>
            <div className="rounded-lg border p-4">
              <div className="mb-2 font-semibold">Feature contributions</div>
              <ContribBars parts={parts.slice(0, 6)} />
            </div>
          </HoverLift>

          <HoverLift>
            <div className="rounded-lg border p-4">
              <ModelCard card={card} />
            </div>
          </HoverLift>
        </section>

        {/* Safety & decision tooling (full width) */}
        <section className="space-y-4 lg:col-span-2">
          <HoverLift>
            <div className="rounded-lg border p-4">
              {/* has its own subtle animations internally */}
              <ThresholdTuner />
            </div>
          </HoverLift>

          <HoverLift>
            <div className="rounded-lg border p-4">
              {/* stretch to full card width; keep overflow safe on small screens */}
              <div className="w-full overflow-x-auto">
                <ReliabilityTable />
              </div>
            </div>
          </HoverLift>
        </section>
      </div>
    </>
  );
}

/* ------------------------ */
/* Inputs                   */
/* ------------------------ */

function Form({ x, setX }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Toggle
        label="Freshwater exposure"
        v={x.freshwater_exposure}
        on={(v) => setX({ ...x, freshwater_exposure: v })}
      />
      <NumberInput
        label="Days since exposure"
        min={0}
        max={14}
        step={1}
        v={x.days_since_exposure}
        on={(v) => setX({ ...x, days_since_exposure: v })}
      />
      <Toggle label="Fever" v={x.fever} on={(v) => setX({ ...x, fever: v })} />
      <Toggle label="Headache" v={x.headache} on={(v) => setX({ ...x, headache: v })} />
      <Toggle
        label="Nuchal rigidity"
        v={x.nuchal_rigidity}
        on={(v) => setX({ ...x, nuchal_rigidity: v })}
      />
      <NumberInput
        label="CSF WBC (cells/µL)"
        min={0}
        max={5000}
        step={10}
        v={x.csf_wbc}
        on={(v) => setX({ ...x, csf_wbc: v })}
      />
      <NumberInput
        label="CSF Protein (mg/dL)"
        min={0}
        max={1000}
        step={5}
        v={x.csf_protein}
        on={(v) => setX({ ...x, csf_protein: v })}
      />
      <NumberInput
        label="CSF Glucose (mg/dL)"
        min={0}
        max={200}
        step={1}
        v={x.csf_glucose}
        on={(v) => setX({ ...x, csf_glucose: v })}
      />
      <Toggle
        label="PCR available"
        v={x.pcr_available}
        on={(v) => setX({ ...x, pcr_available: v })}
      />
      <Toggle
        label="Microscopy available"
        v={x.microscopy_available}
        on={(v) => setX({ ...x, microscopy_available: v })}
      />
    </div>
  );
}

function Toggle({ label, v, on }) {
  const pressed = v === 1;
  return (
    <label className="flex items-center justify-between gap-2 rounded border px-3 py-2">
      <span className="text-sm">{label}</span>
      <button
        className={
          "text-xs rounded px-2 py-1 border transition-colors " +
          (pressed ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-neutral-50")
        }
        onClick={(e) => {
          e.preventDefault();
          on(pressed ? 0 : 1);
        }}
        aria-pressed={pressed}
      >
        {pressed ? "Yes" : "No"}
      </button>
    </label>
  );
}

function NumberInput({ label, v, on, min, max, step }) {
  function handle(e) {
    const n = Number(e.target.value);
    on(Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min);
  }
  return (
    <label className="block rounded border px-3 py-2">
      <div className="mb-1 text-sm">{label}</div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={handle} className="w-full" />
      <div className="mt-1 text-xs text-neutral-500">
        Value: <span className="tabular-nums">{v}</span>
      </div>
    </label>
  );
}

/* ------------------------ */
/* Risk gauge (donut)       */
/* ------------------------ */

function RiskGauge({ p, band }) {
  const r = 48;
  const c = 2 * Math.PI * r;
  const strokeDashoffset = c * (1 - p);
  const color = p >= 0.66 ? "rgb(239 68 68)" : p >= 0.33 ? "rgb(245 158 11)" : "rgb(16 185 129)";

  return (
    <div className="relative h-[120px] w-[120px]">
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
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 420ms cubic-bezier(.22,.61,.36,1)" }}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-md bg-white/70 px-2 py-1 text-xs backdrop-blur dark:bg-neutral-900/60">
          {band}
        </div>
      </div>
    </div>
  );
}

/* ------------------------ */
/* Contribution bars        */
/* ------------------------ */

function ContribBars({ parts }) {
  const maxAbs = Math.max(0.0001, ...parts.map((p) => Math.abs(p.contrib || 0)));
  return (
    <ul className="space-y-2">
      {parts.map((p) => {
        const v = Number.isFinite(p.contrib) ? p.contrib : 0;
        const w = Math.min(100, Math.round((Math.abs(v) / maxAbs) * 100));
        const pos = v >= 0;
        const barColor = pos ? "bg-emerald-500/80" : "bg-rose-500/80";
        const sign = pos ? "↑" : "↓";
        return (
          <li key={p.feature}>
            <div className="flex items-center justify-between text-sm">
              <span className="capitalize">{p.feature.replaceAll("_", " ")}</span>
              <span className="tabular-nums text-neutral-600 dark:text-neutral-300">
                {Number.isFinite(p.contrib) ? p.contrib.toFixed(2) : "—"} {sign}
              </span>
            </div>
            <div className="mt-1 h-2.5 w-full rounded bg-neutral-100 dark:bg-neutral-900">
              <div
                className={`h-2.5 rounded ${barColor}`}
                style={{ width: `${w}%`, transition: "width 360ms ease" }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}