export default function sitemap() {
  const base = "https://YOUR-DOMAIN.example"; // update after deploy
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about` },
    { url: `${base}/research` },
    { url: `${base}/playground` },
    { url: `${base}/publications` },
    { url: `${base}/contact` }
  ];
}
