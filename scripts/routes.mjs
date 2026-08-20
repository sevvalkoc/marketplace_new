// Single source of truth for every route the SPA can render. Used by both
// the sitemap generator and the prerender script, so the two can never
// drift out of sync — add a product/seller/article/category to mockData
// and it automatically gets a route in both places.
//
// Loaded through Vite's own SSR module runner so it can import the app's
// real .ts data file directly, with no separate build step or duplicated
// data.
import { createServer } from 'vite';

export async function loadCatalog() {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    // This only ever loads one plain data module — skip the dependency
    // pre-scan Vite normally runs for a full dev server/HMR session.
    optimizeDeps: { noDiscovery: true, include: [] },
    logLevel: 'error',
  });
  try {
    const mod = await server.ssrLoadModule('/src/app/data/mockData.ts');
    return {
      products: mod.mockProducts,
      categories: mod.mockCategories,
      sellers: mod.mockSellers,
      articles: mod.mockEditArticles,
    };
  } finally {
    await server.close();
  }
}

/**
 * Returns the full list of indexable routes. Each entry's `path` is
 * site-relative (e.g. "/product/1"); `priority` is a sitemap <priority>
 * hint only, not used for anything else.
 */
export async function getIndexableRoutes() {
  const { products, categories, sellers, articles } = await loadCatalog();

  const routes = [
    { path: '/', priority: '1.0' },
    { path: '/shop', priority: '0.9' },
    { path: '/new-arrivals', priority: '0.8' },
    { path: '/brands', priority: '0.8' },
    { path: '/the-edit', priority: '0.8' },
    { path: '/about', priority: '0.5' },
    { path: '/support', priority: '0.4' },
  ];

  for (const c of categories) routes.push({ path: `/category/${c.slug}`, priority: '0.8' });
  for (const s of sellers) routes.push({ path: `/seller/${s.slug}`, priority: '0.7' });
  for (const p of products) routes.push({ path: `/product/${p.id}`, priority: '0.7' });
  for (const a of articles) routes.push({ path: `/the-edit/${a.id}`, priority: '0.6' });

  return routes;
}

/** Routes that must resolve via client-side routing but carry no public
 * search value — prerendered as the plain app shell (not indexed), never
 * given their own static content snapshot. */
export const NON_INDEXABLE_SPA_ROUTES = [
  '/cart', '/checkout', '/wishlist', '/search',
  '/buyer/login', '/buyer/signup', '/buyer/account', '/buyer/orders',
  '/buyer/addresses', '/buyer/payment', '/buyer/settings',
  '/seller/login', '/seller/dashboard', '/seller/add-product', '/seller/products',
  '/seller/orders', '/seller/inventory', '/seller/payouts', '/seller/settings', '/seller/support',
];
