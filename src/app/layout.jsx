import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  metadataBase: new URL("https://cs-220-portfolio-v3-ljm234.vercel.app"),
  title: {
    default: "Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher",
    template: "%s — Jordan Montenegro",
  },
  description: "Portfolio with research, demos, and AI/ML artifacts.",
  openGraph: {
    title: "Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher",
    description: "ML/AI prototypes with calibration, decision-curve analysis, and safe demos.",
    url: "/",
    siteName: "Jordan Montenegro",
    type: "website",
    images: ["/og"], // dynamic OG image route
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher",
    description: "ML/AI prototypes with calibration, decision-curve analysis, and safe demos.",
    images: ["/og"], // same dynamic image for Twitter
  },
  alternates: { canonical: "/" },
  robots: "index,follow",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash before hydration */}
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

        <SiteHeader />

        <main id="main" className="mx-auto max-w-7xl px-4 py-10">
          {children}
        </main>

        <footer className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800">
          <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-500">
            © {new Date().getFullYear()} Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher
          </div>
        </footer>
      </body>
    </html>
  );
}
