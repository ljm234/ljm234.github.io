import dynamic from "next/dynamic";
const PreviewButton = dynamic(() => import("@/components/PreviewButton"), { ssr: false });

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
    preview: {
      abstract:
        "Serum-free, low-cost axenic medium enabling robust growth with fast early doubling (9–12 h). Fresh batches outperform 30–35 d; TD3 direct transfer is simple and effective.",
      figures: [
        { src: "/research/mm/fig2-growth.png", caption: "Growth 0–168 h" },
        { src: "/research/mm/fig3-fresh-old.png", caption: "Fresh vs old (48/72 h)" },
        { src: "/research/mm/fig4-passage.png", caption: "TD3–TD5; DT vs CT" },
        { src: "/research/mm/day-3.png", caption: "Day 3 micrograph" },
      ],
    },
  },
  {
    slug: "organelle-targets",
    title: "Organelle-Target Discovery for Selective Amoebicidal Therapy",
    desc: "96-well LDH/Caspase-3/JC-1 screens nominate ER/COPII and ER–mitochondria Ca²⁺ coupling.",
    tags: ["Mechanism", "Screening"],
    preview: {
      abstract:
        "Paired HeLa+Nf and Nf-only plates across LDH (24h), Caspase-3 (48h), JC-1 (72h) reveal selective organelle vulnerabilities.",
      figures: [
        { src: "/research/ot/ldh-hela-nf-24h-plate1-percent.png", caption: "LDH 24h HeLa+Nf" },
        { src: "/research/ot/caspase3-hela-nf-48h-plate2-percent.png", caption: "Caspase-3 48h HeLa+Nf" },
        { src: "/research/ot/jc1-hela-nf-72h-plate1-percent.png", caption: "JC-1 72h HeLa+Nf" },
      ],
    },
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
            <div className="mt-3 flex items-center gap-4">
              <a className="underline" href={`/research/${p.slug}`}>Open project →</a>
              {p.preview && (
                <PreviewButton label="Quick Preview" abstract={p.preview.abstract} items={p.preview.figures} />
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
