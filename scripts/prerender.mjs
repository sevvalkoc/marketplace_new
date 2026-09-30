// Post-build static render pass — part of the default `build`.
//
// Studio Marché's storefront is a client-side React app (Vite +
// react-router). On its own, `vite build` emits one generic
// dist/index.html: every URL would return the same <title>, the same
// description, and an empty #root until JavaScript runs — so crawlers and
// social-preview bots (Facebook, WhatsApp, Pinterest, Slack…), which mostly
// don't execute JavaScript, would see no product, brand or article content.
//
// This script renders every indexable route of the real app in plain Node
// (react-dom/server, via the SSR bundle built from src/entry-server.tsx) and
// writes a complete HTML document per route: page-specific title,
// description, canonical, Open Graph/Twitter tags, JSON-LD, and the page's
// own markup. No headless browser is involved, so it runs on any build host
// (Vercel, Netlify, CI) with nothing beyond Node. Visitors' browsers then
// boot the normal client bundle on top.
//
// Output layout, alongside dist/index.html (the homepage):
//   dist/<route>.html   e.g. dist/product/1.html → served at /product/1
//                        (Vercel `cleanUrls`; Netlify serves .html natively)
//   dist/404.html       the NotFound page, served with a real 404 status
//   dist/app-shell.html a noindexed, content-free shell for the account-only
//                        routes (cart, checkout, buyer/*, seller dashboard…)
//   dist/sitemap.xml    written by scripts/generate-sitemap.mjs
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Production builds of React/react-router for the render.
process.env.NODE_ENV ??= 'production';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;

function fill(template, head, body) {
  if (!SEO_BLOCK.test(template)) throw new Error('index.html is missing its <!--seo--> markers');
  return template
    .replace(SEO_BLOCK, head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

async function write(file, html) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html, 'utf-8');
}

async function main() {
  const { render, getIndexableRoutes } = await import(pathToFileURL(serverEntry).href);
  const template = await readFile(path.join(distDir, 'index.html'), 'utf-8');
  const routes = getIndexableRoutes();

  for (const { path: routePath } of routes) {
    const { html, seo, head } = await render(routePath);
    if (seo.noindex) throw new Error(`${routePath} is listed as indexable but renders noindex`);
    const file = routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`;
    await write(path.join(distDir, file), fill(template, head, html));
  }

  const notFound = await render('/__not-found__');
  await write(path.join(distDir, '404.html'), fill(template, notFound.head, notFound.html));

  // Account-only routes: the client app renders them (and sets its own
  // noindex), but the raw response must never look like an indexable copy
  // of the homepage.
  const shellHead = [
    '<title>Studio Marché</title>',
    '<meta name="robots" content="noindex, follow" />',
  ].join('\n    ');
  await write(path.join(distDir, 'app-shell.html'), template.replace(SEO_BLOCK, shellHead));

  await rm(path.join(root, 'dist-server'), { recursive: true, force: true });
  console.log(`Prerendered ${routes.length} routes + 404.html + app-shell.html`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
