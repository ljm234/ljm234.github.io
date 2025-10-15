export const metadata = {
  title: "Organelle-Target Discovery — Jordan Montenegro",
  description:
    "Open medium + LDH/Caspase/JC-1 screens nominate ER/COPII & ER–mitochondria Ca²⁺ coupling as leads.",
};

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Organelle-Target Discovery for Selective Amoebicidal Therapy
      </h1>

      <p className="text-neutral-700 dark:text-neutral-300">
        We paired an open culture medium with a reproducible 96-well screen that reads
        necrosis (LDH, 24 h), apoptosis (caspase-3, 48 h), and mitochondrial potential
        (JC-1, 72 h) in <em>N. fowleri</em> alone and HeLa + <em>N. fowleri</em> co-culture.
        At tested doses, perturbing the ER/secretory axis (thapsigargin + brefeldin A, ± metformin)
        reduced early host-cell injury and preserved Δψm, nominating <strong>ER/COPII</strong> and
        <strong> ER–mitochondria Ca²⁺ coupling</strong> as tractable targets for selective, rapid kill.
      </p>

      <ul className="list-disc pl-6">
        <li>Per-plate anchors & normalization; raw signal shown when anchors collapse.</li>
        <li>Next steps: dose-response grids, combination index (Chou–Talalay), selectivity indices, neuronal models.</li>
      </ul>

      <div className="rounded-lg border p-4">
        <div className="font-medium mb-2">Downloads</div>
        <ul className="list-disc pl-6">
          <li><a className="underline" href="/papers/organelle-targets.docx">Manuscript (DOCX)</a></li>
        </ul>
      </div>
    </div>
  );
}
