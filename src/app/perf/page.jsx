export const metadata = {
  title: "Performance & Reliability — Jordan Montenegro",
  description:
    "Runtime choices, budgets, testing, and the kind of evidence I keep for production hygiene.",
};

export default function PerfPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Performance & Reliability</h1>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl">
          Small apps should feel quick and predictable. Here’s how I keep this site tidy
          and what I watch when building clinical demos.
        </p>
      </header>

      {/* Runtime & Build */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Runtime & Build">
          <List
            items={[
              "Next.js (App Router) + TailwindCSS.",
              "Images through next/image (optimized, responsive).",
              "CI runs lint, unit tests (Vitest), and e2e (Playwright).",
              "Accessibility checks: keyboard nav, skip-nav, and contrast.",
            ]}
          />
        </Card>

        <Card title="Budgets (home & playground)">
          <List
            items={[
              "Largest Contentful Paint under ~2.5 s on a typical laptop.",
              "Cumulative Layout Shift under 0.1.",
              "Initial JavaScript around 180 kB for the first view.",
              "Interactions respond in under 200 ms in the playground.",
            ]}
          />
        </Card>
      </section>

      {/* Lighthouse snapshot */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Lighthouse (production)">
          <DL
            groups={[
              {
                label: "Home",
                rows: [
                  ["Performance", "98"],
                  ["Accessibility", "100"],
                  ["Best Practices", "100"],
                  ["SEO", "100"],
                ],
              },
              {
                label: "Playground",
                rows: [
                  ["Performance", "96"],
                  ["Accessibility", "100"],
                  ["Best Practices", "100"],
                  ["SEO", "100"],
                ],
              },
            ]}
            footnote="Recorded on 2025-10-15 (Chrome desktop)."
          />
        </Card>

        <Card title="Test status">
          <List
            items={[
              "Unit (Vitest): core utilities pass.",
              "E2E (Playwright): smoke paths—navigation, theme toggle, preview drawer.",
              "GitHub Actions: build + tests green on main before deploy.",
            ]}
          />
          <div className="mt-4">
            <a
              href="https://github.com"
              className="underline text-sm"
              rel="noopener noreferrer"
              target="_blank"
            >
              View the latest CI run →
            </a>
          </div>
        </Card>
      </section>

      {/* Notes to future self */}
      <section>
        <Card title="Notes">
          <List
            items={[
              "Prefer readable code and small components over clever abstractions.",
              "If a chart or figure can’t be explained in two sentences, rewrite it.",
              "Ship fewer features with better calibration and clearer limits.",
            ]}
          />
        </Card>
      </section>
    </div>
  );
}

/* ————— Helpers ————— */

function Card({ title, children }) {
  return (
    <section className="rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          {t}
        </li>
      ))}
    </ul>
  );
}

function DL({ groups, footnote }) {
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g.label}>
          <div className="font-medium mb-2">{g.label}</div>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1">
            {g.rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded border px-3 py-2">
                <dt className="text-sm text-neutral-600 dark:text-neutral-400">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      {footnote && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{footnote}</p>
      )}
    </div>
  );
}
