import { Link, useLocation, useNavigate } from 'react-router';
import { Search, ShoppingBag, User, Menu, Heart, X, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const megaMenuConfig: Record<string, {
  columns: { heading: string; links: { label: string; path: string }[] }[];
  featured: { label: string; title: string; image: string; path: string };
}> = {
  women: {
    columns: [
      { heading: 'CLOTHING', links: [
        { label: 'Dresses', path: '/category/women' },
        { label: 'Tops & Shirts', path: '/category/women' },
        { label: 'Trousers', path: '/category/women' },
        { label: 'Knitwear', path: '/category/women' },
        { label: 'Outerwear', path: '/category/women' },
        { label: 'View All Women', path: '/category/women' },
      ]},
      { heading: 'ACCESSORIES', links: [
        { label: 'Bags', path: '/category/women' },
        { label: 'Jewellery', path: '/category/women' },
        { label: 'Scarves', path: '/category/women' },
        { label: 'Footwear', path: '/category/women' },
      ]},
    ],
    featured: {
      label: 'NEW SEASON',
      title: 'SS26 Women',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=700&fit=crop',
      path: '/category/women'
    }
  },
  men: {
    columns: [
      { heading: 'CLOTHING', links: [
        { label: 'Shirts', path: '/category/men' },
        { label: 'Knitwear', path: '/category/men' },
        { label: 'Trousers', path: '/category/men' },
        { label: 'Outerwear', path: '/category/men' },
        { label: 'View All Men', path: '/category/men' },
      ]},
      { heading: 'ACCESSORIES', links: [
        { label: 'Bags & Wallets', path: '/category/men' },
        { label: 'Footwear', path: '/category/men' },
        { label: 'Belts', path: '/category/men' },
        { label: 'Hats', path: '/category/men' },
      ]},
    ],
    featured: {
      label: 'JUST IN',
      title: 'SS26 Men',
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=700&fit=crop',
      path: '/category/men'
    }
  },
  home: {
    columns: [
      { heading: 'LIVING', links: [
        { label: 'Ceramics', path: '/category/home' },
        { label: 'Textiles', path: '/category/home' },
        { label: 'Lighting', path: '/category/home' },
        { label: 'Furniture', path: '/category/home' },
        { label: 'View All Home', path: '/category/home' },
      ]},
      { heading: 'OBJECTS', links: [
        { label: 'Table', path: '/category/objects' },
        { label: 'Kitchen', path: '/category/objects' },
        { label: 'Decor', path: '/category/objects' },
        { label: 'Art', path: '/category/objects' },
      ]},
    ],
    featured: {
      label: 'CURATED',
      title: 'Home Objects',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=700&fit=crop',
      path: '/category/home'
    }
  },
  beauty: {
    columns: [
      { heading: 'SKINCARE', links: [
        { label: 'Serums & Oils', path: '/category/beauty' },
        { label: 'Moisturisers', path: '/category/beauty' },
        { label: 'Cleansers', path: '/category/beauty' },
        { label: 'View All Beauty', path: '/category/beauty' },
      ]},
      { heading: 'WELLNESS', links: [
        { label: 'Body Care', path: '/category/beauty' },
        { label: 'Haircare', path: '/category/beauty' },
        { label: 'Fragrance', path: '/category/beauty' },
        { label: 'Tools', path: '/category/beauty' },
      ]},
    ],
    featured: {
      label: 'CLEAN BEAUTY',
      title: 'Botanical Edit',
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=700&fit=crop',
      path: '/category/beauty'
    }
  }
};

// Rotating announcement messages
const announcements = [
  'Free delivery on orders over £150',
  'New brands joining the studio, weekly',
  'Curated pieces. Selected with care.',
  'Straightforward 30-day returns',
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [announceFading, setAnnounceFading] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const navLinks = [
    { name: 'NEW ARRIVALS', path: '/new-arrivals', mega: null },
    { name: 'WOMEN', path: '/category/women', mega: 'women' },
    { name: 'MEN', path: '/category/men', mega: 'men' },
    { name: 'KIDS', path: '/category/kids', mega: null },
    { name: 'HOME', path: '/category/home', mega: 'home' },
    { name: 'BEAUTY', path: '/category/beauty', mega: 'beauty' },
    { name: 'BRANDS', path: '/shop', mega: null },
    { name: 'THE EDIT', path: '/the-edit', mega: null },
  ];

  // Rotate announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnounceFading(true);
      setTimeout(() => {
        setAnnouncementIdx(i => (i + 1) % announcements.length);
        setAnnounceFading(false);
      }, 350);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNavEnter = (mega: string | null) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(mega);
  };
  const handleNavLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  };
  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    setActiveMega(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const currentMegaData = activeMega ? megaMenuConfig[activeMega] : null;

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#111111] text-white overflow-hidden" style={{ height: '36px' }}>
        <style>{`
          @keyframes ann-fade-in  { from { opacity:0; transform: translateY(6px);  } to { opacity:1; transform: translateY(0); } }
          @keyframes ann-fade-out { from { opacity:1; transform: translateY(0);  } to { opacity:0; transform: translateY(-6px); } }
          .ann-in  { animation: ann-fade-in  0.35s ease both; }
          .ann-out { animation: ann-fade-out 0.35s ease both; }
        `}</style>
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-center">
          <p
            key={announcementIdx}
            className={announceFading ? 'ann-out' : 'ann-in'}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {announcements[announcementIdx]}
          </p>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header className="bg-white border-b border-black/8 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-[70px]">

            {/* Mobile burger */}
            <button
              className="lg:hidden text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-cormorant text-black hover:text-black/60 transition-colors"
              style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Studio Marche
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7" onMouseLeave={handleNavLeave}>
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => handleNavEnter(link.mega)}
                >
                  <Link
                    to={link.path}
                    className={`transition-colors py-1 ${
                      location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                        ? 'text-black border-b border-black'
                        : 'text-black/50 hover:text-black'
                    }`}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.68rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-black/50 hover:text-black transition-colors hidden md:block"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <Link to="/wishlist" className="text-black/50 hover:text-black transition-colors hidden md:block relative" aria-label="Wishlist">
                <Heart className="w-[18px] h-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[9px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/buyer/account" className="text-black/50 hover:text-black transition-colors" aria-label="Account">
                <User className="w-[18px] h-[18px]" />
              </Link>
              <Link to="/cart" className="text-black/50 hover:text-black transition-colors relative" aria-label="Cart">
                <ShoppingBag className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[9px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t border-black/8">
              <form onSubmit={handleSearch} className="flex items-center">
                <Search className="w-4 h-4 text-black/30 ml-0 flex-shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, categories…"
                  className="flex-1 px-4 py-4 bg-transparent text-black placeholder:text-black/30 focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="px-4 text-black/30 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ── MEGA MENU ── */}
        {currentMegaData && activeMega && (
          <div
            className="absolute left-0 right-0 bg-white border-t border-b border-black/8 shadow-sm z-50"
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleNavLeave}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-5 gap-8">
              {currentMegaData.columns.map((col, i) => (
                <div key={i}>
                  <h4
                    className="text-black/30 mb-5 uppercase"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em' }}
                  >
                    {col.heading}
                  </h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.path}
                          className="text-black/60 hover:text-black transition-colors block"
                          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Makers column */}
              <div>
                <h4
                  className="text-black/30 mb-5 uppercase"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em' }}
                >
                  Makers
                </h4>
                <ul className="space-y-2.5">
                  <li><Link to="/seller/studio-clay" className="text-black/60 hover:text-black transition-colors block" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Studio Clay</Link></li>
                  <li><Link to="/seller/essential-threads" className="text-black/60 hover:text-black transition-colors block" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Essential Threads</Link></li>
                  <li><Link to="/seller/atelier-rose" className="text-black/60 hover:text-black transition-colors block" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Atelier Rose</Link></li>
                  <li><Link to="/seller/craft-co" className="text-black/60 hover:text-black transition-colors block" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>Craft & Co.</Link></li>
                  <li className="pt-2">
                    <Link
                      to="/shop"
                      className="text-black flex items-center gap-1.5 hover:gap-2.5 transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                    >
                      All Makers <ArrowRight className="w-3 h-3" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Featured image */}
              <div>
                <Link to={currentMegaData.featured.path} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-[#F4F4F2]">
                    <img
                      src={currentMegaData.featured.image}
                      alt={currentMegaData.featured.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-3">
                    <p
                      className="text-black/40 mb-1 uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em' }}
                    >
                      {currentMegaData.featured.label}
                    </p>
                    <p
                      className="font-cormorant text-black"
                      style={{ fontSize: '1.1rem', fontWeight: 400 }}
                    >
                      {currentMegaData.featured.title}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex justify-between items-center px-6 h-16 border-b border-black/8">
            <Link
              to="/"
              className="font-cormorant text-black"
              style={{ fontSize: '1.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Studio Marche
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile search */}
          <div className="px-6 py-4 border-b border-black/8">
            <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }} className="flex items-center gap-3 bg-[#F4F4F2] px-4 py-3">
              <Search className="w-4 h-4 text-black/30 flex-shrink-0" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                className="flex-1 bg-transparent text-black placeholder:text-black/30 focus:outline-none"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}
              />
            </form>
          </div>

          <nav className="flex flex-col px-6 pb-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-5 border-b border-black/8 flex items-center justify-between ${
                  location.pathname === link.path ? 'text-black' : 'text-black/50 hover:text-black'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                {link.name}
                <ArrowRight className="w-3.5 h-3.5 opacity-30" />
              </Link>
            ))}

            <div className="mt-10 space-y-3">
              <Link
                to="/buyer/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block border border-black text-black text-center py-3.5 hover:bg-black hover:text-white transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                My Account
              </Link>
              <Link
                to="/seller/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-black text-white text-center py-3.5 hover:bg-black/80 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                Sell on Studio Marche
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
