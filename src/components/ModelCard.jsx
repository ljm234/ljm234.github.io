export default function ModelCard({ card }){
  const rows = [
    ["Model", card.model_name],
    ["Intended use", card.intended_use],
    ["Not for use", card.not_for_use],
    ["Inputs", card.inputs.join(", ")],
    ["Outputs", card.outputs.join(", ")],
    ["Metrics", Object.entries(card.metrics).map(([k,v])=>`${k}: ${v}`).join(", ")],
    ["Data", `${card.data.type}, n=${card.data.n}, seed=${card.data.seed}`],
    ["Ethics", card.ethical_considerations.join(", ")],
    ["Version", card.version],
  ];
  return (
    <div className="rounded border p-4">
      <div className="font-semibold mb-2">Model Card</div>
      <dl className="grid md:grid-cols-2 gap-2 text-sm">
        {rows.map(([k,v])=>(
          <div key={k} className="grid grid-cols-3 gap-2">
            <dt className="col-span-1 text-neutral-500">{k}</dt>
            <dd className="col-span-2">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
