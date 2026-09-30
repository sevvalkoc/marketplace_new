import { createContext, useContext, useEffect } from 'react';

/**
 * Sets per-route document metadata: title, meta description, canonical link,
 * robots directive, Open Graph / Twitter tags, and (optionally) one or more
 * JSON-LD structured data blocks.
 *
 * It works in two modes from the same call:
 *  - In the browser, an effect writes the tags into <head> as the visitor
 *    navigates between routes.
 *  - During the build-time prerender (src/entry-server.tsx), effects never
 *    run, so the options are instead recorded into SEOCollectorContext while
 *    the page renders. scripts/prerender.mjs turns them into static <head>
 *    tags with renderHeadTags() below, so crawlers and social-preview bots
 *    that never execute JavaScript still get the page's real metadata.
 *
 * `path` must be the site-relative path (e.g. "/category/women") — it is
 * combined with SITE_URL to build the absolute canonical/OG URL, so every
 * template only needs to know its own route, not the domain.
 */

export const SITE_URL = 'https://studiomarche.co.uk';
export const SITE_NAME = 'Studio Marché';

// Shared fallback preview image for pages without a more specific one of
// their own — the homepage's lead hero photograph.
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1692116716561-953cc9a868b6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=1200&h=630';

export interface SEOOptions {
  title: string;
  description?: string;
  path: string;
  /** Set true for pages with no unique public search value (cart, account, dashboards). */
  noindex?: boolean;
  image?: string;
  /** Open Graph object type. Defaults to "website". */
  type?: 'website' | 'article' | 'product';
  /** One or more JSON-LD objects to embed as <script type="application/ld+json">. */
  jsonLd?: object | object[];
}

const DEFAULT_DESCRIPTION =
  'Studio Marché is a curated marketplace for independent brands — considered fashion, homeware, beauty and objects, each one chosen by hand.';

/** Site-wide Organization + WebSite entities. Only fields with a real,
 * verified value are included: no logo (no brand logo asset exists in this
 * codebase yet) and no sameAs social links (the footer's social links are
 * still placeholder "#" hrefs). */
export const SITE_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en-GB',
    publisher: { '@id': `${SITE_URL}/#organization` },
    // No SearchAction: Google retired the sitelinks search box it powered
    // (Nov 2024), and /search is disallowed in robots.txt anyway.
  },
];

/**
 * Shortens copy for a meta description without cutting mid-word: keeps
 * whole sentences where they fit, otherwise breaks at the last full word
 * and adds an ellipsis.
 */
export function summarise(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]+/g) || [];
  let out = '';
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  if (out.trim().length >= 70) return out.trim();
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—–-]+$/, '')}…`;
}

const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);

/** "THE NEW CERAMICS" → "The New Ceramics". For display-uppercase copy that
 * is reused in a <title>, where all-caps reads as shouting in search results. */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((w, i) => (i > 0 && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

interface ResolvedSEO {
  title: string;
  meta: { attr: 'name' | 'property'; key: string; content: string }[];
  canonical: string;
  jsonLd: object[];
}

function resolve({ title, description, path, noindex, image, type, jsonLd }: SEOOptions): ResolvedSEO {
  const desc = description ?? DEFAULT_DESCRIPTION;
  const canonical = `${SITE_URL}${path}`;
  const img = image ?? DEFAULT_OG_IMAGE;
  return {
    title,
    canonical,
    meta: [
      { attr: 'name', key: 'description', content: desc },
      { attr: 'name', key: 'robots', content: noindex ? 'noindex, follow' : 'index, follow' },
      { attr: 'property', key: 'og:title', content: title },
      { attr: 'property', key: 'og:description', content: desc },
      { attr: 'property', key: 'og:url', content: canonical },
      { attr: 'property', key: 'og:type', content: type ?? 'website' },
      { attr: 'property', key: 'og:site_name', content: SITE_NAME },
      { attr: 'property', key: 'og:locale', content: 'en_GB' },
      { attr: 'property', key: 'og:image', content: img },
      { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
      { attr: 'name', key: 'twitter:title', content: title },
      { attr: 'name', key: 'twitter:description', content: desc },
      { attr: 'name', key: 'twitter:image', content: img },
    ],
    jsonLd: jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [],
  };
}

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// "</script" inside a JSON string would end the tag early; "<" is always
// safe to escape as < inside JSON.
const escapeJson = (o: object) => JSON.stringify(o).replace(/</g, '\\u003c');

/** Static <head> markup for one page — used by the build-time prerender. */
export function renderHeadTags(options: SEOOptions, siteJsonLd: object[] = []): string {
  const r = resolve(options);
  return [
    `<title>${escapeAttr(r.title)}</title>`,
    ...r.meta.map((m) => `<meta ${m.attr}="${m.key}" content="${escapeAttr(m.content)}" />`),
    // A noindexed page must not also claim to be the canonical version of
    // anything — mixed signals Google explicitly warns against.
    ...(options.noindex ? [] : [`<link rel="canonical" href="${escapeAttr(r.canonical)}" />`]),
    ...[...siteJsonLd, ...r.jsonLd].map(
      (b) => `<script type="application/ld+json" data-seo-ssr>${escapeJson(b)}</script>`
    ),
  ].join('\n    ');
}

/** Filled in by the build-time prerender; null in the browser. */
export const SEOCollectorContext = createContext<{ current: SEOOptions | null } | null>(null);

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string | null) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const useSEO = (options: SEOOptions) => {
  const collector = useContext(SEOCollectorContext);
  // Render-time, not in an effect: the prerender never runs effects. The
  // innermost page to render wins, which is the one that owns the route.
  if (collector) collector.current = options;

  const { title, description, path, noindex, image, type, jsonLd } = options;
  useEffect(() => {
    const r = resolve(options);
    document.title = r.title;
    r.meta.forEach((m) => upsertMeta(m.attr, m.key, m.content));
    setCanonical(noindex ? null : r.canonical);

    const scripts = r.jsonLd.map((block, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', String(i));
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
      return script;
    });
    return () => scripts.forEach((s) => s.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, noindex, image, type, JSON.stringify(jsonLd)]);
};
