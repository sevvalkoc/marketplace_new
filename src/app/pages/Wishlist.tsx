import { Link } from 'react-router';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { Button } from '../components/Button';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';

export const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToBag = (item: typeof items[0]) => {
    addToCart(item);
  };

  const suggested = mockProducts.filter(p => !items.find(i => i.id === p.id)).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
        <Heart className="w-16 h-16 text-culte-navy/20 mx-auto mb-6" />
        <h1 className="font-cormorant text-4xl text-culte-navy mb-4">YOUR WISHLIST IS EMPTY</h1>
        <p className="text-culte-black/60 mb-8">Save the things you love for later.</p>
        <Link to="/shop"><Button size="lg">EXPLORE PRODUCTS</Button></Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">SAVED</p>
          <h1 className="font-cormorant text-5xl text-culte-navy">MY WISHLIST</h1>
          <p className="text-culte-black/50 mt-2">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {items.map((product) => (
            <div key={product.id} className="group relative">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-culte-light-blue mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); removeFromWishlist(product.id); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center hover:bg-culte-orange hover:text-white transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-culte-orange px-2 py-1">
                      <span className="text-xs text-white">NEW</span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="space-y-1 mb-3">
                <p className="text-xs text-culte-navy/40 tracking-wider">{product.seller}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-sm text-culte-black hover:text-culte-orange transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-culte-navy">£${product.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleAddToBag(product)}
                className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-culte-navy text-culte-navy text-xs hover:bg-culte-navy hover:text-white transition-colors tracking-widest"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> ADD TO BAG
              </button>
            </div>
          ))}
        </div>

        {/* You might also like */}
        {suggested.length > 0 && (
          <div className="border-t-2 border-culte-navy/10 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-cormorant text-2xl text-culte-navy">YOU MIGHT ALSO LIKE</h2>
              <Link to="/shop" className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest">
                SHOP ALL →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {suggested.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-culte-light-blue mb-3">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="text-xs text-culte-navy/40 tracking-wider">{p.seller}</p>
                  <p className="text-sm text-culte-black group-hover:text-culte-orange transition-colors mt-0.5">{p.name}</p>
                  <p className="text-sm text-culte-navy mt-0.5">£${p.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};