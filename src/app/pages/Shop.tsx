import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { X, SlidersHorizontal, LayoutGrid, List, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { useSEO } from '../lib/useSEO';

const categories = ['Women', 'Men', 'Home', 'Beauty', 'Objects', 'Kids'];
const priceRanges = [
  { label: 'Under £50', min: 0, max: 50 },
  { label: '£50 – £100', min: 50, max: 100 },
  { label: '£100 – £200', min: 100, max: 200 },
  { label: 'Over £200', min: 200, max: Infinity },
];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const sellers = ['Studio Clay', 'Essential Threads', 'Craft & Co.', 'Pure Botanics', 'Atelier Rose', 'Northern Knit'];

export const Shop = () => {
  useSEO({
    title: 'Shop All | Studio Marche',
    description: 'Browse the full Studio Marche collection — considered pieces from independent brands across home, fashion, beauty, and more.',
    path: '/shop',
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openSections, setOpenSections] = useState<string[]>(['category', 'price', 'brand']);

  const { addToCart } = useCart();

  const toggleSection = (s: string) =>
    setOpenSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleCategory = (cat: string) =>
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  const toggleSeller = (s: string) =>
    setSelectedSellers(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const priceRange = priceRanges.find(p => p.label === selectedPrice);
  let filtered = mockProducts.filter(p => {
    const catMatch = selectedCategories.length === 0 || selectedCategories.map(c => c.toLowerCase()).includes(p.category);
    const priceMatch = !priceRange || (p.price >= priceRange.min && p.price <= priceRange.max);
    const sellerMatch = selectedSellers.length === 0 || selectedSellers.includes(p.seller);
    return catMatch && priceMatch && sellerMatch;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'newest') filtered = [...filtered].filter(p => p.isNew).concat([...filtered].filter(p => !p.isNew));

  const activeFilters = [
    ...selectedCategories,
    ...(selectedPrice ? [selectedPrice] : []),
    ...selectedSellers,
  ];

  const removeFilter = (filter: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== filter));
    setSelectedSellers(prev => prev.filter(s => s !== filter));
    if (selectedPrice === filter) setSelectedPrice(null);
  };

  const FilterSection = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => {
    const isOpen = openSections.includes(id);
    return (
      <div className="border-b border-black/8">
        <button
          onClick={() => toggleSection(id)}
          className="flex items-center justify-between w-full py-4"
        >
          <span className="text-black/50 uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.22em' }}>{label}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-black/30" /> : <ChevronDown className="w-3.5 h-3.5 text-black/30" />}
        </button>
        {isOpen && <div className="pb-4">{children}</div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-black/8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <p className="text-black/30 mb-3 uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.35em' }}>The Collection</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-cormorant text-black" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, lineHeight: '1.0' }}>Shop All</h1>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  className="text-black/40 hover:text-black transition-colors border border-black/15 px-4 py-2 hover:border-black"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Filters Sidebar */}
          <aside className={`lg:w-60 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-culte-navy tracking-wider">REFINE</h3>
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => { setSelectedCategories([]); setSelectedPrice(null); setSelectedSellers([]); }}
                    className="text-xs text-culte-orange hover:text-culte-navy tracking-wider transition-colors"
                  >
                    CLEAR ALL ({activeFilters.length})
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <FilterSection id="category" label="CATEGORY">
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group py-1">
                      <div
                        onClick={() => toggleCategory(cat)}
                        className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                          selectedCategories.includes(cat)
                            ? 'bg-culte-orange border-culte-orange'
                            : 'border-culte-navy/30 group-hover:border-culte-navy'
                        }`}
                      >
                        {selectedCategories.includes(cat) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10 3L5 9 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => toggleCategory(cat)}
                        className={`text-sm transition-colors cursor-pointer flex-1 ${
                          selectedCategories.includes(cat) ? 'text-culte-orange' : 'text-culte-black hover:text-culte-navy'
                        }`}
                      >
                        {cat}
                      </span>
                      <span className="text-xs text-culte-black/30">
                        {mockProducts.filter(p => p.category === cat.toLowerCase()).length}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Price Filter */}
              <FilterSection id="price" label="PRICE">
                <div className="space-y-1">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center gap-3 cursor-pointer group py-1">
                      <div
                        onClick={() => setSelectedPrice(selectedPrice === range.label ? null : range.label)}
                        className={`w-4 h-4 border-2 rounded-full flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                          selectedPrice === range.label
                            ? 'bg-culte-orange border-culte-orange'
                            : 'border-culte-navy/30 group-hover:border-culte-navy'
                        }`}
                      >
                        {selectedPrice === range.label && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span
                        onClick={() => setSelectedPrice(selectedPrice === range.label ? null : range.label)}
                        className={`text-sm transition-colors cursor-pointer ${
                          selectedPrice === range.label ? 'text-culte-orange' : 'text-culte-black hover:text-culte-navy'
                        }`}
                      >
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Brand Filter */}
              <FilterSection id="brand" label="BRAND">
                <div className="space-y-1">
                  {sellers.map((seller) => (
                    <label key={seller} className="flex items-center gap-3 cursor-pointer group py-1">
                      <div
                        onClick={() => toggleSeller(seller)}
                        className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                          selectedSellers.includes(seller)
                            ? 'bg-culte-orange border-culte-orange'
                            : 'border-culte-navy/30 group-hover:border-culte-navy'
                        }`}
                      >
                        {selectedSellers.includes(seller) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10 3L5 9 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => toggleSeller(seller)}
                        className={`text-sm transition-colors cursor-pointer flex-1 ${
                          selectedSellers.includes(seller) ? 'text-culte-orange' : 'text-culte-black hover:text-culte-navy'
                        }`}
                      >
                        {seller}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-culte-navy/10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="lg:hidden flex items-center gap-2 text-xs text-culte-navy tracking-widest border-2 border-culte-navy px-4 py-2 hover:bg-culte-navy hover:text-white transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  FILTERS {activeFilters.length > 0 && `(${activeFilters.length})`}
                </button>
                <p className="text-sm text-culte-black/50">
                  <span className="text-culte-navy">{filtered.length}</span> products
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* View toggle */}
                <div className="hidden sm:flex items-center border-2 border-culte-navy/15">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-culte-navy text-white' : 'text-culte-navy/40 hover:text-culte-navy'}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-culte-navy text-white' : 'text-culte-navy/40 hover:text-culte-navy'}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-culte-navy/40 tracking-widest hidden sm:block">SORT</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="text-xs text-culte-navy border-2 border-culte-navy/20 px-3 py-2 focus:outline-none focus:border-culte-navy bg-white cursor-pointer"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => removeFilter(filter)}
                    className="flex items-center gap-2 bg-culte-navy text-white px-3 py-1.5 text-xs hover:bg-culte-orange transition-colors"
                  >
                    {filter}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Product Grid / List */}
            {filtered.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((product) => (
                    <div key={product.id} className="flex gap-6 border-b border-culte-navy/10 pb-6 group">
                      <Link to={`/product/${product.id}`} className="w-32 h-40 flex-shrink-0 overflow-hidden bg-culte-light-blue">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <Link to={`/seller/${product.sellerSlug}`}>
                            <p className="text-xs text-culte-navy/50 hover:text-culte-orange transition-colors tracking-wider mb-1">{product.seller}</p>
                          </Link>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-culte-black hover:text-culte-orange transition-colors leading-snug">{product.name}</h3>
                          </Link>
                          <p className="text-sm text-culte-black/60 mt-2 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <p className="text-culte-navy">£{product.price.toFixed(2)}</p>
                            {product.isNew && (
                              <span className="inline-block mt-1 bg-culte-orange text-white text-xs px-2 py-0.5">NEW</span>
                            )}
                          </div>
                          <button
                            onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, seller: product.seller, sellerSlug: product.sellerSlug, image: product.image })}
                            className="text-xs text-culte-navy border-2 border-culte-navy px-5 py-2.5 hover:bg-culte-navy hover:text-white transition-colors tracking-widest"
                          >
                            ADD TO BAG
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-24">
                <p className="font-cormorant text-2xl text-culte-navy mb-3">NO PRODUCTS FOUND</p>
                <p className="text-culte-black/50 mb-6">Try adjusting your filters.</p>
                <button
                  onClick={() => { setSelectedCategories([]); setSelectedPrice(null); setSelectedSellers([]); }}
                  className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};