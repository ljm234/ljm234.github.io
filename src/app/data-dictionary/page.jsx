import schema from "@/content/data/triage_schema.json";

export const metadata = { title: "Data Dictionary — Jordan Montenegro" };

export default function DataDictionary(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Data Dictionary (ED Triage Demo)</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        This schema documents the demo features used for risk estimation. No PHI; values are synthetic for illustration.
      </p>

      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900">
            <tr>
              <Th>Name</Th><Th>Type</Th><Th>Unit</Th><Th>Allowed</Th><Th>Required</Th><Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            {schema.map((r) => (
              <tr key={r.name} className="border-t">
                <Td mono>{r.name}</Td>
                <Td>{r.type}</Td>
                <Td>{r.unit ?? "-"}</Td>
                <Td mono>{r.allowed_range}</Td>
                <Td>{r.required ? "yes" : "no"}</Td>
                <Td>{r.description}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm">
        <a className="underline" href="/downloads/triage-data-dictionary.csv">Download CSV</a>
      </p>
    </div>
  );
}

function Th({children}){ return <th className="px-3 py-2 text-left font-semibold">{children}</th>; }
function Td({children, mono}){ return <td className={"px-3 py-2 " + (mono?"font-mono":"")}>{children}</td>; }
