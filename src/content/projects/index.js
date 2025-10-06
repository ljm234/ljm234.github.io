export const projects = [
  {
    slug: "amoebanator",
    title: "Amoebanator: Early PAM Triage CDS",
    tags: ["Clinical ML", "CDS", "Calibration"],
    summary: "Risk model with calibration, decision curve, and explainability.",
    sections: {
      abstract: "We developed a triage model for suspected PAM...",
      methods: "Features: freshwater exposure, days since exposure, fever, headache...",
      results: "Calibration within ±0.05 across bins; AUROC≈0.86 (synthetic demo).",
      limits: "Synthetic cohort; no external validation; prospective study planned.",
      ethics: "Demo only; risk of automation bias; uses model card and uncertainty."
    }
  },
  {
    slug: "montenegro-medium",
    title: "Montenegro’s Medium",
    tags: ["Wet Lab", "Optimization"],
    summary: "Low-cost medium achieving 3–5× growth vs legacy formulas.",
    sections: {
      abstract: "We developed an optimized medium for N. fowleri culture.",
      methods: "Comparative growth assays, counting schedule, sterile workflow.",
      results: "Growth improvement observed across intervals (I will add it soon)",
      limits: "Shelf-life only for two weeks for better results.",
      ethics: "Open, low-cost access; no antibiotics; safety guidelines followed."
    }
  },
  {
    slug: "er-stress",
    title: "ER-Stress and Mitochondrial Dysfunction in N. fowleri",
    tags: ["Wet Lab", "Mechanism"],
    summary: "Drug perturbations and JC-1 readouts to study mitochondrial stress.",
    sections: {
      abstract: "We examined ER-stress agents and mitochondrial responses. (I will add it later)",
      methods: "Tunicamycin, thapsigargin, brefeldin A, metformin; JC-1; timepoints...",
      results: "Distinct response profiles and viability patterns...",
      limits: "Dose-response granularity pending.",
      ethics: "Standard lab safety; transparent reporting."
    }
  }
];
