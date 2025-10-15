export default function Home() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1
            data-testid="hero-title"
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            AI/ML Research Engineer & Clinical ML Researcher
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300">
            I build and research ML for medicine and applied CS, to serve real people.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/research"
              className="rounded bg-black text-white dark:bg-white dark:text-black px-4 py-2"
            >
              View Research and Projects
            </a>
            <a href="/playground" className="rounded border px-4 py-2">
              Open Playground
            </a>
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <a
              href="/downloads/Jordan-Montenegro-CV.pdf"
              className="text-sm underline"
            >
              CV (PDF)
            </a>
            <a
              href="/downloads/Research-Summary.pdf"
              className="text-sm underline"
            >
              One-page Research Summary
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Metric k="3–5×" v="Montenegro’s Medium growth" />
          <Metric k="16-pt" v="Amoebanator triage score" />
          <Metric k="650+" v="Service hours" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="flex flex-wrap items-center gap-6 opacity-80">
        <span className="text-sm">Trusted by work with:</span>
        <Logo>Weber State</Logo>
      </section>

      {/* HIGHLIGHTS */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Research highlights
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            title="Amoebanator CDS"
            href="/research/amoebanator"
            desc="Early PAM triage with risk calibration, decision curve, and explainability."
          />
          <Card
            title="Montenegro’s Medium"
            href="/research/montenegro-medium"
            desc="Low-cost culture medium with 3–5× growth for Naegleria fowleri."
          />
          <Card
            title="ER-Stress in N. fowleri"
            href="/research/er-stress"
            desc="Drug response assays and mitochondrial dysfunction signatures."
          />
        </div>
      </section>
    </div>
  );
}

function Metric({ k, v }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-3xl font-bold">{k}</div>
      <div className="text-xs mt-1 text-neutral-500">{v}</div>
    </div>
  );
}
function Logo({ children }) {
  return (
    <div className="text-sm px-3 py-1 rounded border">{children}</div>
  );
}
function Card({ title, desc, href }) {
  return (
    <a
      href={href}
      className="rounded-lg border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
    >
      <div className="font-semibold">{title}</div>
      <div className="text-sm mt-1 text-neutral-500">{desc}</div>
      <div className="text-xs mt-3 underline">Read more →</div>
    </a>
  );
}
