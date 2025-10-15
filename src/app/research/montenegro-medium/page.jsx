import Image from "next/image";

export const metadata = {
  title: "Montenegro’s Medium (MM) — Research",
  description:
    "Serum-free, low-cost axenic medium enabling robust Naegleria fowleri growth.",
};

export default function Page() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Montenegro’s Medium (MM)</h1>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Serum-free, low-cost axenic medium enabling robust Naegleria fowleri growth.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Figures</h2>

        <figure className="rounded-2xl border p-4">
          <h3 className="text-lg font-semibold">Growth curve in MM</h3>
          <Image
            src="/research/mm/fig2-growth.png"
            alt="Growth in Montenegro’s Medium from 0–168 hours"
            width={1600}
            height={1000}
            sizes="100vw"
            className="mt-3 h-auto w-full rounded-lg border"
            priority={false}
          />
          <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Fig. 2 — Growth in MM (0–168 h).
          </figcaption>
        </figure>

        <figure className="rounded-2xl border p-4">
          <h3 className="text-lg font-semibold">Fresh vs old MM</h3>
          <Image
            src="/research/mm/fig3-fresh-old.png"
            alt="Fresh vs old Montenegro’s Medium at 48 and 72 hours"
            width={1600}
            height={1000}
            sizes="100vw"
            className="mt-3 h-auto w-full rounded-lg border"
          />
          <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Fig. 3 — Fresh vs old MM at 48 h and 72 h.
          </figcaption>
        </figure>

        <figure className="rounded-2xl border p-4">
          <h3 className="text-lg font-semibold">Passage timing & method</h3>
          <Image
            src="/research/mm/fig4-passage.png"
            alt="Passage timing TD3–TD5 and comparison of DT vs CT"
            width={1600}
            height={1000}
            sizes="100vw"
            className="mt-3 h-auto w-full rounded-lg border"
          />
          <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Fig. 4 — Passage timing & method (TD3–TD5; DT vs CT).
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["day-0", "day-3", "day-7", "day-10"].map((d) => (
            <figure key={d} className="rounded-2xl border p-3">
              <h4 className="font-medium">{d.replace("-", " ").toUpperCase()}</h4>
              <Image
                src={`/research/mm/${d}.png`}
                alt={`Micrograph ${d}`}
                width={1000}
                height={1000}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="mt-2 h-auto w-full rounded border"
              />
              <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {d.replace("-", " ")}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
