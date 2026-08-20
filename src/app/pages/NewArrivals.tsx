import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts, mockCategories } from '../data/mockData';
import { useSEO } from '../lib/useSEO';

export const NewArrivals = () => {
  useSEO({
    title: 'New Arrivals | Studio Marche',
    description: 'The latest additions to Studio Marche, hand-selected from independent makers across home, fashion, beauty, and more.',
    path: '/new-arrivals',
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const newProducts = mockProducts.filter(p => p.isNew);
  const filtered = activeCategory
    ? newProducts.filter(p => p.category === activeCategory)
    : newProducts;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-culte-navy py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">JUST LANDED</p>
              <h1 className="font-cormorant text-6xl lg:text-8xl text-white leading-none">NEW ARRIVALS</h1>
            </div>
            <p className="text-white/60 max-w-xs text-sm leading-relaxed">
              The latest additions to Studio Marche — hand-selected from our global network of independent makers.
            </p>
          </div>

          {/* Drop badge */}
          <div className="mt-10 inline-flex items-center gap-3 border border-white/20 px-6 py-3">
            <div className="w-2 h-2 bg-culte-orange rounded-full animate-pulse" />
            <span className="text-xs text-white/80 tracking-widest">UPDATED WEEKLY — APRIL 2026</span>
          </div>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="border-b-2 border-culte-navy sticky top-[4.5rem] z-30 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 px-6 py-4 text-xs tracking-widest border-b-2 transition-colors ${
                activeCategory === null ? 'border-culte-orange text-culte-orange' : 'border-transparent text-culte-navy/50 hover:text-culte-navy'
              }`}
            >
              ALL ({newProducts.length})
            </button>
            {mockCategories.map(cat => {
              const count = newProducts.filter(p => p.category === cat.slug).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`flex-shrink-0 px-6 py-4 text-xs tracking-widest border-b-2 transition-colors ${
                    activeCategory === cat.slug ? 'border-culte-orange text-culte-orange' : 'border-transparent text-culte-navy/50 hover:text-culte-navy'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <p className="text-culte-black/40 text-sm mb-8">{filtered.length} new products</p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-cormorant text-xl text-culte-navy mb-3">NO NEW ARRIVALS IN THIS CATEGORY</p>
            <button onClick={() => setActiveCategory(null)} className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5">
              VIEW ALL NEW ARRIVALS
            </button>
          </div>
        )}
      </div>

      {/* CTA: explore more */}
      <div className="border-t-2 border-culte-navy/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">MORE TO EXPLORE</p>
          <h2 className="font-cormorant text-3xl text-culte-navy mb-8">Browse the Full Collection</h2>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-culte-navy text-white px-10 py-4 text-sm hover:bg-culte-orange transition-colors tracking-widest"
          >
            SHOP ALL <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};