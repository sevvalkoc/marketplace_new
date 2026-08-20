import { Link } from 'react-router';
import { MapPin, ArrowRight } from 'lucide-react';
import { mockSellers, mockProducts } from '../data/mockData';
import { useSEO, SITE_URL } from '../lib/useSEO';

export const BrandDirectory = () => {
  useSEO({
    title: 'Brand Directory | Independent Makers | Studio Marche',
    description: 'Every independent brand and maker on Studio Marche, in one place — from Portland ceramics studios to Florentine leather ateliers.',
    path: '/brands',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Brand Directory',
        url: `${SITE_URL}/brands`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: mockSellers.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/seller/${s.slug}`,
          name: s.name,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Brands', item: SITE_URL + '/brands' },
        ],
      },
    ],
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-culte-navy py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">EVERY MAKER, IN ONE PLACE</p>
          <h1 className="font-cormorant text-6xl lg:text-8xl text-white leading-none">BRANDS.</h1>
          <p className="text-white/60 leading-relaxed max-w-lg mt-6">
            Independent brands and makers, chosen by hand. Each one reviewed by our curation
            team before their first piece ever reaches Studio Marche.
          </p>
        </div>
      </div>

      {/* Directory grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockSellers.map((seller) => {
            const productCount = mockProducts.filter(p => p.sellerSlug === seller.slug).length;
            return (
              <Link key={seller.slug} to={`/seller/${seller.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-culte-light-blue mb-4">
                  <img
                    src={seller.coverImage}
                    alt={seller.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 overflow-hidden bg-culte-light-blue flex-shrink-0">
                    <img src={seller.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-cormorant text-xl text-culte-navy group-hover:text-culte-orange transition-colors">
                      {seller.name}
                    </h2>
                    <p className="text-culte-black/40 flex items-center gap-1.5 mt-0.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
                      <MapPin className="w-3 h-3" /> {seller.location}
                    </p>
                  </div>
                </div>
                <p className="text-culte-black/60 mt-3 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                  {seller.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-2">
                    {seller.categories.map(cat => (
                      <span key={cat} className="text-xs text-culte-navy border border-culte-navy/20 px-2.5 py-1">{cat}</span>
                    ))}
                  </div>
                  <span className="text-culte-black/30" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>
                    {productCount} {productCount === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-culte-navy group-hover:text-culte-orange transition-colors tracking-widest">
                  VIEW BRAND <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
