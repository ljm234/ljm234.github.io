export const metadata = {
  title: "Montenegro’s Medium (MM) — Jordan Montenegro",
  description: "Serum-free, low-cost axenic medium enabling robust Naegleria fowleri growth.",
};

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Montenegro’s Medium (MM)</h1>

      <p className="text-neutral-700 dark:text-neutral-300">
        A simple <strong>serum-free, low-cost</strong> axenic medium that supports robust{" "}
        <em>Naegleria fowleri</em> growth and routine passaging. Mean density rose from
        2.05×10<sup>5</sup> to 1.72×10<sup>7</sup> cells·mL⁻¹ over 168 h with an overall
        doubling time ≈ 28 h; early windows were faster (≈12 h at 0–24 h; ≈9 h at 24–48 h).
        Fresh batches outperformed 30–35-day batches at 48 h (~1.55×) and 72 h (~2.77×);
        direct transfer at Day 3 (TD3) matched or beat centrifuge transfer and is the simplest default.
      </p>

      <ul className="list-disc pl-6">
        <li>Common ingredients; no antibiotics; standard sterile technique.</li>
        <li>Repeated subculture &gt;50 passages without loss of routine growth.</li>
        <li>Approx. cost ≈ $0.12–$0.36 / 100 mL vs $8–$23 for serum formulas.</li>
      </ul>

      <div className="rounded-lg border p-4">
        <div className="font-medium mb-2">Downloads</div>
        <ul className="list-disc pl-6">
          <li><a className="underline" href="/papers/montenegro-medium.docx">Manuscript (DOCX)</a></li>
          <li><a className="underline" href="/downloads/Research-Summary.pdf">One-page summary</a></li>
        </ul>
      </div>
    </div>
  );
}
