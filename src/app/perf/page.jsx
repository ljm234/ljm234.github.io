export default function Perf(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Performance & Reliability</h1>
      <section className="grid md:grid-cols-2 gap-6">
        <Card title="Runtime & Build">
          <ul className="text-sm list-disc list-inside">
            <li>Next.js App Router • Tailwind • Recharts</li>
            <li>Static assets optimized via next/image</li>
            <li>CI: lint, build, unit + e2e</li>
          </ul>
        </Card>
        <Card title="Budgets">
          <ul className="text-sm list-disc list-inside">
            <li>LCP &lt; 2.5s (Home)</li>
            <li>CLS &lt; 0.1</li>
            <li>JS payload ≤ ~180KB initial</li>
          </ul>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card title="Lighthouse (Vercel prod)">
          <p className="text-sm text-neutral-500">
            Paste your latest scores here after running Lighthouse.
          </p>
          <pre className="mt-2 text-xs overflow-auto rounded bg-neutral-100 dark:bg-neutral-900 p-3">
{`Performance: 98
Accessibility: 100
Best Practices: 100
SEO: 100`}
          </pre>
        </Card>
        <Card title="Test Coverage">
          <p className="text-sm text-neutral-500">Unit + e2e smoke paths.</p>
          <pre className="mt-2 text-xs overflow-auto rounded bg-neutral-100 dark:bg-neutral-900 p-3">
{`Unit: 3 tests passing
E2E: nav + playground + research`}
          </pre>
        </Card>
      </section>
    </div>
  );
}
function Card({title, children}) {
  return (
    <div className="rounded border p-4">
      <div className="font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}
