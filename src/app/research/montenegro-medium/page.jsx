import dynamic from "next/dynamic";

// Client-only floating preview (no SSR)
const MMPreview = dynamic(() => import("./MMPreview"), { ssr: false });

export const metadata = {
  title: "Montenegro’s Medium (MM) — Jordan Montenegro",
  description:
    "Serum-free, low-cost axenic medium enabling robust Naegleria fowleri growth with simple, reproducible passaging.",
};

export default function Page() {
  const figures = [
    { src: "/research/mm/fig2-growth.png", alt: "Growth curve in MM (0–168 h)", caption: "Fig. 2 — Growth in MM" },
    { src: "/research/mm/fig3-fresh-old.png", alt: "Fresh vs. old MM at 48 h and 72 h", caption: "Fig. 3 — Fresh vs. old MM" },
    { src: "/research/mm/fig4-passage.png", alt: "Passage timing & method (TD3–TD5; DT vs CT)", caption: "Fig. 4 — Passage timing/method" },
    { src: "/research/mm/day-0.png", alt: "Day 0 micrograph", caption: "Day 0" },
    { src: "/research/mm/day-3.png", alt: "Day 3 micrograph", caption: "Day 3" },
    { src: "/research/mm/day-7.png", alt: "Day 7 micrograph", caption: "Day 7" },
    { src: "/research/mm/day-10.png", alt: "Day 10 micrograph", caption: "Day 10" },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Montenegro’s Medium (MM)</h1>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl">
          A simple <strong>serum-free, low-cost</strong> axenic medium that supports robust{" "}
          <em>Naegleria fowleri</em> growth and routine passaging. Mean density rose from
          2.05×10<sup>5</sup> to 1.72×10<sup>7</sup> cells·mL⁻¹ over 168 h with an overall doubling time ≈ 28 h;
          early windows were faster (≈12 h at 0–24 h; ≈9 h at 24–48 h). Fresh batches outperformed 30–35-day batches,
          and a simple <strong>TD3 direct transfer (DT)</strong> matched or beat centrifuge transfer at scale.
        </p>
      </header>

      {/* Key findings */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Key findings (evidence summary)</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <Card title="Growth & doubling">
            <li>Final density ≈ 1.72×10<sup>7</sup> cells·mL⁻¹ at 168 h</li>
            <li>Overall doubling ≈ 28 h; early windows 9–12 h</li>
          </Card>
          <Card title="Fresh vs. old medium">
            <li>48 h: fresh ≈ 1.5× higher than 30–35 d</li>
            <li>72 h: fresh ≈ 2.8× higher than 30–35 d</li>
          </Card>
          <Card title="Transfer method">
            <li>TD3 direct transfer (DT) is simplest and competitive</li>
            <li>DT avoids centrifuge (CT 3000×g, 5 min) equipment/time</li>
          </Card>
          <Card title="Practicalities">
            <li>Common ingredients; no antibiotics needed</li>
            <li>Low cost: ≈ $0.12–$0.36 / 100 mL</li>
          </Card>
        </div>
      </section>

      {/* Figures */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Figures</h2>
        <Figure src="/research/mm/fig2-growth.png" alt="Growth curve in MM" caption="Fig. 2 — Growth in MM (0–168 h)." />
        <Figure src="/research/mm/fig3-fresh-old.png" alt="Fresh vs old MM" caption="Fig. 3 — Fresh vs old MM at 48 h and 72 h." />
        <Figure src="/research/mm/fig4-passage.png" alt="Passage timing & method" caption="Fig. 4 — Passage timing & method (TD3–TD5; DT vs CT)." />

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: "/research/mm/day-0.png", caption: "Day 0" },
            { src: "/research/mm/day-3.png", caption: "Day 3" },
            { src: "/research/mm/day-7.png", caption: "Day 7" },
            { src: "/research/mm/day-10.png", caption: "Day 10" },
          ].map((f) => (
            <figure key={f.src} className="rounded-xl border overflow-hidden">
              <img src={f.src} alt={f.caption} className="w-full h-auto object-cover" loading="lazy" />
              <figcaption className="p-2 text-xs text-neutral-600 dark:text-neutral-400">{f.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Downloads</h2>
        <ul className="list-disc pl-6 mt-2">
          <li><a className="underline" href="/papers/montenegro-medium.docx">Manuscript (DOCX)</a></li>
          <li><a className="underline" href="/downloads/Research-Summary.pdf">One-page summary</a></li>
        </ul>
      </section>

      {/* Client-only floating preview (not SSR'd) */}
      <MMPreview
        abstract="Serum-free, low-cost axenic medium enabling robust Naegleria fowleri growth with fast early doubling (9–12 h) and simple TD3 direct transfer. Fresh batches outperform aged (30–35 d) medium at 48/72 h."
        figures={figures}
      />
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="font-medium">{title}</div>
      <ul className="list-disc pl-5 mt-2 space-y-1">{children}</ul>
    </div>
  );
}

function Figure({ src, alt, caption }) {
  return (
    <figure className="rounded-xl border overflow-hidden">
      <img src={src} alt={alt} className="w-full h-auto object-contain bg-white dark:bg-neutral-950" loading="lazy" />
      <figcaption className="p-3 text-sm text-neutral-600 dark:text-neutral-400">{caption}</figcaption>
    </figure>
  );
}
