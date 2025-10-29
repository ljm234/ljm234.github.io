// src/app/layout.jsx
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

import ViewTransitions from "@/components/effects/ViewTransitions";
import TopProgress from "@/components/effects/TopProgress";

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
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher",
    description: "ML/AI prototypes with calibration, decision-curve analysis, and safe demos.",
    images: ["/og"],
  },
  robots: "index,follow",
  alternates: { canonical: "/" },

  // ⬇⬇⬇ ADDED: tell Next/OG what favicon to use
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const THEME_INIT = `
try {
  var s = localStorage.getItem('theme');
  var mode = s ? s : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  var root = document.documentElement;
  if (mode === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* ⬇⬇⬇ ADDED: old-school favicon link for browsers that ignore metadata.icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <style id="prepaint">{`html{color-scheme: light dark}
@media (prefers-color-scheme: dark){html{background:#0a0a0a}}
@media (prefers-color-scheme: light){html{background:#ffffff}}
`}</style>
        <style>{`
:root::view-transition-old(root), :root::view-transition-new(root) {
  animation-duration: 180ms;
  animation-timing-function: cubic-bezier(.2,.8,.2,1);
}
`}</style>
      </head>
      <body className="min-h-screen overflow-x-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <TopProgress />
        <SiteHeader />
        <ViewTransitions />
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
