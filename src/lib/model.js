export const W = {
  intercept: -3.1,
  freshwater_exposure: 1.9,
  days_since_exposure: 0.04,
  fever: 0.6,
  headache: 0.5,
  nuchal_rigidity: 1.1,
  csf_wbc: 0.003,
  csf_protein: 0.002,
  csf_glucose: -0.01,
  pcr_available: -0.3,
  microscopy_available: -0.2,
};

export function predictRisk(x){
  const z =
    W.intercept +
    W.freshwater_exposure*x.freshwater_exposure +
    W.days_since_exposure*x.days_since_exposure +
    W.fever*x.fever + W.headache*x.headache +
    W.nuchal_rigidity*x.nuchal_rigidity +
    W.csf_wbc*x.csf_wbc + W.csf_protein*x.csf_protein +
    W.csf_glucose*x.csf_glucose +
    W.pcr_available*x.pcr_available +
    W.microscopy_available*x.microscopy_available;
  const p = 1/(1+Math.exp(-z));
  const band = p < 0.08 ? "Low" : p < 0.22 ? "Moderate" : "High";
  return { p, band, z };
}

export function contributions(x){
  // simple per-feature contributions (weight * value)
  return Object.keys(W).filter(k=>k!=="intercept").map(k=>({
    feature: k, value: x[k], contrib: W[k]*x[k]
  })).sort((a,b)=>Math.abs(b.contrib)-Math.abs(a.contrib));
}
