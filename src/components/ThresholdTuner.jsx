"use client";
import { useMemo, useState } from "react";
import {
  generateCohort, conformalThreshold, adjustForPrevalence,
  recommendThreshold, simulatePolicy, netBenefit
} from "@/lib/conformal";

export default function ThresholdTuner(){
  const [alpha, setAlpha] = useState(0.10);
  const [pi, setPi] = useState(0.12);
  const [piTgt, setPiTgt] = useState(0.20);
  const [n, setN] = useState(1000);
  const [seed, setSeed] = useState(42);

  const cohortRaw = useMemo(()=>generateCohort(n, seed), [n, seed]);
  const cohortAdj = useMemo(()=>cohortRaw.map(d=>({ ...d, p: adjustForPrevalence(d.p, pi, piTgt) })), [cohortRaw, pi, piTgt]);

  const tConf = useMemo(()=>conformalThreshold(cohortAdj, alpha), [cohortAdj, alpha]);
  const rec = useMemo(()=>recommendThreshold(cohortAdj), [cohortAdj]);

  const simConf = useMemo(()=>simulatePolicy(cohortAdj, tConf), [cohortAdj, tConf]);
  const simRec  = useMemo(()=>simulatePolicy(cohortAdj, rec.t), [cohortAdj, rec.t]);

  // For display
  const nbConf = useMemo(()=>netBenefit(cohortAdj, tConf).toFixed(4), [cohortAdj, tConf]);
  const nbRec  = useMemo(()=>netBenefit(cohortAdj, rec.t).toFixed(4), [cohortAdj, rec.t]);

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="font-semibold">Safety & Thresholds</div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <LabeledSlider label={`Max miss rate α = ${alpha.toFixed(2)}`} min={0.01} max={0.30} step={0.01}
          value={alpha} onChange={setAlpha} />
        <LabeledSlider label={`Target prevalence = ${(piTgt*100).toFixed(0)}%`} min={0.02} max={0.40} step={0.01}
          value={piTgt} onChange={setPiTgt} />
        <LabeledInput  label="Training prevalence (π_train)" value={pi} onChange={setPi} step={0.01}/>
        <LabeledInput  label="Cohort size" value={n} onChange={setN} step={100}/>
        <LabeledInput  label="Seed" value={seed} onChange={setSeed} step={1}/>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <Card title={`Conformal threshold (FN ≤ α)`}>
          <p>t = <b>{tConf.toFixed(3)}</b>  •  Net Benefit = <b>{nbConf}</b></p>
          <Matrix m={simConf}/>
        </Card>
        <Card title="Recommended threshold (max NB)">
          <p>t* = <b>{rec.t.toFixed(3)}</b>  •  Net Benefit* = <b>{nbRec}</b></p>
          <Matrix m={simRec}/>
        </Card>
      </div>

      <p className="text-xs text-neutral-500">
        Notes: Conformal t ensures the empirical false-negative rate ≤ α on the calibration cohort.
        Prevalence shift uses prior-odds correction. Net benefit per Vickers & Elkin.
      </p>
    </div>
  );
}

function LabeledSlider({label, value, onChange, min, max, step}){
  return (
    <label className="block rounded border px-3 py-2">
      <div className="mb-1">{label}</div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e=>onChange(Number(e.target.value))} className="w-full"/>
    </label>
  );
}
function LabeledInput({label, value, onChange, step=0.01}){
  return (
    <label className="block rounded border px-3 py-2">
      <div className="mb-1">{label}</div>
      <input type="number" step={step} value={value}
        onChange={e=>onChange(Number(e.target.value))} className="w-full bg-transparent outline-none"/>
    </label>
  );
}
function Card({title, children}){
  return <div className="rounded border p-3"><div className="font-medium mb-2">{title}</div>{children}</div>;
}
function Matrix({m}){
  const Row = ({k,v})=>(
    <div className="flex justify-between"><span className="text-neutral-500">{k}</span><span className="tabular-nums">{v}</span></div>
  );
  return (
    <div className="grid grid-cols-2 gap-3 mt-2">
      <div>
        <Row k="TP" v={m.TP}/><Row k="FP" v={m.FP}/><Row k="FN" v={m.FN}/><Row k="TN" v={m.TN}/>
      </div>
      <div>
        <Row k="PPV" v={m.PPV}/><Row k="NPV" v={m.NPV}/>
        <Row k="Sens" v={m.Sensitivity}/><Row k="Spec" v={m.Specificity}/>
      </div>
    </div>
  );
}
