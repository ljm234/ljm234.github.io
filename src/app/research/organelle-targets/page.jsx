// /src/app/research/organelle-targets/page.jsx
import Image from "next/image";
import Reveal from "@/components/effects/Reveal";
import HoverLift from "@/components/effects/HoverLift";

export const metadata = {
  title: "Organelle-Target Discovery for Selective Amoebicidal Therapy",
  description:
    "Matched HeLa+Nf vs Nf-only readouts across LDH (24 h), Caspase-3 (48 h), and JC-1 (72 h).",
  alternates: { canonical: "/research/organelle-targets" },
};

const FIGS = [
  // LDH — 24 h
  { key: "ldh-hn-p1-percent", title: "LDH 24 h — HeLa+Nf P1 (percent)", src: "/research/ot/ldh-hela-nf-24h-plate1-percent.png" },
  { key: "ldh-hn-p2-raw",     title: "LDH 24 h — HeLa+Nf P2 (raw)",      src: "/research/ot/ldh-hela-nf-24h-plate2-raw.png" },
  { key: "ldh-nf-p1-raw",     title: "LDH 24 h — Nf-only P1 (raw)",      src: "/research/ot/ldh-nf-only-24h-plate1-raw.png" },
  { key: "ldh-nf-p2-raw",     title: "LDH 24 h — Nf-only P2 (raw)",      src: "/research/ot/ldh-nf-only-24h-plate2-raw.png" },
  // Caspase-3 — 48 h
  { key: "casp3-hn-p1-percent", title: "Caspase-3 48 h — HeLa+Nf P1 (percent)", src: "/research/ot/caspase3-hela-nf-48h-plate1-percent.png" },
  { key: "casp3-hn-p2-percent", title: "Caspase-3 48 h — HeLa+Nf P2 (percent)", src: "/research/ot/caspase3-hela-nf-48h-plate2-percent.png" },
  { key: "casp3-nf-p1-raw",     title: "Caspase-3 48 h — Nf-only P1 (raw)",     src: "/research/ot/caspase3-nf-only-48h-plate1-raw.png" },
  { key: "casp3-nf-p2-raw",     title: "Caspase-3 48 h — Nf-only P2 (raw)",     src: "/research/ot/caspase3-nf-only-48h-plate2-raw.png" },
  // JC-1 — 72 h
  { key: "jc1-hn-p1-percent", title: "JC-1 72 h — HeLa+Nf P1 (percent)", src: "/research/ot/jc1-hela-nf-72h-plate1-percent.png" },
  { key: "jc1-hn-p2-percent", title: "JC-1 72 h — HeLa+Nf P2 (percent)", src: "/research/ot/jc1-hela-nf-72h-plate2-percent.png" },
  { key: "jc1-nf-p1-percent", title: "JC-1 72 h — Nf-only P1 (percent)", src: "/research/ot/jc1-nf-only-72h-plate1-percent.png" },
  { key: "jc1-nf-p2-raw",     title: "JC-1 72 h — Nf-only P2 (raw)",     src: "/research/ot/jc1-nf-only-72h-plate2-raw.png" },
];

export default function OrganelleTargetsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Reveal effect="fade-up">
          <h1 className="text-3xl font-bold tracking-tight">
            Organelle-Target Discovery for Selective Amoebicidal Therapy
          </h1>
        </Reveal>
        <p className="text-neutral-600 dark:text-neutral-300">
          Matched HeLa+<span className="italic">Nf</span> vs{" "}
          <span className="italic">Nf</span>-only readouts across LDH (24 h), Caspase-3 (48 h), and JC-1 (72 h).
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-semibold tracking-tight">Plate readouts</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {FIGS.map((f, idx) => (
            <HoverLift key={f.key}>
              <figure className="rounded-2xl border bg-white/60 dark:bg-neutral-950/60">
                <figcaption className="px-4 pt-4 text-sm font-medium">{f.title}</figcaption>
                <div className="relative mx-4 mb-4 mt-2 aspect-[4/3] rounded-lg border bg-white">
                  <Image
                    src={f.src}
                    alt={f.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={idx < 2}
                  />
                </div>
              </figure>
            </HoverLift>
          ))}
        </div>
      </section>

      <footer className="pt-2 text-sm text-neutral-500">
        © {new Date().getFullYear()} Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher
      </footer>
    </div>
  );
}
