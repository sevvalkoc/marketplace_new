import { Link } from 'react-router';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  seller: string;
  sellerSlug?: string;
  category?: string;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
}

export const ProductCard = ({
  id, image, name, price, seller, sellerSlug, isNew, originalPrice
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(id);
  const slug = sellerSlug || seller.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, seller, sellerSlug, image });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({ id, name, price, seller, sellerSlug, image, isNew });
  };

  return (
    <div className="group">
      {/* Image container */}
      <div className="relative overflow-hidden bg-[#F4F4F2] aspect-square mb-3">
        <Link to={`/product/${id}`} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
          />
        </Link>

        {/* NEW badge — minimal */}
        {isNew && !originalPrice && (
          <div className="absolute top-3 left-3">
            <span
              className="bg-white text-black px-2.5 py-1"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              New
            </span>
          </div>
        )}

        {/* Sale badge */}
        {originalPrice && originalPrice > price && (
          <div className="absolute top-3 left-3">
            <span
              className="bg-black text-white px-2.5 py-1"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              -{Math.round((1 - price / originalPrice) * 100)}%
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? 'bg-black text-white opacity-100'
              : 'bg-white text-black hover:bg-black hover:text-white opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick add — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToBag}
            className="w-full py-3 flex items-center justify-center gap-2 bg-black text-white hover:bg-black/80 transition-colors"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            <ShoppingBag className="w-3 h-3" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <Link to={`/seller/${slug}`}>
          <p
            className="text-black/35 hover:text-black transition-colors"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {seller}
          </p>
        </Link>
        <Link to={`/product/${id}`}>
          <h3
            className="text-black/80 hover:text-black transition-colors leading-snug"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem' }}
          >
            {name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 pt-0.5">
          <p className="text-black" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem' }}>
            £{price.toFixed(2)}
          </p>
          {originalPrice && originalPrice > price && (
            <p className="text-black/25 line-through" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>
              £{originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
