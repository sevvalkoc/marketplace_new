// Build-time renderer, used only by scripts/prerender.mjs — never shipped to
// the browser. Renders one URL of the real app to static HTML and reports the
// metadata that page set via useSEO, so every public route can be served as
// a complete HTML document on the very first response.
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { routes } from './app/routes';
import { CartProvider } from './app/context/CartContext';
import { WishlistProvider } from './app/context/WishlistContext';
import { SEOCollectorContext, SITE_JSON_LD, SITE_URL, renderHeadTags, type SEOOptions } from './app/lib/useSEO';
import { mockProducts, mockCategories, mockSellers, mockEditArticles } from './app/data/mockData';
import { toISODate } from './app/lib/dates';

export async function render(url: string) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`${SITE_URL}${url}`));
  if (context instanceof Response) throw new Error(`${url} redirected during prerender`);
  const router = createStaticRouter(handler.dataRoutes, context);

  const collector: { current: SEOOptions | null } = { current: null };
  const html = renderToString(
    <SEOCollectorContext.Provider value={collector}>
      <CartProvider>
        <WishlistProvider>
          <StaticRouterProvider router={router} context={context} hydrate={false} />
        </WishlistProvider>
      </CartProvider>
    </SEOCollectorContext.Provider>
  );

  const seo = collector.current;
  if (!seo) throw new Error(`${url} rendered without calling useSEO`);
  // The public storefront (everything under Layout) carries the site-wide
  // Organization/WebSite entities; the bare 404 page does not.
  const inLayout = context.matches.some((m) => m.route.path === '/');
  return { html, seo, head: renderHeadTags(seo, inLayout ? SITE_JSON_LD : []) };
}

/**
 * Every indexable, canonical, 200-status URL — the exact set that gets a
 * prerendered page and a sitemap entry. `lastmod` is included only where the
 * data model holds a genuine date (Edit articles' publication month); no
 * date is ever invented for products, brands or categories.
 */
export function getIndexableRoutes(): { path: string; lastmod?: string }[] {
  return [
    { path: '/' },
    { path: '/shop' },
    { path: '/new-arrivals' },
    { path: '/brands' },
    { path: '/the-edit' },
    { path: '/about' },
    { path: '/support' },
    ...mockCategories.map((c) => ({ path: `/category/${c.slug}` })),
    ...mockSellers.map((s) => ({ path: `/seller/${s.slug}` })),
    ...mockProducts.map((p) => ({ path: `/product/${p.id}` })),
    ...mockEditArticles.map((a) => ({ path: `/the-edit/${a.id}`, lastmod: toISODate(a.date) })),
  ];
}
