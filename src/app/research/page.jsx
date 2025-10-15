export const metadata = {
  title: "Research — Jordan Montenegro",
  description: "Clinical ML + microbiology projects.",
};

const items = [
  {
    slug: "amoebanator",
    title: "Amoebanator: Early PAM Triage CDS",
    desc: "Risk model with calibration, decision-curve analysis, and explainability.",
    tags: ["Clinical ML", "CDS", "Calibration"],
  },
  {
    slug: "montenegro-medium",
    title: "Montenegro’s Medium (MM)",
    desc: "Serum-free, low-cost axenic medium enabling robust Naegleria fowleri growth.",
    tags: ["Wet Lab", "Optimization"],
  },
  {
    slug: "organelle-targets",
    title: "Organelle-Target Discovery for Selective Amoebicidal Therapy",
    desc: "Open medium + 96-well screens (LDH 24h, caspase-3 48h, JC-1 72h) nominate ER/COPII and ER–mitochondria Ca²⁺ coupling.",
    tags: ["Mechanism", "Screening"],
  },
];

export default function ResearchPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Research</h1>
      <div className="space-y-6">
        {items.map((p) => (
          <article key={p.slug} className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-xs rounded border px-2 py-0.5">{t}</span>
              ))}
            </div>
            <a className="mt-3 inline-block underline" href={`/research/${p.slug}`}>
              Open project →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
