import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SITE_JSON_LD } from '../lib/useSEO';

// Site-wide Organization + WebSite structured data, on every page. The
// prerendered HTML already carries a copy (see scripts/prerender.mjs); that
// static copy is removed on boot in main.tsx so this never duplicates it.
function useOrganizationSchema() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'organization');
    script.textContent = JSON.stringify(SITE_JSON_LD);
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
