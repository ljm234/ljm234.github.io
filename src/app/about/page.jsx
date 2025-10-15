export const metadata = {
  title: "About — Jordan Montenegro",
  description:
    "AI/ML research engineer with clinical and microbiology background. Focus: calibrated models, decision-curve utility, and safe clinical tooling.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>

      <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl">
        I’m Jordan Montenegro. I build ML/AI tools and research software that emphasize{" "}
        <span className="font-medium">calibration</span>,{" "}
        <span className="font-medium">decision utility</span>, and{" "}
        <span className="font-medium">safety</span> for real workflows. My background
        spans medical microbiology, clinical settings, and software engineering.
      </p>

      {/* Skills matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Skills matrix</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="ML Foundations">
            <ul className="list-disc pl-5 space-y-1">
              <li>Logistic regression, decision trees, ensembles</li>
              <li>Bias–variance, regularization, early stopping</li>
              <li>Model calibration & decision-curve analysis</li>
              <li>Train/val/test discipline, leakage controls</li>
            </ul>
          </Card>

          <Card title="Deep Learning">
            <ul className="list-disc pl-5 space-y-1">
              <li>Forward/Backward propagation (L-layer networks)</li>
              <li>Vectorized linear/nonlinear blocks</li>
              <li>CNNs & sequence models (RNN/LSTM/attention basics)</li>
              <li>Initialization, normalization, optimizers</li>
            </ul>
          </Card>

          <Card title="Evaluation & Safety">
            <ul className="list-disc pl-5 space-y-1">
              <li>Reliability diagrams, Brier, ECE/MCE</li>
              <li>Prevalence shift & prior-odds correction</li>
              <li>Conformal thresholds (FN ≤ α) & uncertainty</li>
              <li>Readable error budgets & accessibility (a11y)</li>
            </ul>
          </Card>

          <Card title="Software & MLOps">
            <ul className="list-disc pl-5 space-y-1">
              <li>Next.js/Node, Python, SQL; testing & CI (Playwright)</li>
              <li>Containerization (Docker), Vercel, basic AWS/Azure</li>
              <li>Interactive demos (Streamlit/Next + API routes)</li>
              <li>Perf profiling and budgets</li>
            </ul>
          </Card>

          <Card title="Clinical & Data">
            <ul className="list-disc pl-5 space-y-1">
              <li>Triage framing & clinical risk communication</li>
              <li>De-ID workflows, dataset documentation</li>
              <li>Clinical data interpretation (labs, symptoms, history)</li>
              <li>Stanford AI in Healthcare (full specialization)</li>
            </ul>
          </Card>

          <Card title="Wet Lab & Bio">
            <ul className="list-disc pl-5 space-y-1">
              <li>Culture optimization; microscopy</li>
              <li>Western blot, ELISA, SDS-PAGE, flow cytometry</li>
              <li>Assays for ER-stress & mitochondrial dysfunction</li>
              <li>Pathogen work: <em>N. fowleri</em> (ER-stress, media)</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Signals of mastery */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Signals</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium">Deep Learning Specialization (Andrew Ng)</span> — NN theory,
            backprop, CNNs, sequence models, regularization/optimization.
          </li>
          <li>
            <span className="font-medium">Stanford AI in Healthcare Specialization</span> — clinical data,
            evaluation of AI systems, safety and utility in practice.
          </li>
          <li>
            <span className="font-medium">Amoebanator CDS</span> — calibrated triage with conformal safety
            and decision-curve analysis (demo on Playground).
          </li>
          <li>
            <span className="font-medium">Montenegro’s Medium</span> — low-cost culture medium with ≈3–5× growth
            for <em>N. fowleri</em>; ER-stress & mitochondrial assays.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Ethics & Safety</h2>
        <p className="text-neutral-700 dark:text-neutral-300">
          Demos are non-clinical. I document limitations, avoid automation bias, surface uncertainty,
          and show calibration/utility trade-offs. Models use conservative thresholds when appropriate.
        </p>
      </section>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-5">
      <div className="font-semibold mb-3">{title}</div>
      {children}
    </div>
  );
}