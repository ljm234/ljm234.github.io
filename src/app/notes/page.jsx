export default function Notes(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Engineering Notes</h1>

      <Section title="Architecture">
        <pre className="text-xs overflow-auto rounded bg-neutral-100 dark:bg-neutral-900 p-3">{`
Client (Next.js App Router)
 ├─ UI: Tailwind + shadcn-like primitives (hand-rolled)
 ├─ Charts: Recharts (calibration, PR, decision curve)
 ├─ Playground: browser LR model + Threshold Tuner
 └─ Accessibility: skip-nav, focus, contrast

Server (Vercel)
 ├─ API routes: /api/contact (rate-limited)
 └─ Static assets: downloads, json data

Data & Models
 ├─ Synthetic cohort generator (seeded)
 ├─ Conformal threshold (FN ≤ α)
 ├─ Prevalence shift (prior odds correction)
 └─ Net benefit & policy simulator
        `}</pre>
      </Section>

      <Section title="Design decisions">
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><b>Safety-first demos:</b> no PHI, browser inference, seeded synthetic cohorts.</li>
          <li><b>Clinical legibility:</b> calibration, decision curve, model card, limitations.</li>
          <li><b>Ops maturity:</b> CI (Vitest + Playwright), perf budgets, a11y checks.</li>
          <li><b>Extensibility:</b> API toggles support server inference later.</li>
        </ul>
      </Section>

      <Section title="Future extensions">
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Conformal prediction sets and uncertainty ranges.</li>
          <li>De-identified retrospective pilot (n=30–50) with data card.</li>
          <li>Small tfjs/onnx model for tabular baseline with version tags.</li>
        </ul>
      </Section>
    </div>
  );
}
function Section({title, children}){return(<section><h2 className="text-xl font-semibold mb-2">{title}</h2>{children}</section>);}
