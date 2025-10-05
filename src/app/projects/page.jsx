export const metadata = {
  title: "Playground — Amoebanator Triage Demo",
  description: "Interactive clinical ML demo with risk estimate, feature contributions, and model card.",
};

"use client";

import { useState, useMemo } from "react";
import { predictRisk, contributions } from "@/lib/model";
import card from "@/content/data/model_card.json";
import ModelCard from "@/components/ModelCard";

export default function Playground() {
  const [x, setX] = useState({
    freshwater_exposure: 1,
    days_since_exposure: 4,
    fever: 1,
    headache: 1,
    nuchal_rigidity: 0,
    csf_wbc: 200,
    csf_protein: 80,
    csf_glucose: 40,
    pcr_available: 0,
    microscopy_available: 0,
  });

  const out = useMemo(() => predictRisk(x), [x]);
  const parts = useMemo(() => contributions(x), [x]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* LEFT: Inputs */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Amoebanator — Triage Demo</h1>
        <p className="text-sm text-neutral-500">Demo only — not for clinical use.</p>
        <Form x={x} setX={setX} />
      </section>

      {/* RIGHT: Outputs */}
      <section className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-neutral-500">Estimated risk</div>
          <div className="text-4xl font-bold">
            {(out.p * 100).toFixed(1)}%
            <span className="text-base font-normal ml-2">({out.band})</span>
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Simple logistic demo; uncertainty not calibrated to real data.
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="font-semibold mb-2">Top feature contributions</div>
          <ul className="text-sm space-y-1">
            {parts.slice(0, 6).map((p) => (
              <li key={p.feature} className="flex justify-between">
                <span className="capitalize">{p.feature.replaceAll("_", " ")}</span>
                <span className="tabular-nums">{p.contrib.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <ModelCard card={card} />
        </div>
      </section>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Form({ x, setX }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Toggle label="Freshwater exposure" v={x.freshwater_exposure} on={(v) => setX({ ...x, freshwater_exposure: v })} />
      <Number label="Days since exposure" min={0} max={14} step={1} v={x.days_since_exposure} on={(v) => setX({ ...x, days_since_exposure: v })} />
      <Toggle label="Fever" v={x.fever} on={(v) => setX({ ...x, fever: v })} />
      <Toggle label="Headache" v={x.headache} on={(v) => setX({ ...x, headache: v })} />
      <Toggle label="Nuchal rigidity" v={x.nuchal_rigidity} on={(v) => setX({ ...x, nuchal_rigidity: v })} />
      <Number label="CSF WBC (cells/µL)" min={0} max={5000} step={10} v={x.csf_wbc} on={(v) => setX({ ...x, csf_wbc: v })} />
      <Number label="CSF Protein (mg/dL)" min={0} max={1000} step={5} v={x.csf_protein} on={(v) => setX({ ...x, csf_protein: v })} />
      <Number label="CSF Glucose (mg/dL)" min={0} max={200} step={1} v={x.csf_glucose} on={(v) => setX({ ...x, csf_glucose: v })} />
      <Toggle label="PCR available" v={x.pcr_available} on={(v) => setX({ ...x, pcr_available: v })} />
      <Toggle label="Microscopy available" v={x.microscopy_available} on={(v) => setX({ ...x, microscopy_available: v })} />
    </div>
  );
}

function Toggle({ label, v, on }) {
  return (
    <label className="flex items-center justify-between gap-2 rounded border px-3 py-2">
      <span className="text-sm">{label}</span>
      <button
        className={"text-xs rounded px-2 py-1 border " + (v ? "bg-black text-white dark:bg-white dark:text-black" : "")}
        onClick={(e) => {
          e.preventDefault();
          on(v ? 0 : 1);
        }}
        aria-pressed={v === 1}
      >
        {v ? "Yes" : "No"}
      </button>
    </label>
  );
}

function Number({ label, v, on, min, max, step }) {
  return (
    <label className="block rounded border px-3 py-2">
      <div className="text-sm mb-1">{label}</div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => on(Number(e.target.value))} className="w-full" />
      <div className="text-xs text-neutral-500 mt-1">
        Value: <span className="tabular-nums">{v}</span>
      </div>
    </label>
  );
}
