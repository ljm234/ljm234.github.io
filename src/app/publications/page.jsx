import pubs from "./pubs.json";

export const metadata = {
  title: "Publications — Jordan Montenegro",
  description: "Preprints, methods notes, posters, and code/data links.",
};

export default function Publications(){
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Publications</h1>
      {(!Array.isArray(pubs) || pubs.length === 0) ? (
        <p className="text-sm text-neutral-500">Nothing listed yet. Check back soon.</p>
      ) : (
        <ul className="space-y-4">
          {pubs.map((p,i)=>(
            <li key={i} className="rounded border p-4">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-neutral-500">{p.status} • {p.year}</div>
              {p.authors && <div className="text-sm mt-1">{p.authors}</div>}
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                {p.links?.pdf && <a className="underline" href={p.links.pdf}>PDF</a>}
                {p.links?.code && <a className="underline" href={p.links.code}>Code</a>}
                {p.links?.data && <a className="underline" href={p.links.data}>Data</a>}
                {p.links?.figures && <a className="underline" href={p.links.figures}>Figures</a>}
                {p.links?.doi && <a className="underline" href={p.links.doi}>DOI</a>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
