export const metadata = { title: "Engineering Notes — Jordan Montenegro" };

export default function Engineering(){
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Engineering Notes</h1>

      <section className="rounded border p-4">
        <h2 className="text-xl font-semibold mb-2">Architecture (overview)</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
          Next.js App Router + Tailwind + Recharts, deployed on Vercel. Content and demo data live in <code>/src/content</code> and <code>/public</code>. Tests (Vitest + Playwright) and CI (GitHub Actions) keep quality high.
        </p>
        <Diagram />
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card title="Data & Safety">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>No PHI; demo cohort is synthetic with fixed seed</li>
            <li>Model card + limitations documented per project</li>
            <li>Downloadables served from <code>/public</code></li>
          </ul>
        </Card>
        <Card title="ML Demo">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Browser logistic baseline with feature contributions</li>
            <li>Precomputed calibration / PR / decision-curve JSON</li>
            <li>Clear risk bands with conservative thresholds</li>
          </ul>
        </Card>
        <Card title="Testing & CI">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Vitest unit tests for model utils</li>
            <li>Playwright e2e for nav & playground</li>
            <li>GitHub Actions: lint → build → test → e2e</li>
          </ul>
        </Card>
        <Card title="Performance & A11y">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>LCP &lt; 2.5s goal; <code>next/image</code> for media</li>
            <li>Skip-nav, focus rings, contrast-safe palette</li>
            <li>Content served statically wherever possible</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

function Card({title, children}) {
  return <div className="rounded border p-4"><div className="font-semibold mb-2">{title}</div>{children}</div>;
}

function Diagram(){
  return (
    <div className="rounded border bg-white dark:bg-neutral-950 p-3 overflow-auto">
      <svg width="900" height="240" viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg">
        <g fontFamily="ui-sans-serif, system-ui" fontSize="12" fill="none" stroke="#6b7280" strokeWidth="1.5">
          <rect x="20" y="20" width="190" height="80" rx="10" fill="#f9fafb"/>
          <text x="115" y="50" textAnchor="middle" fill="#111827">Browser (Client)</text>
          <text x="115" y="70" textAnchor="middle" fill="#111827">Playground UI + LR baseline</text>

          <rect x="250" y="20" width="210" height="80" rx="10" fill="#f9fafb"/>
          <text x="355" y="50" textAnchor="middle" fill="#111827">Next.js App Router</text>
          <text x="355" y="70" textAnchor="middle" fill="#111827">Pages / Components</text>

          <rect x="500" y="20" width="170" height="80" rx="10" fill="#f9fafb"/>
          <text x="585" y="50" textAnchor="middle" fill="#111827">Charts (Recharts)</text>
          <text x="585" y="70" textAnchor="middle" fill="#111827">Calibration / PR / DCA</text>

          <rect x="700" y="20" width="180" height="80" rx="10" fill="#f9fafb"/>
          <text x="790" y="50" textAnchor="middle" fill="#111827">Public Assets</text>
          <text x="790" y="70" textAnchor="middle" fill="#111827">CV, Summary, CSV</text>

          <rect x="20" y="140" width="250" height="80" rx="10" fill="#f9fafb"/>
          <text x="145" y="170" textAnchor="middle" fill="#111827">/src/content (JSON)</text>
          <text x="145" y="190" textAnchor="middle" fill="#111827">projects, metrics, cards</text>

          <rect x="310" y="140" width="230" height="80" rx="10" fill="#f9fafb"/>
          <text x="425" y="170" textAnchor="middle" fill="#111827">Tests & CI</text>
          <text x="425" y="190" textAnchor="middle" fill="#111827">Vitest, Playwright, Actions</text>

          <line x1="210" y1="60" x2="250" y2="60" markerEnd="url(#a)"/>
          <line x1="460" y1="60" x2="500" y2="60" markerEnd="url(#a)"/>
          <line x1="670" y1="60" x2="700" y2="60" markerEnd="url(#a)"/>
          <line x1="250" y1="180" x2="310" y2="180" markerEnd="url(#a)"/>

          <defs>
            <marker id="a" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#6b7280" />
            </marker>
          </defs>
        </g>
      </svg>
    </div>
  );
}
