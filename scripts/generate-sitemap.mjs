// Writes dist/sitemap.xml from the same route list the prerender uses
// (getIndexableRoutes in src/entry-server.tsx), so the sitemap only ever
// lists canonical, indexable, 200-status URLs — the exact set that gets a
// real static HTML page. No redirected, 404, noindex, duplicate or
// parameter URLs are ever included.
//
// <lastmod> is emitted only where the data holds a genuine date (Edit
// articles). Products, brands and categories carry no last-updated
// timestamp yet, and a made-up or build-time date would teach Google to
// ignore lastmod for the whole site. <priority>/<changefreq> are omitted:
// Google ignores both.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Production builds of React/react-router for the render.
process.env.NODE_ENV ??= 'production';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://studiomarche.co.uk';

async function main() {
  const { getIndexableRoutes } = await import(
    pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href
  );
  const routes = getIndexableRoutes();

  const urls = routes
    .map((r) => {
      const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${SITE_URL}${r.path}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(root, 'dist', 'sitemap.xml'), xml, 'utf-8');
  console.log(`Wrote sitemap.xml with ${routes.length} URLs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
