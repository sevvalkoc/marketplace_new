import { Link } from 'react-router';
import { Instagram, Twitter, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const columns = [
    {
      heading: 'Shop',
      links: [
        { label: 'New Arrivals', path: '/new-arrivals' },
        { label: 'Women', path: '/category/women' },
        { label: 'Men', path: '/category/men' },
        { label: 'Home & Objects', path: '/category/home' },
        { label: 'Beauty', path: '/category/beauty' },
        { label: 'All Products', path: '/shop' },
      ]
    },
    {
      heading: 'Discover',
      links: [
        { label: 'The Edit', path: '/the-edit' },
        { label: 'Featured Brands', path: '/shop' },
        { label: 'Wishlist', path: '/wishlist' },
        { label: 'New Arrivals', path: '/new-arrivals' },
      ]
    },
    {
      heading: 'Company',
      links: [
        { label: 'About Studio Marche', path: '/about' },
        { label: 'Sustainability', path: '/about' },
        { label: 'Support', path: '/support' },
        { label: 'Shipping & Returns', path: '/support' },
        { label: 'Privacy Policy', path: '/privacy' },
      ]
    },
    {
      heading: 'For Sellers',
      links: [
        { label: 'Apply to Sell', path: '/seller/login' },
        { label: 'Seller Login', path: '/seller/login' },
        { label: 'Resources', path: '/seller/login' },
        { label: 'Commission Structure', path: '/seller/login' },
      ]
    },
  ];

  return (
    <footer className="bg-[#111111] text-white mt-24">

      {/* Newsletter */}
      <div className="border-b border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p
                className="text-white/30 mb-2 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.35em' }}
              >
                Newsletter
              </p>
              <h3
                className="font-cormorant text-white"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 300 }}
              >
                The Edit, delivered.
              </h3>
              <p
                className="text-white/35 mt-1"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}
              >
                New arrivals, curated stories, and exclusive access.
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-white/20" />
                <p
                  className="text-white/50"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.1em' }}
                >
                  You're on the list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-5 py-3.5 focus:outline-none focus:border-white/30"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}
                />
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-3.5 flex-shrink-0 flex items-center gap-2 hover:bg-white/80 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  Join <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="font-cormorant text-white block mb-5 hover:text-white/50 transition-colors"
              style={{ fontSize: '2.2rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              Studio Marche
            </Link>
            <p
              className="text-white/35 leading-relaxed mb-8 max-w-xs"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300 }}
            >
              A home for independent brands and the people behind them.
              Chosen by hand, not by algorithm.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-white transition-colors">
                <Instagram className="w-4 h-4 text-white/50 group-hover:text-white" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-white transition-colors">
                <Twitter className="w-4 h-4 text-white/50" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-white/30 mb-5 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em' }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/40 hover:text-white transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-white/20"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}
          >
            © 2026 Studio Marche. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map(l => (
              <Link
                key={l}
                to="#"
                className="text-white/20 hover:text-white/50 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}
              >
                {l}
              </Link>
            ))}
          </div>
          <p
            className="text-white/12"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
};
