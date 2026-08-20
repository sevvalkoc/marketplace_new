// Writes dist/sitemap.xml from the same route manifest the prerender script
// uses, so the sitemap only ever lists canonical, indexable, 200-status
// URLs — the exact set that gets a real static HTML snapshot. No redirected,
// 404, noindex, duplicate, or tracking-parameter URLs are ever included, and
// no lastmod is fabricated: this app's data model carries no genuine
// last-updated timestamp for any product/category/seller/article, so the
// field is simply omitted rather than filled with a fake date.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIndexableRoutes } from './routes.mjs';
import { SITE_URL } from './seo-constants.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

async function main() {
  const routes = await getIndexableRoutes();

  const urls = routes
    .map(
      (r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  await writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`Wrote sitemap.xml with ${routes.length} URLs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
