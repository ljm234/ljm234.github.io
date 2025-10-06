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

export const DEFAULT_INPUT = {
  freshwater_exposure: 0,
  days_since_exposure: 0,
  fever: 0,
  headache: 0,
  nuchal_rigidity: 0,
  csf_wbc: 0,
  csf_protein: 0,
  csf_glucose: 70,
  pcr_available: 0,
  microscopy_available: 0,
};

function clamp(n, min, max) {
  const v = Number(n);
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function bin(v) {
  return Number(v) === 1 ? 1 : 0;
}

export function sanitizeFeatures(x = {}) {
  const s = { ...DEFAULT_INPUT, ...(x || {}) };

  s.freshwater_exposure = bin(s.freshwater_exposure);
  s.fever = bin(s.fever);
  s.headache = bin(s.headache);
  s.nuchal_rigidity = bin(s.nuchal_rigidity);
  s.pcr_available = bin(s.pcr_available);
  s.microscopy_available = bin(s.microscopy_available);

  s.days_since_exposure = clamp(s.days_since_exposure, 0, 14);
  s.csf_wbc = clamp(s.csf_wbc, 0, 5000);
  s.csf_protein = clamp(s.csf_protein, 0, 1000);
  s.csf_glucose = clamp(s.csf_glucose, 0, 200);

  return s;
}

export function predictRisk(x) {
  const s = sanitizeFeatures(x);

  let z =
    W.intercept +
    W.freshwater_exposure * s.freshwater_exposure +
    W.days_since_exposure * s.days_since_exposure +
    W.fever * s.fever +
    W.headache * s.headache +
    W.nuchal_rigidity * s.nuchal_rigidity +
    W.csf_wbc * s.csf_wbc +
    W.csf_protein * s.csf_protein +
    W.csf_glucose * s.csf_glucose +
    W.pcr_available * s.pcr_available +
    W.microscopy_available * s.microscopy_available;

  if (!Number.isFinite(z)) {
    // Last-resort safety: never return NaN
    return { p: 0, band: "Low", z: 0, input: s };
  }
  const p = 1 / (1 + Math.exp(-z));
  const band = p < 0.08 ? "Low" : p < 0.22 ? "Moderate" : "High";
  return { p, band, z, input: s };
}

export function contributions(x) {
  const s = sanitizeFeatures(x);
  return Object.keys(W)
    .filter((k) => k !== "intercept")
    .map((k) => ({
      feature: k,
      value: s[k],
      contrib: W[k] * s[k],
    }))
    .sort((a, b) => Math.abs(b.contrib) - Math.abs(a.contrib));
}
