export const metadata = {
  title: "Organelle-Target Discovery — Jordan Montenegro",
  description:
    "96-well screening (LDH 24h, Caspase-3 48h, JC-1 72h) nominates ER/COPII trafficking and ER–mitochondria Ca²⁺ coupling as selective amoebicidal targets.",
};

export default function Page() {
  const figs = [
    { src: "/research/ot/ldh-hela-nf-24h-plate1-percent.png", caption: "LDH 24 h — HeLa+Nf P1 (percent)" },
    { src: "/research/ot/ldh-hela-nf-24h-plate2-raw.png",     caption: "LDH 24 h — HeLa+Nf P2 (raw)" },
    { src: "/research/ot/ldh-nf-only-24h-plate1-raw.png",     caption: "LDH 24 h — Nf-only P1 (raw)" },
    { src: "/research/ot/ldh-nf-only-24h-plate2-raw.png",     caption: "LDH 24 h — Nf-only P2 (raw)" },

    { src: "/research/ot/caspase3-hela-nf-48h-plate1-percent.png", caption: "Caspase-3 48 h — HeLa+Nf P1 (percent)" },
    { src: "/research/ot/caspase3-hela-nf-48h-plate2-percent.png", caption: "Caspase-3 48 h — HeLa+Nf P2 (percent)" },
    { src: "/research/ot/caspase3-nf-only-48h-plate1-raw.png",     caption: "Caspase-3 48 h — Nf-only P1 (raw)" },
    { src: "/research/ot/caspase3-nf-only-48h-plate2-raw.png",     caption: "Caspase-3 48 h — Nf-only P2 (raw)" },

    { src: "/research/ot/jc1-hela-nf-72h-plate1-percent.png",  caption: "JC-1 72 h — HeLa+Nf P1 (percent)" },
    { src: "/research/ot/jc1-hela-nf-72h-plate2-percent.png",  caption: "JC-1 72 h — HeLa+Nf P2 (percent)" },
    { src: "/research/ot/jc1-nf-only-72h-plate1-percent.png",  caption: "JC-1 72 h — Nf-only P1 (percent)" },
    { src: "/research/ot/jc1-nf-only-72h-plate2-raw.png",      caption: "JC-1 72 h — Nf-only P2 (raw)" },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Organelle-Target Discovery for Selective Amoebicidal Therapy
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl">
          We combine an open, low-cost culture medium with 96-well pharmacology to profile
          <strong> LDH (24 h), Caspase-3 (48 h),</strong> and <strong>JC-1 mitochondrial potential (72 h)</strong>.
          Early data nominate <strong>ER/COPII trafficking</strong> and <strong>ER–mitochondria Ca²⁺ coupling</strong>
          as promising selective targets. Screens are paired with QC, plate maps, and effect-size summaries.
        </p>
      </header>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Key findings (early)</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li>Selective toxicity separates in LDH (24 h) vs apoptosis (48 h) vs mitochondrial collapse (72 h).</li>
          <li>Compounds perturbing COPII/ER exit and ER–mitochondria Ca²⁺ handling show the strongest, consistent signals.</li>
          <li>Paired HeLa+Nf vs Nf-only plates help discriminate host-only vs amoebicidal effects.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Plate readouts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {figs.map((f) => (
            <figure key={f.src} className="rounded-xl border overflow-hidden">
              <img src={f.src} alt={f.caption} className="w-full h-auto object-contain bg-white dark:bg-neutral-950" loading="lazy" />
              <figcaption className="p-2 text-xs text-neutral-600 dark:text-neutral-400">{f.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Downloads</h2>
        <ul className="list-disc pl-6 mt-2">
          <li><a className="underline" href="/papers/organelle-targets.docx">Manuscript (DOCX)</a></li>
        </ul>
      </section>
    </div>
  );
}
