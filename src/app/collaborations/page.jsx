export default function Collaborations(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Collaborations</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        I’m interested in clinical decision support, calibrated risk estimation, and quick-turn prototypes with de-identified data.
      </p>

      <section className="grid md:grid-cols-2 gap-6">
        <Card title="ED triage for suspected PAM">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>n=30–50 retrospective cases; feature availability audit</li>
            <li>Calibration + decision-curve; automation-bias mitigations</li>
            <li>Deliverables: model card, small report, demo UI</li>
          </ul>
        </Card>
        <Card title="Montenegro’s Medium data note">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Structured growth dataset for public reproducibility</li>
            <li>Simple baseline models; uncertainty notes</li>
            <li>Open figures + methods PDF</li>
          </ul>
        </Card>
      </section>

      <p className="text-sm">If this aligns, contact me via the <a className="underline" href="/contact">contact form</a>.</p>
    </div>
  );
}
function Card({title, children}){return <div className="rounded border p-4"><div className="font-semibold mb-2">{title}</div>{children}</div>;}
