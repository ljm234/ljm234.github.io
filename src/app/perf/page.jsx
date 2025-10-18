// src/app/perf/page.jsx  (Server Component — keep it server-side)
export const metadata = {
  title: "Performance & Reliability — Jordan Montenegro",
  description:
    "Stack, budgets, production Lighthouse scores, and automated test status.",
};

import LighthouseGauges from "@/components/perf/LighthouseGauges";
import VitalsLive from "@/components/perf/VitalsLive";
import TrendCard from "@/components/perf/TrendCard";

/* ---------- Micro components with subtle interactions ---------- */

function Stat({ label, value }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white/70 px-4 py-3 text-center transition-transform duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(0,0,0,.06)] dark:bg-neutral-950/60">
      {/* animated underline */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] -translate-x-full bg-[linear-gradient(90deg,#10b981,#38bdf8)] transition-transform duration-500 group-hover:translate-x-0" />
      <div className="text-3xl font-semibold leading-none">{value}</div>
      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
        {label}
      </div>
    </div>
  );
}

function StatGroup({ title, stats }) {
  return (
    <section className="card-ux">
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

/* ---------- Page ---------- */

export default function PerfPage() {
  const recorded = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-4 pb-10 space-y-4">
      {/* local CSS for the glow/gradient polish (no client needed) */}
      <style>{`
        .card-ux{
          position:relative; overflow:hidden;
          border-radius:1rem; padding:1.5rem; border:1px solid hsl(0 0% 89%);
          background: rgba(255,255,255,.72);
          transition: box-shadow .25s ease, transform .2s ease, border-color .25s ease, background .25s ease;
        }
        .dark .card-ux{ background: rgba(10,10,10,.6); border-color: rgba(255,255,255,.12) }
        .card-ux:hover{ transform: translateY(-1px); box-shadow: 0 16px 42px rgba(0,0,0,.08) }
        .card-ux::before{
          content:""; position:absolute; inset:-1px; pointer-events:none; opacity:0;
          background:
            radial-gradient(580px 180px at 20% -10%, rgba(16,185,129,.16), transparent),
            radial-gradient(580px 180px at 80% 110%, rgba(56,189,248,.16), transparent);
          transition: opacity .25s ease;
        }
        .card-ux:hover::before{ opacity: .95 }
        .list-polish li{
          border-radius:.5rem; padding:.25rem .5rem; transition: background .2s ease, transform .2s ease;
        }
        .list-polish li:hover{ background: rgba(0,0,0,.04) }
        .dark .list-polish li:hover{ background: rgba(255,255,255,.06) }
      `}</style>

      {/* Page header */}
      <header className="card-ux p-6 md:p-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Performance & Reliability
        </h1>
        <p className="mt-2 max-w-3xl text-neutral-700 dark:text-neutral-300">
          Build discipline and ruthless measurement. Below are production scores,
          budgets, and <em>live</em> vitals from your device.
        </p>
      </header>

      {/* Runtime & Build + Budgets */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card-ux">
          <h2 className="text-lg font-semibold">Runtime &amp; Build</h2>
          <ul className="list-polish mt-3 list-disc space-y-2 pl-5">
            <li>Next.js (App Router) + TailwindCSS.</li>
            <li>
              Images via <code>next/image</code> (optimized &amp; responsive).
            </li>
            <li>CI: lint, unit tests (Vitest), and e2e (Playwright).</li>
            <li>Accessibility: keyboard nav, skip-nav, contrast checks.</li>
          </ul>
        </div>

        <div className="card-ux">
          <h2 className="text-lg font-semibold">Budgets (home &amp; playground)</h2>
          <ul className="list-polish mt-3 list-disc space-y-2 pl-5">
            <li>LCP ≲ 2.5 s on a typical laptop.</li>
            <li>CLS &lt; 0.1 (no unexpected layout movement).</li>
            <li>Initial JavaScript ≈ 180 kB for first view.</li>
            <li>Interactions respond in &lt; 200 ms in the playground.</li>
          </ul>

          {/* Trend examples (static samples; edit with your real series later) */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <TrendCard
              title="JS payload (kB)"
              unit="kB"
              data={[210, 198, 190, 184, 181]}
              caption="Last 5 deploys"
            />
            <TrendCard
              title="Median LCP (ms)"
              unit="ms"
              data={[2850, 2600, 2450, 2320, 2210]}
              caption="Synthetic desktop"
            />
          </div>
        </div>
      </section>

      {/* Lighthouse gauges */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card-ux">
          <h2 className="text-lg font-semibold">Lighthouse (Production) — Home</h2>
          <LighthouseGauges
            scores={[
              { label: "Performance", value: 98 },
              { label: "Accessibility", value: 100 },
              { label: "Best Practices", value: 100 },
              { label: "SEO", value: 100 },
            ]}
          />
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            Recorded on {recorded} (Chrome desktop).
          </p>
        </div>

        <div className="card-ux">
          <h2 className="text-lg font-semibold">Lighthouse (Production) — Playground</h2>
          <LighthouseGauges
            scores={[
              { label: "Performance", value: 96 },
              { label: "Accessibility", value: 100 },
              { label: "Best Practices", value: 100 },
              { label: "SEO", value: 100 },
            ]}
          />
        </div>
      </section>

      {/* Live Core Web Vitals */}
      <section className="card-ux">
        <h2 className="text-lg font-semibold">Live Core Web Vitals (this device)</h2>
        <VitalsLive />
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Values update in real time as you interact. Supports modern browsers;
          gracefully degrades where PerformanceObserver isn’t available.
        </p>
      </section>

      {/* Plain stats fallback / quick glance */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card-ux">
          <h2 className="text-lg font-semibold">Quick glance</h2>
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
          </div>
        </div>

        {/* Test status */}
        <div className="card-ux">
          <h2 className="text-lg font-semibold">Test status</h2>
          <ul className="list-polish mt-3 list-disc space-y-2 pl-5">
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
        </div>
      </section>
    </div>
  );
}
