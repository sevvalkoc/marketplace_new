/**
 * Minimal GA4 wrapper, gated entirely behind VITE_GA4_MEASUREMENT_ID.
 *
 * Studio Marche has no GA4 property wired into the codebase at all today —
 * the audit's "wire up analytics events" item can't be completed with real
 * tracking IDs that don't exist yet. This module is the missing plumbing:
 * once a real measurement ID is added to .env (see .env.example), events
 * start flowing with no further code changes. Until then every call here is
 * a no-op, so nothing about the app's behaviour changes and no requests are
 * ever sent to Google with a placeholder/fake ID.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

let initialized = false;

export function initAnalytics() {
  if (initialized || !MEASUREMENT_ID || typeof document === 'undefined') return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID);
}

function track(name: string, params: Record<string, unknown> = {}) {
  if (!MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

/** Fires when a shopper views a single product's detail page. */
export function trackProductView(product: { id: string; name: string; price: number; seller: string; category: string }) {
  track('view_item', {
    currency: 'GBP',
    value: product.price,
    items: [{ item_id: product.id, item_name: product.name, item_brand: product.seller, item_category: product.category, price: product.price }],
  });
}

/** Fires when a shopper opens a category, brand, search-results, or shop-all listing. */
export function trackViewItemList(listName: string, products: { id: string; name: string; price: number; seller: string }[]) {
  track('view_item_list', {
    item_list_name: listName,
    items: products.slice(0, 20).map((p, i) => ({ item_id: p.id, item_name: p.name, item_brand: p.seller, price: p.price, index: i })),
  });
}

/** Fires on every "Add to Bag" action, wherever it happens in the app. */
export function trackAddToCart(item: { id: string; name: string; price: number; seller: string; quantity?: number }) {
  track('add_to_cart', {
    currency: 'GBP',
    value: item.price * (item.quantity ?? 1),
    items: [{ item_id: item.id, item_name: item.name, item_brand: item.seller, price: item.price, quantity: item.quantity ?? 1 }],
  });
}

/** Fires when a shopper submits a site search. */
export function trackSearch(searchTerm: string) {
  track('search', { search_term: searchTerm });
}
