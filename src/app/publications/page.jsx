export const metadata = { title: "Publications — Jordan Montenegro" };

function Pub({ title, status, notes, href }) {
  return (
    <li className="rounded-2xl border p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs rounded-full border px-2 py-0.5">{status}</span>
      </div>
      {notes && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{notes}</p>}
      {href && <a className="mt-2 inline-block underline" href={href}>Download →</a>}
    </li>
  );
}

export default function PublicationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Publications</h1>
      <ul className="space-y-4">
        <Pub
          title="Montenegro’s Medium (MM): a serum-free, low-cost axenic medium enabling robust Naegleria fowleri growth"
          status="Manuscript in preparation"
          notes="Robust growth to 1.72×10⁷ cells·mL⁻¹ (168 h), overall doubling ≈28 h; fresh batches outperform older; TD3 direct transfer is simplest. :contentReference[oaicite:9]{index=9}"
          href="/papers/montenegro-medium.docx"
        />
        <Pub
          title="Organelle-target discovery for selective amoebicidal therapy: an open medium and three endpoint screens against Naegleria fowleri"
          status="Preprint in preparation"
          notes="LDH (24 h), caspase-3 (48 h), JC-1 (72 h) co-culture screens nominate ER/COPII & ER–mitochondria Ca²⁺ coupling as leads. :contentReference[oaicite:10]{index=10}"
          href="/papers/organelle-targets.docx"
        />
        <Pub
          title="Amoebanator: Early PAM triage with calibration & decision-curve analysis"
          status="In progress"
          notes="Clinical-ML risk framing, conformal thresholds and decision-utility demo. (Page remains as currently implemented.)"
        />
      </ul>
    </div>
  );
}
