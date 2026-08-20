import { useEffect } from 'react';

/**
 * Sets per-route document metadata: title, meta description, canonical link,
 * robots directive, Open Graph / Twitter tags, and (optionally) one or more
 * JSON-LD structured data blocks.
 *
 * This SPA has no server, so this hook is what turns route data into real
 * per-page <head> content. It is combined with a post-build Playwright
 * prerender pass (scripts/prerender.mjs) that snapshots the DOM after this
 * effect has run, so crawlers that never execute JavaScript still receive
 * the correct title/description/canonical/schema in the raw HTML response.
 *
 * `path` must be the site-relative path (e.g. "/category/women") — it is
 * combined with SITE_URL to build the absolute canonical/OG URL, so every
 * template only needs to know its own route, not the domain.
 */

export const SITE_URL = 'https://studiomarche.co.uk';
export const SITE_NAME = 'Studio Marche';

interface SEOOptions {
  title: string;
  description?: string;
  path: string;
  /** Set true for pages with no unique public search value (cart, account, dashboards). */
  noindex?: boolean;
  image?: string;
  /** One or more JSON-LD objects to embed as <script type="application/ld+json">. */
  jsonLd?: object | object[];
}

const DEFAULT_DESCRIPTION =
  'Studio Marche is a curated marketplace for independent brands and small businesses.';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const useSEO = ({ title, description, path, noindex, image, jsonLd }: SEOOptions) => {
  useEffect(() => {
    const desc = description ?? DEFAULT_DESCRIPTION;
    const canonicalUrl = `${SITE_URL}${path}`;
    const robotsContent = noindex ? 'noindex, follow' : 'index, follow';

    document.title = title;
    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'robots', robotsContent);
    upsertLink('canonical', canonicalUrl);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    if (image) upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', desc);
    if (image) upsertMeta('name', 'twitter:image', image);

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      blocks.forEach((block, i) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', String(i));
        script.textContent = JSON.stringify(block);
        document.head.appendChild(script);
        scripts.push(script);
      });
    }

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, path, noindex, image, JSON.stringify(jsonLd)]);
};
