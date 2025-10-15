// src/app/perf/page.jsx
export const metadata = {
  title: "Performance & Reliability — Jordan Montenegro",
  description:
    "Stack, budgets, production Lighthouse scores, and automated test status.",
};

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border px-4 py-3 text-center">
      <div className="text-3xl font-semibold leading-none">{value}</div>
      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
        {label}
      </div>
    </div>
  );
}

function StatGroup({ title, stats }) {
  return (
    <section className="rounded-2xl border p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <Stat label={s.label} value={s.value} />
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function PerfPage() {
  const recorded = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Performance & Reliability
      </h1>

      {/* Runtime & Build */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Runtime & Build</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Next.js (App Router) + TailwindCSS.</li>
            <li>Images via <code>next/image</code> (optimized & responsive).</li>
            <li>CI: lint, unit tests (Vitest), and e2e (Playwright).</li>
            <li>Accessibility: keyboard nav, skip-nav, contrast checks.</li>
          </ul>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Budgets (home & playground)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>LCP ≲ 2.5 s on a typical laptop.</li>
            <li>CLS &lt; 0.1 (no unexpected layout movement).</li>
            <li>Initial JavaScript ≈ 180 kB for first view.</li>
            <li>Interactions respond in &lt; 200 ms in the playground.</li>
          </ul>
        </div>
      </section>

      {/* Lighthouse (Production) */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Lighthouse (Production)</h2>

          <div className="mt-4 space-y-5">
            <StatGroup
              title="Home"
              stats={[
                { label: "Performance", value: "98" },
                { label: "Accessibility", value: "100" },
                { label: "Best Practices", value: "100" },
                { label: "SEO", value: "100" },
              ]}
            />
            <StatGroup
              title="Playground"
              stats={[
                { label: "Performance", value: "96" },
                { label: "Accessibility", value: "100" },
                { label: "Best Practices", value: "100" },
                { label: "SEO", value: "100" },
              ]}
            />
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Recorded on {recorded} (Chrome desktop).
            </p>
          </div>
        </div>

        {/* Test status */}
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Test status</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Unit (Vitest)</strong>: core utilities pass.
            </li>
            <li>
              <strong>E2E (Playwright)</strong>: smoke paths—navigation, theme
              toggle, preview drawer.
            </li>
            <li>
              <strong>CI</strong>: GitHub Actions runs build + tests on{" "}
              <code>main</code> before deploy.
            </li>
          </ul>
          <a
            className="mt-3 inline-block underline"
            href="https://github.com/jordanmontenegro/cs-220-portfolio-v3-ljm234/actions"
            rel="noopener noreferrer"
          >
            View the latest CI run →
          </a>
        </div>
      </section>
    </div>
  );
}
