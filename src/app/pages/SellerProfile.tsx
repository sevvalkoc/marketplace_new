import { useParams, Link } from 'react-router';
import { ArrowLeft, Star, MapPin, Package, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { ComingSoon } from '../components/ComingSoon';
import { mockSellers, mockProducts } from '../data/mockData';
import { useShopifyProducts } from '../lib/shopify';
import { usePageMeta } from '../lib/usePageMeta';

export const SellerProfile = () => {
  const { slug } = useParams();
  const seller = mockSellers.find(s => s.slug === slug) || mockSellers[0];

  usePageMeta({
    title: `${seller.name} | Studio Marche`,
    description: seller.description,
  });

  const manualProducts = mockProducts.filter(p => p.sellerSlug === seller.slug);

  const primaryCategory = (seller.categories[0] || 'objects').toLowerCase();
  const shopify = useShopifyProducts(seller.slug, primaryCategory);

  // If this brand is connected to Shopify, their live feed takes priority.
  // Manually-entered products still show if Shopify returns nothing or fails,
  // so a sync hiccup never empties a seller's whole page.
  const allProducts = shopify.isShopifyConnected && shopify.products.length > 0
    ? shopify.products
    : manualProducts;

  return (
    <div className="bg-white min-h-screen">
      {/* Cover Image */}
      <div className="relative h-72 md:h-96 overflow-hidden bg-culte-light-blue">
        <img
          src={seller.coverImage}
          alt={seller.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-culte-navy/60 to-transparent" />

        {/* Back link */}
        <div className="absolute top-6 left-6">
          <Link
            to="/shop"
            className="flex items-center gap-2 text-white text-xs tracking-widest hover:text-culte-orange transition-colors bg-white/10 backdrop-blur-sm px-4 py-2"
          >
            <ArrowLeft className="w-3 h-3" /> BACK TO SHOP
          </Link>
        </div>

        {/* Seller name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">VERIFIED MAKER</p>
            <h1 className="font-cormorant text-4xl md:text-6xl text-white">{seller.name}</h1>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-6 py-6 border-b-2 border-culte-navy/10">
          <div className="flex items-center gap-2 text-culte-black/60">
            <MapPin className="w-4 h-4 text-culte-navy" />
            <span className="text-sm">{seller.location}</span>
          </div>
          <div className="flex items-center gap-2 text-culte-black/60">
            <Package className="w-4 h-4 text-culte-navy" />
            <span className="text-sm">{seller.productCount} Products</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i <= Math.floor(seller.rating) ? 'text-culte-orange fill-current' : 'text-culte-navy/20'}`}
                />
              ))}
            </div>
            <span className="text-sm text-culte-black/60">{seller.rating} ({seller.reviewCount} reviews)</span>
          </div>
          <div className="ml-auto hidden md:flex gap-3">
            {seller.categories.map(cat => (
              <span key={cat} className="text-xs text-culte-navy border border-culte-navy/20 px-3 py-1">{cat.toUpperCase()}</span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-12 py-12">
          {/* Left: About */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {/* Avatar */}
              <div className="w-24 h-24 overflow-hidden bg-culte-light-blue mb-6">
                <img src={seller.image} alt={seller.name} className="w-full h-full object-cover" />
              </div>

              <h2 className="font-cormorant text-xl text-culte-navy mb-4">ABOUT THE MAKER</h2>
              <p className="text-culte-black/70 leading-relaxed">{seller.bio}</p>

              <div className="mt-8 space-y-3">
                <Link to="/shop">
                  <Button fullWidth>FOLLOW BRAND</Button>
                </Link>
                <Link to="/shop" className="block">
                  <Button variant="ghost" fullWidth className="flex items-center justify-center gap-2">
                    VISIT COLLECTION <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Brand highlights */}
              <div className="mt-10 p-6 bg-culte-light-blue space-y-4">
                <h3 className="text-xs text-culte-navy tracking-widest">BRAND NOTES</h3>
                <div className="space-y-3 text-sm text-culte-black/70">
                  <p>✦ Ships worldwide from {seller.location}</p>
                  <p>✦ {seller.productCount} curated products</p>
                  <p>✦ {seller.rating} star rating from {seller.reviewCount}+ buyers</p>
                  <p>✦ Verified Studio Marche maker since 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Products */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-cormorant text-2xl text-culte-navy">ALL PRODUCTS</h2>
              {!shopify.loading && (
                <p className="text-sm text-culte-black/50">{allProducts.length} items</p>
              )}
            </div>

            {/* Quietly let a sync failure surface, without breaking the page */}
            {shopify.isShopifyConnected && shopify.error && (
              <div className="mb-6 p-4 bg-culte-light-blue flex items-center gap-3">
                <RefreshCw className="w-3.5 h-3.5 text-culte-navy/40 flex-shrink-0" />
                <p className="text-xs text-culte-navy/60">
                  We're currently updating this collection. Showing the most recently saved version in the meantime.
                </p>
              </div>
            )}

            {shopify.loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-culte-light-blue mb-3" />
                    <div className="h-3 bg-culte-light-blue w-2/3 mb-2" />
                    <div className="h-3 bg-culte-light-blue w-1/3" />
                  </div>
                ))}
              </div>
            ) : allProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <ComingSoon
                title="This edit is being prepared behind the scenes."
                description={`${seller.name} has just joined Studio Marche. Their first pieces are being reviewed by our curation team and will appear here shortly.`}
                secondaryAction={{ label: 'Discover Other Makers', path: '/shop' }}
                size="inline"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};