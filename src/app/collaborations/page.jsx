export default function Collaborations(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Collaborations</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        I’m focused on clinical decision support, calibrated risk estimation, and quick-turn prototypes with de-identified data.
        If the ideas below align, I’d love to talk.
      </p>

      <section className="grid md:grid-cols-2 gap-6">
        <Card title="ED triage for suspected PAM (pilot)">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Retrospective n=30–50 cases; feature availability audit</li>
            <li>Calibration, Brier score, and decision-curve analysis</li>
            <li>Deliverables: model card, brief report, demo UI (web)</li>
          </ul>
        </Card>

        <Card title="Montenegro’s Medium reproducibility note">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Structured growth dataset with timing and counts</li>
            <li>Simple baselines + uncertainty notes; figures for methods note</li>
            <li>Open data + open figures bundle</li>
          </ul>
        </Card>
      </section>

      <p className="text-sm">
        Contact me via the <a className="underline" href="/contact">contact form</a>.
      </p>
    </div>
  );
}
function Card({title, children}){return <div className="rounded border p-4"><div className="font-semibold mb-2">{title}</div>{children}</div>;}
