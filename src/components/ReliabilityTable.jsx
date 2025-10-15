"use client";
import { useMemo } from "react";
import { generateCohort, calibError } from "@/lib/conformal";

export default function ReliabilityTable(){
  const cohort = useMemo(()=>generateCohort(800, 7), []);
  const groups = [
    { k:"PCR=0,Micro=0", f:(d)=>d.x.pcr_available===0 && d.x.microscopy_available===0 },
    { k:"PCR=1,Micro=0", f:(d)=>d.x.pcr_available===1 && d.x.microscopy_available===0 },
    { k:"PCR=0,Micro=1", f:(d)=>d.x.pcr_available===0 && d.x.microscopy_available===1 },
    { k:"PCR=1,Micro=1", f:(d)=>d.x.pcr_available===1 && d.x.microscopy_available===1 },
  ];
  const rows = groups.map(g=>{
    const subset = cohort.filter(g.f);
    return { label: g.k, n: subset.length, err: Number(calibError(subset).toFixed(3)) };
  });
  return (
    <div className="rounded border p-4">
      <div className="font-semibold mb-2">Reliability by diagnostic availability</div>
      <table className="w-full text-sm">
        <thead><tr className="text-left"><th>Group</th><th>N</th><th>Calib |mean(p)-prev|</th></tr></thead>
        <tbody>
          {rows.map(r=>{
            const bg = r.err<0.03 ? "bg-green-200/40"
                    : r.err<0.07 ? "bg-yellow-200/40"
                    : "bg-red-200/40";
            return (
              <tr key={r.label} className={bg}>
                <td className="py-1 px-2">{r.label}</td>
                <td className="py-1 px-2 tabular-nums">{r.n}</td>
                <td className="py-1 px-2 tabular-nums">{r.err}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-xs text-neutral-500 mt-2">Lower is better. This stresses calibration under missing modalities.</p>
    </div>
  );
}
