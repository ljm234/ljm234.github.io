import dd from "@/content/data_dictionary.json";

export default function DataDictionary(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Data Dictionary — {dd.entity} v{dd.version}</h1>
      <table className="w-full text-sm rounded border">
        <thead>
          <tr className="text-left bg-neutral-50 dark:bg-neutral-900">
            <th className="p-2">Field</th>
            <th className="p-2">Type</th>
            <th className="p-2">Req</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {dd.fields.map(f=>(
            <tr key={f.name} className="border-t">
              <td className="p-2 font-mono">{f.name}</td>
              <td className="p-2">{f.type}</td>
              <td className="p-2">{f.required ? "Yes":"No"}</td>
              <td className="p-2">{f.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-sm">
        <a className="underline" href="/downloads/pam_triage_schema.csv">Download CSV schema</a>
      </div>
      <div className="text-xs text-neutral-500">
        Notes: {dd.notes.join(" • ")}
      </div>
    </div>
  );
}
