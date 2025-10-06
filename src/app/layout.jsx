import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  metadataBase: new URL("https://cs-220-portfolio-v3-ljm234.vercel.app"),
  title: "Jordan Montenegro — Clinical ML & Decision Support",
  description: "Portfolio with research, demos, and engineering artifacts.",
  openGraph: {
    title: "Jordan Montenegro — Clinical ML & Decision Support",
    description:
      "Clinical ML prototypes with calibration, decision-curve analysis, and safe demos.",
    url: "https://cs-220-portfolio-v3-ljm234.vercel.app",
    siteName: "Jordan Montenegro",
    type: "website",
  },
  robots: "index,follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try{
                  var t = localStorage.getItem('theme');
                  if(t==='dark'){ document.documentElement.classList.add('dark'); }
                }catch(e){}
              })();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
          bg-yellow-300 text-black px-3 py-1 rounded"
        >
          Skip to content
        </a>

        <header className="border-b border-neutral-200/60 dark:border-neutral-800 sticky top-0 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold tracking-tight">Jordan Montenegro</a>
            <nav className="flex items-center gap-4">
              <a href="/about" className="hover:underline">About</a>
              <a href="/research" className="hover:underline">Research</a>
              <a href="/playground" className="hover:underline">Playground</a>
              <a href="/publications" className="hover:underline">Publications</a>
              <a href="/collaborations" className="hover:underline">Collaborations</a>
              <a href="/perf" className="hover:underline">Perf</a>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-7xl px-4 py-10">{children}</main>

        <footer className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800">
          <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-500">
            © {new Date().getFullYear()} Jordan Montenegro — Clinical ML & Decision Support
          </div>
        </footer>
      </body>
    </html>
  );
}
