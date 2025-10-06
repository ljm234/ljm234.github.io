import { W, predictRisk } from "./model";

function rng(seed){return function(){let t=(seed+=0x6D2B79F5);t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}}

function synthOne(r){
  const freshwater_exposure = r()<0.35?1:0;
  const days_since_exposure = Math.floor(r()*10);                 // 0..9
  const fever = r()<0.65?1:0;
  const headache = r()<0.70?1:0;
  const nuchal_rigidity = r()<0.25?1:0;
  const csf_wbc = Math.floor(r()*800);                            // 0..799
  const csf_protein = Math.floor(40 + r()*160);                   // 40..200
  const csf_glucose = Math.floor(30 + r()*60);                    // 30..90
  const pcr_available = r()<0.45?1:0;
  const microscopy_available = r()<0.55?1:0;

  const x = { freshwater_exposure, days_since_exposure, fever, headache,
    nuchal_rigidity, csf_wbc, csf_protein, csf_glucose, pcr_available, microscopy_available };

  const ztrue =
    (W.intercept+0.2) +
    (W.freshwater_exposure*1.05)*x.freshwater_exposure +
    (W.days_since_exposure*0.9)*x.days_since_exposure +
    (W.fever*1.0)*x.fever + (W.headache*1.0)*x.headache +
    (W.nuchal_rigidity*1.1)*x.nuchal_rigidity +
    (W.csf_wbc*1.0)*x.csf_wbc + (W.csf_protein*0.9)*x.csf_protein +
    (W.csf_glucose*1.1)*x.csf_glucose +
    (W.pcr_available*1.0)*x.pcr_available +
    (W.microscopy_available*1.0)*x.microscopy_available;

  const ptrue = 1/(1+Math.exp(-ztrue));
  const y = (r()<ptrue)?1:0;
  const p = predictRisk(x).p;

  return { x, y, p };
}

export function generateCohort(n=1000, seed=42){
  const r = rng(seed);
  const arr = Array.from({length:n}, ()=>synthOne(r));
  return arr;
}

export function conformalThreshold(calib, alpha=0.1){
  const posScores = calib.filter(d=>d.y===1).map(d=>d.p).sort((a,b)=>a-b);
  if (posScores.length===0) return 1;
  const k = Math.max(0, Math.min(posScores.length-1, Math.ceil(alpha*(posScores.length+1))-1));
  return posScores[k];
}

export function adjustForPrevalence(p, pi_train=0.12, pi_target=0.25){
  const clamp = (v)=>Math.min(0.999, Math.max(0.001, v));
  p = clamp(p); pi_train = clamp(pi_train); pi_target = clamp(pi_target);
  const odds = p/(1-p);
  const priorRatio = (pi_target/(1-pi_target)) / (pi_train/(1-pi_train));
  const oddsAdj = odds * priorRatio;
  return oddsAdj/(1+oddsAdj);
}

export function netBenefit(cohort, t){
  const N = cohort.length;
  let TP=0, FP=0;
  for (const d of cohort){
    const pred = d.p>=t?1:0;
    if (pred===1 && d.y===1) TP++;
    if (pred===1 && d.y===0) FP++;
  }
  const w = t/(1-t);
  return TP/N - FP/N * w;
}

export function recommendThreshold(cohort, step=0.005){
  let bestT=0.5, bestNB=-Infinity;
  for (let t=0.01; t<=0.99; t+=step){
    const nb = netBenefit(cohort, t);
    if (nb>bestNB){bestNB=nb; bestT=t;}
  }
  return { t: Number(bestT.toFixed(3)), nb: Number(bestNB.toFixed(4)) };
}

export function simulatePolicy(cohort, t){
  let TP=0, FP=0, FN=0, TN=0;
  for (const d of cohort){
    const pred = d.p>=t?1:0;
    if (pred===1 && d.y===1) TP++;
    else if (pred===1 && d.y===0) FP++;
    else if (pred===0 && d.y===1) FN++;
    else TN++;
  }
  const N = cohort.length;
  const ppv = TP/(TP+FP||1);
  const npv = TN/(TN+FN||1);
  return {
    N, TP, FP, FN, TN,
    PPV: Number(ppv.toFixed(3)),
    NPV: Number(npv.toFixed(3)),
    Sensitivity: Number((TP/(TP+FN||1)).toFixed(3)),
    Specificity: Number((TN/(TN+FP||1)).toFixed(3))
  };
}

export function calibError(subset){
  if (!subset.length) return 0;
  const meanP = subset.reduce((s,d)=>s+d.p,0)/subset.length;
  const prev = subset.reduce((s,d)=>s+d.y,0)/subset.length;
  return Math.abs(meanP - prev);
}
