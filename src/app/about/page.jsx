export default function About(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p>
        I’m Jordan Montenegro. I build clinical ML tools and research software that emphasize
        calibration, decision utility, and safety for real workflows.
      </p>

      <h2 className="text-xl font-semibold">Skills matrix</h2>
      <div className="grid md:grid-cols-4 gap-4 text-sm">
        <Cell h="ML" items={["Logistic/Tree baselines","Calibration & DCA","Explainability"]}/>
        <Cell h="Software" items={["Next.js/Node","Testing & CI","Perf & a11y budgets"]}/>
        <Cell h="Wet Lab" items={["Culture optimization","Drug assays","Microscopy"]}/>
        <Cell h="Clinical Ops" items={["Triage framing","De-ID workflows","Ethics notes"]}/>
      </div>

      <h2 className="text-xl font-semibold">Ethics & Safety</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Demos are non-clinical. I document limitations, avoid automation bias, and show calibration.
      </p>
    </div>
  );
}
function Cell({h,items}){return (
  <div className="rounded-lg border p-4">
    <div className="font-medium mb-2">{h}</div>
    <ul className="list-disc list-inside space-y-1">{items.map(i=><li key={i}>{i}</li>)}</ul>
  </div>
);}
