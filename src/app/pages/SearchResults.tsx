import { useSearchParams, Link } from 'react-router';
import { Search, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts, mockSellers, mockCategories } from '../data/mockData';
import { useSEO } from '../lib/useSEO';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Search results are user-generated, unbounded-query pages with no stable
  // content — always noindex so they never compete with or duplicate the
  // category/brand/product pages they surface.
  useSEO({
    title: query ? `"${query}" | Search | Studio Marche` : 'Search | Studio Marche',
    description: 'Search Studio Marche for products, brands, and categories from independent makers.',
    path: '/search',
    noindex: true,
  });

  const productResults = mockProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.seller.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  const sellerResults = mockSellers.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.description.toLowerCase().includes(query.toLowerCase())
  );

  const categoryResults = mockCategories.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = productResults.length + sellerResults.length + categoryResults.length;

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header */}
      <div className="border-b-2 border-culte-navy">
        <div className="max-w-[1400px] mx-auto px-6 py-10">
          <div className="flex items-center gap-4 mb-4">
            <Search className="w-6 h-6 text-culte-navy/30 flex-shrink-0" />
            <h1 className="font-cormorant text-4xl lg:text-5xl text-culte-navy">{query || 'SEARCH'}</h1>
          </div>
          {query && (
            <p className="text-culte-black/50 text-sm">
              {totalResults} {totalResults === 1 ? 'result' : 'results'} for "<strong className="text-culte-navy">{query}</strong>"
            </p>
          )}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {!query ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-culte-navy/10 mx-auto mb-6" />
            <p className="font-cormorant text-xl text-culte-navy mb-2">WHAT ARE YOU LOOKING FOR?</p>
            <p className="text-culte-black/50">Try searching for a product, brand, or category.</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-20">
            <p className="font-cormorant text-2xl text-culte-navy mb-3">NO RESULTS FOUND</p>
            <p className="text-culte-black/50 mb-8">Try a different search term or browse our categories.</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-2xl mx-auto">
              {mockCategories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="border-2 border-culte-navy/15 hover:border-culte-orange hover:text-culte-orange text-xs text-culte-navy text-center py-3 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Category results */}
            {categoryResults.length > 0 && (
              <section>
                <h2 className="font-cormorant text-lg text-culte-navy mb-4">CATEGORIES</h2>
                <div className="flex flex-wrap gap-3">
                  {categoryResults.map(cat => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-3 border-2 border-culte-navy/15 hover:border-culte-orange group px-5 py-3 transition-colors"
                    >
                      <div className="w-10 h-10 overflow-hidden">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm text-culte-navy group-hover:text-culte-orange transition-colors">{cat.name}</p>
                        <p className="text-xs text-culte-black/40">{cat.productCount} products</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-culte-navy/20 group-hover:text-culte-orange ml-2 transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Seller results */}
            {sellerResults.length > 0 && (
              <section>
                <h2 className="font-cormorant text-lg text-culte-navy mb-4">MAKERS</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {sellerResults.map(seller => (
                    <Link
                      key={seller.slug}
                      to={`/seller/${seller.slug}`}
                      className="flex items-center gap-4 border-2 border-culte-navy/10 hover:border-culte-orange p-4 transition-colors group"
                    >
                      <div className="w-14 h-14 overflow-hidden bg-culte-light-blue flex-shrink-0">
                        <img src={seller.image} alt={seller.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-culte-navy group-hover:text-culte-orange transition-colors">{seller.name}</p>
                        <p className="text-xs text-culte-black/40 mt-0.5">{seller.location}</p>
                        <p className="text-xs text-culte-black/60 mt-1 truncate">{seller.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Product results */}
            {productResults.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-cormorant text-lg text-culte-navy">
                    PRODUCTS <span className="text-culte-navy/30">({productResults.length})</span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                  {productResults.map(product => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};