import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SITE_URL, SITE_NAME } from '../lib/useSEO';

// Site-wide Organization + WebSite structured data. Injected once, on every
// page, rather than per-route — this is the entity graph Google uses to
// understand "Studio Marche" as a brand independent of any single page.
// Only fields with a real, verified value are included: no logo (no brand
// logo asset exists in this codebase yet) and no sameAs social links (the
// footer's Instagram/Twitter links are still placeholder "#" hrefs — see
// remediation report).
function useOrganizationSchema() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'organization');
    script.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
    ]);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
}

export const Layout = () => {
  useOrganizationSchema();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
