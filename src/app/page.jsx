// src/app/page.jsx
export const metadata = {
  title: "Jordan Montenegro — AI/ML Products & Clinical ML",
  description:
    "I build honest, shippable tools: AI/ML products with real users and Clinical ML with calibrated risk and clear figures.",
};

export default function Home() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 space-y-10">
      {/* soft backdrop */}
      <div className="pointer-events-none absolute -inset-x-10 -top-10 -z-10 h-[38rem] rounded-b-[3rem] bg-gradient-to-b from-sky-50 via-emerald-50 to-transparent dark:from-neutral-900/50 dark:via-neutral-900/40" />

      {/* HERO (Playwright needs this test id) */}
      <header className="overflow-hidden rounded-3xl border p-6 md:p-10">
        <h1
          data-testid="hero-title"
          className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Building useful AI/ML products and careful Clinical ML
          </span>
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-700 dark:text-neutral-300">
          I ship fast, readable software and honest analysis: calibrated risk,
          decision curves, reproducible figures—plus UI that people actually
          use.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/playground"
            className="inline-flex items-center rounded-xl bg-black px-4 py-2 font-medium text-white shadow-sm hover:-translate-y-[1px] hover:shadow dark:bg-white dark:text-black"
          >
            Explore the playground →
          </a>
          <a
            href="/research"
            className="inline-flex items-center rounded-xl border px-4 py-2 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            See research highlights
          </a>
        </div>
      </header>

      {/* QUICK PITCH */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">AI/ML products</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
            <li>Clean UX, measurable lift, observability from day one.</li>
            <li>Small weekly milestones; ship value without drama.</li>
            <li>Docs-first approach: the next dev won’t hate you.</li>
          </ul>
        </article>
        <article className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Clinical ML</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
            <li>Calibrated risk, reliability plots, decision-curve thresholds.</li>
            <li>Transparent methods and tidy, reproducible figures.</li>
            <li>Scoped pilots that are honest about uncertainty.</li>
          </ul>
        </article>
      </section>

      {/* LINKS ROW */}
      <section className="grid gap-6 md:grid-cols-3">
        <a
          href="/collaborations"
          className="block rounded-2xl border p-6 transition hover:-translate-y-[1px] hover:shadow-sm"
        >
          <div className="text-lg font-semibold">Collaborations</div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Scope-first projects that ship and stand up to scrutiny.
          </p>
        </a>
        <a
          href="/publications"
          className="block rounded-2xl border p-6 transition hover:-translate-y-[1px] hover:shadow-sm"
        >
          <div className="text-lg font-semibold">Publications</div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Preprints, figures, and reproducible notes.
          </p>
        </a>
        <a
          href="/perf"
          className="block rounded-2xl border p-6 transition hover:-translate-y-[1px] hover:shadow-sm"
        >
          <div className="text-lg font-semibold">Performance & Reliability</div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Budgets, Lighthouse scores, and live vitals.
          </p>
        </a>
      </section>
    </div>
  );
}
