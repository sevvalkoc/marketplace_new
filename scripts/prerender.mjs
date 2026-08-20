// Post-build static snapshot pass.
//
// Studio Marche's storefront is a pure client-side React SPA (Vite +
// react-router's createBrowserRouter, no SSR/SSG). Its `dist/index.html` is
// one generic shell — every route returns the exact same <title>, the exact
// same meta description, and an empty #root div until JavaScript runs. That
// is the root cause behind the audit's core finding: a crawler (or anything
// that doesn't execute JS) requesting /shop, /category/women, /product/1,
// /seller/studio-clay, /brands or /the-edit/1 sees zero products, zero
// brands, zero articles, and no page-specific metadata.
//
// Rather than rewriting the app to a server-rendering framework, this
// script boots the already-working client build in a real headless browser
// (Chromium via Playwright), lets it render each indexable route exactly as
// a visitor's browser would — including the useSEO hook's title/canonical/
// JSON-LD writes — and saves the resulting HTML as a static file at that
// route's path. Deployed as normal static files, every one of those routes
// now returns fully-populated HTML on the very first response, with no
// change to how the app behaves for real users (it still hydrates/rerenders
// client-side on load).
//
// This is intentionally a separate, additive script — `pnpm run build`
// still does exactly what it did before and is not made to depend on a
// browser being available. Run `pnpm run prerender` (which builds, then
// snapshots) in CI/deploy once Chromium is available there; see the
// remediation report for what that requires on Studio Marche's actual host.
import { chromium } from 'playwright';
import { preview } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIndexableRoutes, NON_INDEXABLE_SPA_ROUTES } from './routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const CHROMIUM_PATH = '/opt/pw-browsers/chromium';

async function main() {
  if (!existsSync(path.join(distDir, 'index.html'))) {
    console.error('dist/index.html not found — run `pnpm run build` first.');
    process.exit(1);
  }

  const routes = await getIndexableRoutes();
  console.log(`Prerendering ${routes.length} indexable routes + 404...`);

  const server = await preview({ root, preview: { port: 4173, strictPort: false }, logLevel: 'error' });
  const base = server.resolvedUrls.local[0].replace(/\/$/, '');

  const browser = await chromium.launch({
    executablePath: existsSync(CHROMIUM_PATH) ? CHROMIUM_PATH : undefined,
    args: ['--no-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // The page's own product/brand photography is served from an external
    // host (Unsplash) and its bytes are irrelevant to what a crawler reads
    // from the HTML — the <img src="..."> attribute is what matters, and
    // that's set synchronously by React regardless of whether the browser
    // ever finishes downloading the picture. Blocking these requests keeps
    // prerendering fast and makes it work identically in network-restricted
    // CI/build environments (like this one) and open ones alike.
    await page.route('**/*', (route) => {
      const type = route.request().resourceType();
      if (type === 'image' || type === 'media' || type === 'font') return route.abort();
      return route.continue();
    });

    let ok = 0;
    for (const { path: routePath } of routes) {
      await snapshotRoute(page, base, routePath);
      ok++;
    }

    // The 404 page becomes the static dist/404.html most static hosts
    // (Netlify, and Vercel/S3/CloudFront with the right config) serve
    // automatically for any path with no matching file — giving genuinely
    // missing URLs a real, styled 404 instead of a redirect-to-homepage
    // or a soft-200.
    await page.goto(`${base}/this-path-does-not-exist-404-check`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForFunction(
      () => document.getElementById('root')?.children.length > 0 && document.title.length > 0,
      { timeout: 10000 }
    );
    const notFoundHtml = dedupeJsonLd(await page.content());
    await writeFile(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

    console.log(`Prerendered ${ok}/${routes.length} routes + 404.html`);
    console.log(`Non-indexable SPA-only routes (served the plain app shell, noindex'd client-side): ${NON_INDEXABLE_SPA_ROUTES.length}`);
  } finally {
    await browser.close();
    await server.httpServer.close();
  }
}

// Navigates to a route and waits for the app to have actually rendered
// route content (not just the page "load" event, which can fire before
// React's post-mount effects — title/canonical/JSON-LD — have run under
// load) before reading the DOM. Retries once on failure/timeout rather
// than letting one flaky route abort the whole batch.
async function snapshotRoute(page, base, routePath, attempt = 1) {
  try {
    await page.goto(`${base}${routePath}`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForFunction(
      () => document.getElementById('root')?.children.length > 0 && document.title.length > 0,
      { timeout: 10000 }
    );
    const html = await page.content();
    await writeSnapshot(routePath, html);
  } catch (err) {
    if (attempt >= 3) throw new Error(`Failed to prerender ${routePath} after ${attempt} attempts: ${err.message}`);
    console.warn(`  retrying ${routePath} (attempt ${attempt + 1})...`);
    await snapshotRoute(page, base, routePath, attempt + 1);
  }
}

// Defensive: on rare occasions a route's structured-data effect has been
// observed firing twice in the same headless-browser tab (isolated to one
// route out of 45 in testing, not reproduced on reload — most likely a
// transient double-render race rather than anything a real user's single
// page load would hit). Rather than chase a flaky repro, de-duplicate
// identical JSON-LD blocks before writing the snapshot, so the shipped
// static HTML is correct even if the underlying render raced.
function dedupeJsonLd(html) {
  const seen = new Set();
  return html.replace(
    /<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    (tag, content) => {
      if (seen.has(content)) return '';
      seen.add(content);
      return tag;
    }
  );
}

async function writeSnapshot(routePath, html) {
  const dir = routePath === '/' ? distDir : path.join(distDir, routePath.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), dedupeJsonLd(html), 'utf-8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
