export const metadata = {
  title: "Collaborations — Jordan Montenegro",
  description:
    "Let’s team up on clinical ML and microbiology projects with a bias for careful evaluation and fast, useful prototypes.",
};

export default function CollaborationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Collaborations</h1>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl">
          I build AI/ML tools and research software for real workflows. If your team is
          exploring calibrated risk models, simple decision support, or wet-lab
          experiments that pair clean readouts with honest analysis, we’ll get along.
        </p>
      </header>

      {/* What I'm looking for */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What I’m looking for</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Clinical decision support with transparent calibration and decision-curve analysis.",
            "Fast, safe demos on de-identified data with clear scope and guardrails.",
            "Wet-lab studies where the figures are reproducible and the code is tidy.",
            "Projects that need writing help (abstracts, methods, model cards).",
          ].map((t) => (
            <li key={t} className="rounded-2xl border p-4 leading-relaxed">
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Concrete project ideas */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Project ideas</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title="ED triage for suspected PAM (pilot)"
            points={[
              "Retrospective n≈30–50; quick feature audit.",
              "Calibration curve, Brier score, and decision-curve analysis.",
              "Deliverables: brief report, model card, and a small demo UI.",
            ]}
            hint="Focused, 4–6 weeks once data are ready."
          />
          <Card
            title="Montenegro’s Medium: reproducibility note"
            points={[
              "Structured growth dataset with timing and counts.",
              "Simple baselines with uncertainty notes; clear figures for methods.",
              "Open data + open figures bundle (PNG + CSV).",
            ]}
            hint="Good fit for a letter/short communication."
          />
        </div>
      </section>

      {/* Ways of working */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How I work</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Scope first", "Write the 1-pager before we write code."],
            ["Evidence over hype", "Every claim gets a figure. Every figure gets a caption."],
            ["Small, shippable units", "Weekly milestones that stand on their own."],
          ].map(([h, d]) => (
            <div key={h} className="rounded-2xl border p-4">
              <div className="font-medium">{h}</div>
              <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent outcomes */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Recent outcomes</h2>
        <ul className="list-disc ml-5 space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>
            <span className="font-medium">MM growth figures:</span> clean 0–168 h curves,
            batch freshness comparison, and passage timing study with uncertainty bars.
          </li>
          <li>
            <span className="font-medium">Clinical ML demo:</span> small triage UI with
            reliability plot, conformal threshold option, and decision-curve view.
          </li>
        </ul>
      </section>

      {/* Contact CTA */}
      <section className="rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Have an idea that fits?</h3>
          <p className="text-neutral-700 dark:text-neutral-300">
            Send a short note with your question and the smallest useful dataset.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg border px-4 py-2 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          Contact me →
        </a>
      </section>
    </div>
  );
}

function Card({ title, points, hint }) {
  return (
    <article className="rounded-2xl border p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 list-disc ml-5">
        {points.map((p) => (
          <li key={p} className="text-neutral-700 dark:text-neutral-300">
            {p}
          </li>
        ))}
      </ul>
      {hint && (
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{hint}</p>
      )}
    </article>
  );
}
