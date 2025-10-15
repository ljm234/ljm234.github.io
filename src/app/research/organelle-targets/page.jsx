import Image from "next/image";

export const metadata = {
  title: "Organelle-Target Discovery — Research",
  description:
    "Paired HeLa+Nf vs Nf-only 96-well plates across LDH (24 h), Caspase-3 (48 h), and JC-1 (72 h).",
};

const plates = [
  // 24 h LDH
  { src: "/research/ot/ldh-hela-nf-24h-plate1-percent.png", caption: "LDH 24 h — HeLa+Nf P1 (percent)" },
  { src: "/research/ot/ldh-hela-nf-24h-plate2-raw.png", caption: "LDH 24 h — HeLa+Nf P2 (raw)" },
  { src: "/research/ot/ldh-nf-only-24h-plate1-raw.png", caption: "LDH 24 h — Nf-only P1 (raw)" },
  { src: "/research/ot/ldh-nf-only-24h-plate2-raw.png", caption: "LDH 24 h — Nf-only P2 (raw)" },

  // 48 h Caspase-3
  { src: "/research/ot/caspase3-hela-nf-48h-plate1-percent.png", caption: "Caspase-3 48 h — HeLa+Nf P1 (percent)" },
  { src: "/research/ot/caspase3-hela-nf-48h-plate2-percent.png", caption: "Caspase-3 48 h — HeLa+Nf P2 (percent)" },
  { src: "/research/ot/caspase3-nf-only-48h-plate1-raw.png", caption: "Caspase-3 48 h — Nf-only P1 (raw)" },
  { src: "/research/ot/caspase3-nf-only-48h-plate2-raw.png", caption: "Caspase-3 48 h — Nf-only P2 (raw)" },

  // 72 h JC-1
  { src: "/research/ot/jc1-hela-nf-72h-plate1-percent.png", caption: "JC-1 72 h — HeLa+Nf P1 (percent)" },
  { src: "/research/ot/jc1-hela-nf-72h-plate2-percent.png", caption: "JC-1 72 h — HeLa+Nf P2 (percent)" },
  { src: "/research/ot/jc1-nf-only-72h-plate1-percent.png", caption: "JC-1 72 h — Nf-only P1 (percent)" },
  { src: "/research/ot/jc1-nf-only-72h-plate2-raw.png", caption: "JC-1 72 h — Nf-only P2 (raw)" },
];

export default function Page() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">
          Organelle-Target Discovery for Selective Amoebicidal Therapy
        </h1>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Matched HeLa+Nf vs Nf-only readouts across LDH (24 h), Caspase-3 (48 h), and JC-1 (72 h).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Plate readouts</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {plates.map((p, i) => (
            <figure key={i} className="rounded-2xl border p-4">
              <h3 className="text-lg font-medium">{p.caption}</h3>
              <Image
                src={p.src}
                alt={p.caption}
                width={1600}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="mt-2 h-auto w-full rounded-lg border"
              />
              <figcaption className="sr-only">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
