import { Link } from 'react-router';
import { Button } from '../components/Button';
import { useSEO } from '../lib/useSEO';

export const NotFound = () => {
  // Client-side routing can't set a real HTTP 404 status itself — that's
  // handled at the hosting layer (this page's prerendered output becomes
  // dist/404.html, served with a genuine 404 status; see vercel.json /
  // public/_redirects). noindex here is defense-in-depth for the same
  // reason every other private/non-content route gets it.
  useSEO({
    title: 'Page Not Found | Studio Marche',
    path: typeof window !== 'undefined' ? window.location.pathname : '/404',
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-xs text-culte-orange tracking-[0.4em] mb-6">404 ERROR</p>
        <h1
          className="font-cormorant text-culte-navy leading-none mb-6"
          style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
        >
          LOST.
        </h1>
        <p className="text-culte-black/60 leading-relaxed mb-10 max-w-sm mx-auto">
          The page you're looking for has moved, or never existed.
          Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/"><Button size="lg">RETURN HOME</Button></Link>
          <Link to="/shop"><Button variant="ghost" size="lg">SHOP THE COLLECTION</Button></Link>
        </div>
      </div>
    </div>
  );
};