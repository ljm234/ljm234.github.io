import { projects } from "@/content/projects";

export default function Research() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Research</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map(p => (
          <a key={p.slug} href={`/research/${p.slug}`} className="rounded-lg border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-neutral-500 mt-1">{p.summary}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.tags.map(t => <span key={t} className="text-xs border rounded px-2 py-0.5">{t}</span>)}
            </div>
            <div className="text-xs mt-3 underline">Open project →</div>
          </a>
        ))}
      </div>
    </div>
  );
}
