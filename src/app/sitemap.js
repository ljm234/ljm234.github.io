export default function sitemap() {
  const base = "https://cs-220-portfolio-v3-ljm234.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about` },
    { url: `${base}/research` },
    { url: `${base}/playground` },
    { url: `${base}/publications` },
    { url: `${base}/collaborations` },
    { url: `${base}/perf` },
    { url: `${base}/contact` }
  ];
}
