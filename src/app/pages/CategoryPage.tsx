import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ComingSoon } from '../components/ComingSoon';
import { mockProducts, mockCategories, mockEditArticles } from '../data/mockData';
import { useSEO, SITE_URL } from '../lib/useSEO';
import { trackViewItemList } from '../lib/analytics';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const categoryHeroes: Record<string, { headline: string; sub: string; image: string }> = {
  women: {
    headline: 'WOMEN',
    sub: 'Curated wardrobe essentials and statement pieces from the world\'s finest independent labels.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=600&fit=crop',
  },
  men: {
    headline: 'MEN',
    sub: 'Considered clothing and accessories for the design-conscious man.',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1400&h=600&fit=crop',
  },
  home: {
    headline: 'HOME',
    sub: 'Objects that define space. Ceramics, textiles, lighting, and more from independent makers.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1400&h=600&fit=crop',
  },
  beauty: {
    headline: 'BEAUTY',
    sub: 'Clean, botanical, and effective skincare from independent formulators.',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1400&h=600&fit=crop',
  },
  objects: {
    headline: 'OBJECTS',
    sub: 'Sculptural, functional, and beautiful — objects that earn their place.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1400&h=600&fit=crop',
  },
  kids: {
    headline: 'KIDS',
    sub: 'Thoughtful, durable, and beautiful things for little ones.',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1400&h=600&fit=crop',
  },
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  const hero = categoryHeroes[category || ''] || {
    headline: (category || '').toUpperCase(),
    sub: 'Curated products from independent makers.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1400&h=600&fit=crop',
  };

  let products = mockProducts.filter(p => p.category === category);
  const isEmpty = products.length === 0;

  useSEO({
    title: `${hero.headline} | Independent Brands | Studio Marche`,
    description: hero.sub,
    path: `/category/${category}`,
    image: hero.image,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: hero.headline, item: `${SITE_URL}/category/${category}` },
        ],
      },
      ...(products.length > 0 ? [{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/product/${p.id}`,
        })),
      }] : []),
    ],
  });

  if (sort === 'price-asc') products = [...products].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') products = [...products].sort((a, b) => b.price - a.price);
  if (sort === 'newest') products = [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  const otherCategories = mockCategories.filter(c => c.slug !== category).slice(0, 4);

  // Surface Edit stories relevant to this category — either written about it
  // directly, or featuring products that live in it — so readers (and
  // crawlers) have a real editorial path into and out of every category.
  const relatedArticles = mockEditArticles
    .filter(a =>
      a.category.toLowerCase() === category ||
      (a.products || []).some(pid => products.some(p => p.id === pid))
    )
    .slice(0, 2);

  useEffect(() => {
    if (products.length > 0) trackViewItemList(hero.headline, products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={hero.image} alt={hero.headline} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-culte-navy/80 to-culte-navy/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs tracking-widest mb-4">
              <Link to="/" className="hover:text-white transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-white">{hero.headline}</span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl text-white leading-none">{hero.headline}</h1>
            <p className="text-white/70 mt-3 max-w-xl text-sm">{hero.sub}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-culte-navy/10">
          <div className="flex items-center gap-4">
            {!isEmpty && (
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 text-xs text-culte-navy tracking-widest border-2 border-culte-navy/15 px-4 py-2.5 hover:border-culte-navy transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> FILTER
              </button>
            )}
            <p className="text-sm text-culte-black/40">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
          </div>
          {!isEmpty && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-culte-navy/30 tracking-widest hidden sm:block">SORT</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="text-xs text-culte-navy border-2 border-culte-navy/15 px-3 py-2.5 bg-white focus:outline-none focus:border-culte-navy cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Filter panel */}
        {filtersOpen && !isEmpty && (
          <div className="mb-8 p-6 bg-culte-light-blue flex flex-wrap gap-6 items-start">
            <div>
              <p className="text-xs text-culte-navy/40 tracking-widest mb-3">PRICE RANGE</p>
              <div className="flex flex-wrap gap-2">
                {['Under £50', '£50–£100', '£100–£200', 'Over £200'].map(r => (
                  <button
                    key={r}
                    onClick={() => setPriceFilter(priceFilter === r ? null : r)}
                    className={`text-xs px-4 py-2 border-2 transition-colors ${
                      priceFilter === r
                        ? 'bg-culte-navy text-white border-culte-navy'
                        : 'bg-white border-culte-navy/15 text-culte-navy hover:border-culte-navy'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            {priceFilter && (
              <button onClick={() => setPriceFilter(null)} className="flex items-center gap-1 text-xs text-culte-orange">
                <X className="w-3 h-3" /> CLEAR
              </button>
            )}
          </div>
        )}

        {/* Product grid or Coming Soon */}
        {isEmpty ? (
          <div className="mb-16">
            <ComingSoon
              eyebrow={hero.headline}
              title="More on the way."
              description={`We're taking our time finding the right brands for ${hero.headline.toLowerCase()}. New arrivals are reviewed by hand before anything goes live here.`}
              secondaryAction={{ label: 'Browse Everything Else', path: '/shop' }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {/* Related editorial */}
        {relatedArticles.length > 0 && (
          <div className="border-t-2 border-culte-navy/10 pt-16 pb-4">
            <h2 className="font-cormorant text-2xl text-culte-navy mb-8">FROM THE EDIT</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedArticles.map(article => (
                <Link key={article.id} to={`/the-edit/${article.id}`} className="group flex gap-4 items-center">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-culte-light-blue">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div>
                    <p className="text-xs text-culte-orange tracking-widest mb-1">{article.category}</p>
                    <h3 className="font-cormorant text-lg text-culte-navy group-hover:text-culte-orange transition-colors leading-tight">{article.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other categories */}
        <div className="border-t-2 border-culte-navy/10 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-cormorant text-2xl text-culte-navy">EXPLORE OTHER CATEGORIES</h2>
            <Link to="/shop" className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest flex items-center gap-1">
              SHOP ALL <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherCategories.map(cat => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="group relative aspect-[3/4] overflow-hidden block">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-culte-navy/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-cormorant text-lg text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};