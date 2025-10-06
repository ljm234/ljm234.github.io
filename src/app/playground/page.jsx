"use client";
import { useState, useMemo } from "react";
import { predictRisk, contributions, DEFAULT_INPUT } from "@/lib/model";
import ModelCard from "@/components/ModelCard";
import card from "@/content/data/model_card.json";

export default function Playground(){
  const [x, setX] = useState(DEFAULT_INPUT);

  const out = useMemo(()=>predictRisk(x), [x]);
  const parts = useMemo(()=>contributions(x), [x]);

  const pct = Number.isFinite(out.p) ? (out.p * 100).toFixed(1) + "%" : "—";
  const band = out.band ?? "—";

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Amoebanator — Triage Demo</h1>
        <p className="text-sm text-neutral-500">Demo only — not for clinical use.</p>
        <Form x={x} setX={setX} />
      </section>

      <section className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-neutral-500">Estimated risk</div>
          <div className="text-4xl font-bold">
            {pct} <span className="text-base font-normal ml-2">({band})</span>
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Simple logistic demo; uncertainty not calibrated to real data.
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="font-semibold mb-2">Feature contributions</div>
          <ul className="text-sm space-y-1">
            {parts.slice(0,6).map(p=>(
              <li key={p.feature} className="flex justify-between">
                <span className="capitalize">{p.feature.replaceAll("_"," ")}</span>
                <span className="tabular-nums">{Number.isFinite(p.contrib) ? p.contrib.toFixed(2) : "—"}</span>
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

function Form({x,setX}){
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Toggle label="Freshwater exposure" v={x.freshwater_exposure} on={v=>setX({...x, freshwater_exposure: v})}/>
      <Number label="Days since exposure" min={0} max={14} step={1} v={x.days_since_exposure} on={v=>setX({...x, days_since_exposure: v})}/>
      <Toggle label="Fever" v={x.fever} on={v=>setX({...x, fever: v})}/>
      <Toggle label="Headache" v={x.headache} on={v=>setX({...x, headache: v})}/>
      <Toggle label="Nuchal rigidity" v={x.nuchal_rigidity} on={v=>setX({...x, nuchal_rigidity: v})}/>
      <Number label="CSF WBC (cells/µL)" min={0} max={5000} step={10} v={x.csf_wbc} on={v=>setX({...x, csf_wbc: v})}/>
      <Number label="CSF Protein (mg/dL)" min={0} max={1000} step={5} v={x.csf_protein} on={v=>setX({...x, csf_protein: v})}/>
      <Number label="CSF Glucose (mg/dL)" min={0} max={200} step={1} v={x.csf_glucose} on={v=>setX({...x, csf_glucose: v})}/>
      <Toggle label="PCR available" v={x.pcr_available} on={v=>setX({...x, pcr_available: v})}/>
      <Toggle label="Microscopy available" v={x.microscopy_available} on={v=>setX({...x, microscopy_available: v})}/>
    </div>
  );
}

function Toggle({label,v,on}){
  return (
    <label className="flex items-center justify-between gap-2 rounded border px-3 py-2">
      <span className="text-sm">{label}</span>
      <button
        className={"text-xs rounded px-2 py-1 border " + (v? "bg-black text-white dark:bg-white dark:text-black":"")}
        onClick={(e)=>{e.preventDefault(); on(v===1?0:1);}}
        aria-pressed={v===1}
      >{v? "Yes":"No"}</button>
    </label>
  );
}

function Number({label,v,on,min,max,step}){
  function handle(e){
    const n = Number(e.target.value);
    on(Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min);
  }
  return (
    <label className="block rounded border px-3 py-2">
      <div className="text-sm mb-1">{label}</div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={handle} className="w-full" />
      <div className="text-xs text-neutral-500 mt-1">Value: <span className="tabular-nums">{v}</span></div>
    </label>
  );
}
