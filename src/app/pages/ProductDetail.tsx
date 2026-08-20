import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Heart, Truck, RotateCcw, Star, ChevronDown, Share2, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { mockProducts, mockSellers, mockReviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { usePageMeta } from '../lib/usePageMeta';

const clothingCategories = ['women', 'men', 'kids'];
const sizes = { women: ['XS', 'S', 'M', 'L', 'XL'], men: ['S', 'M', 'L', 'XL', 'XXL'], kids: ['2Y', '4Y', '6Y', '8Y', '10Y'] };

export const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const seller = mockSellers.find(s => s.slug === product.sellerSlug) || mockSellers[0];
  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const reviews = mockReviews.filter(r => r.productId === product.id);
  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 4.8;
  const totalReviews = reviews.length > 0 ? reviews.length : 42;

  usePageMeta({
    title: `${product.name} by ${product.seller} | Studio Marche`,
    description: product.description.length > 155 ? `${product.description.slice(0, 152)}...` : product.description,
  });

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToBag, setAddedToBag] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [reviewSlide, setReviewSlide] = useState(0);

  const isClothing = clothingCategories.includes(product.category);
  const availableSizes = isClothing ? (sizes[product.category as keyof typeof sizes] || sizes.women) : null;

  const images = [product.image, product.image, product.image, product.image];

  const handleAddToBag = () => {
    if (isClothing && !selectedSize) return;
    addToCart({ id: product.id, name: product.name, price: product.price, seller: product.seller, sellerSlug: product.sellerSlug, image: product.image, quantity, size: selectedSize || undefined });
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2200);
  };

  const accordions = [
    { id: 'details', label: 'PRODUCT DETAILS', content: product.description },
    { id: 'shipping', label: 'DELIVERY & RETURNS', content: 'Free standard delivery on orders over £150. Express options available at checkout. Straightforward 30-day returns on all unworn and undamaged items.' },
    { id: 'maker', label: 'ABOUT THE MAKER', content: seller.bio },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 mb-10" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square overflow-hidden border transition-colors ${
                    selectedImage === i ? 'border-black' : 'border-transparent hover:border-black/20'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F4F4F2]">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <div className="absolute top-5 left-5 bg-white px-3 py-1">
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>New</span>
                  </div>
                )}
              </div>
              {/* Mobile thumbnails */}
              <div className="flex gap-2 mt-3 md:hidden">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden border flex-1 transition-colors ${
                      selectedImage === i ? 'border-black' : 'border-black/10'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-28 h-fit">
            {/* Seller link */}
            <Link to={`/seller/${product.sellerSlug}`} className="flex items-center gap-3 mb-5 group">
              <div className="w-8 h-8 overflow-hidden bg-[#F4F4F2]">
                <img src={seller.image} alt={seller.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-black/50 group-hover:text-black transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{product.seller}</p>
                <p className="text-black/30" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>{seller.location}</p>
              </div>
            </Link>

            <h1 className="font-cormorant text-black mb-3" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, lineHeight: '1.1' }}>{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-3 h-3 ${i <= avgRating ? 'fill-current text-black' : 'text-black/20'}`} />
                ))}
              </div>
              <span className="text-black/35" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>{avgRating.toFixed(1)} ({totalReviews} reviews)</span>
            </div>

            <p className="text-black mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.6rem', fontWeight: 300 }}>£${product.price.toFixed(2)}</p>
            <p className="text-black/30 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>Free delivery on orders over £150</p>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-400'}`} />
              <span className="text-black/50" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem' }}>
                {product.stock > 5 ? `${product.stock} in stock` : product.stock > 0 ? `Only ${product.stock} left` : 'Out of stock'}
              </span>
            </div>

            {/* Size selector (clothing only) */}
            {availableSizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-black/50 uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em' }}>Size</label>
                  <button className="text-black/40 hover:text-black transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em' }}>Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 border transition-colors ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-black/15 text-black hover:border-black'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {isClothing && !selectedSize && (
                  <p className="text-black/40 mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>Please select a size</p>
                )}
              </div>
            )}

            {/* Quantity + Add to bag */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-black/15">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-14 flex items-center justify-center hover:bg-[#F4F4F2] transition-colors text-black"
                >
                  −
                </button>
                <span className="w-11 h-14 flex items-center justify-center border-x border-black/15" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-14 flex items-center justify-center hover:bg-[#F4F4F2] transition-colors text-black"
                >
                  +
                </button>
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={handleAddToBag}
                className={addedToBag ? 'bg-culte-navy!' : ''}
                disabled={isClothing && !selectedSize}
              >
                {addedToBag ? (
                  <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Added to Bag</span>
                ) : 'Add to Bag'}
              </Button>

              <button
                onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, seller: product.seller, sellerSlug: product.sellerSlug, image: product.image, isNew: product.isNew })}
                className={`w-14 h-14 flex items-center justify-center border flex-shrink-0 transition-colors ${
                  wishlisted
                    ? 'bg-black border-black text-white'
                    : 'border-black/15 text-black hover:border-black'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-black/30 hover:text-black transition-colors mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>
              <Share2 className="w-3.5 h-3.5" /> Share this product
            </button>

            {/* Shipping highlights */}
            <div className="border-t border-black/8 pt-6 space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-black/40 flex-shrink-0" />
                <span className="text-black/50" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>Free delivery on orders over £150</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-black/40 flex-shrink-0" />
                <span className="text-black/50" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>30-day free returns</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-black/8 space-y-0">
              {accordions.map((acc) => (
                <div key={acc.id} className="border-b border-black/8">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-black/60 uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.2em' }}>{acc.label}</span>
                    <ChevronDown className={`w-4 h-4 text-black/30 transition-transform duration-200 ${openAccordion === acc.id ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === acc.id && (
                    <div className="pb-5 text-black/50 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 300 }}>
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* SKU */}
            <p className="text-black/20 mt-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem' }}>SKU: {product.sku}</p>
          </div>
        </div>

        {/* Seller callout */}
        <div className="bg-[#F4F4F2] p-8 lg:p-12 mb-16 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-black/30 mb-3 uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em' }}>The Maker</p>
            <h2 className="font-cormorant text-black mb-3" style={{ fontSize: '1.8rem', fontWeight: 300 }}>{seller.name}</h2>
            <p className="text-black/50 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 300 }}>{seller.bio}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <Link to={`/seller/${seller.slug}`}>
              <Button variant="secondary">View All Products</Button>
            </Link>
          </div>
        </div>

        {/* ── REVIEWS SLIDER ── */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-10 pb-6 border-b border-black/8">
            <div>
              <p className="text-black/30 mb-3 uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em' }}>Customer Reviews</p>
              <h2 className="font-cormorant text-black" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 300 }}>What People Say</h2>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= avgRating ? 'fill-current text-black' : 'text-black/15'}`} />
                ))}
              </div>
              <p className="text-black font-cormorant" style={{ fontSize: '1.8rem', fontWeight: 300 }}>{avgRating.toFixed(1)}</p>
              <p className="text-black/35" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>{totalReviews} verified reviews</p>
            </div>
          </div>

          {/* Horizontal slider container */}
          {(() => {
            const allReviews = reviews.length > 0 ? reviews : [
              { id: 'r1', author: 'Sophie R.', location: 'London, UK', date: 'March 2026', rating: 5, title: 'Exceptional quality', body: 'Exactly as described. The craftsmanship is outstanding and it arrived beautifully packaged. Would order again without hesitation.', verified: true },
              { id: 'r2', author: 'Marcus T.', location: 'New York, USA', date: 'February 2026', rating: 5, title: 'Worth every penny', body: 'I was initially hesitant given the price but this is genuine quality. You can feel it immediately. Highly recommended.', verified: true },
              { id: 'r3', author: 'Elisa M.', location: 'Milan, Italy', date: 'January 2026', rating: 5, title: 'Beautifully made', body: 'The material quality exceeded expectations. Arrived quickly, packaged with care. This is what independent brands should aspire to.', verified: false },
            ];
            const visibleCount = 2;
            const maxSlide = Math.max(0, allReviews.length - visibleCount);
            const clampedSlide = Math.min(reviewSlide, maxSlide);
            return (
              <div>
                <div className="overflow-hidden">
                  <div
                    className="flex gap-6 transition-transform duration-500"
                    style={{ transform: `translateX(calc(-${clampedSlide * (100 / visibleCount)}% - ${clampedSlide * 24}px))` }}
                  >
                    {allReviews.map((review) => (
                      <div
                        key={review.id}
                        className="flex-shrink-0 border border-black/8 p-8 hover:border-black/20 transition-colors"
                        style={{ width: `calc(${100 / visibleCount}% - 12px)`, minWidth: '280px' }}
                      >
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-5">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-current text-black' : 'text-black/15'}`} />
                          ))}
                          {review.verified && (
                            <span className="ml-2 text-black/25 flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                              <Check className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </div>
                        {/* Title */}
                        <h4 className="font-cormorant text-black mb-3" style={{ fontSize: '1.1rem', fontWeight: 400 }}>{review.title}</h4>
                        {/* Body */}
                        <p className="text-black/45 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 300 }}>{review.body}</p>
                        {/* Author */}
                        <div className="flex items-center justify-between pt-4 border-t border-black/8">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 bg-[#F4F4F2] flex items-center justify-center flex-shrink-0">
                              <span className="text-black/40" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>{review.author[0]}</span>
                            </div>
                            <div>
                              <p className="text-black" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem' }}>{review.author}</p>
                              <p className="text-black/30" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem' }}>{review.location}</p>
                            </div>
                          </div>
                          <span className="text-black/20" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem' }}>{review.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Navigation */}
                {allReviews.length > visibleCount && (
                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() => setReviewSlide(Math.max(0, clampedSlide - 1))}
                      disabled={clampedSlide === 0}
                      className="w-9 h-9 border border-black/15 flex items-center justify-center hover:border-black transition-colors disabled:opacity-25"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-black" />
                    </button>
                    <button
                      onClick={() => setReviewSlide(Math.min(maxSlide, clampedSlide + 1))}
                      disabled={clampedSlide >= maxSlide}
                      className="w-9 h-9 border border-black/15 flex items-center justify-center hover:border-black transition-colors disabled:opacity-25"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </button>
                    <span className="text-black/25 ml-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>
                      {clampedSlide + 1} / {maxSlide + 1}
                    </span>
                  </div>
                )}
              </div>
            );
          })()}
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-black/30 mb-2 uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em' }}>More Like This</p>
                <h2 className="font-cormorant text-black" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 300 }}>You Might Also Like</h2>
              </div>
              <Link
                to={`/category/${product.category}`}
                className="text-black/40 hover:text-black transition-colors flex items-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
              >
                See All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};