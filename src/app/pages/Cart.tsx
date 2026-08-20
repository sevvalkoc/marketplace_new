import { Link } from 'react-router';
import { X, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';
import { useSEO } from '../lib/useSEO';

export const Cart = () => {
  useSEO({ title: 'Your Bag | Studio Marche', path: '/cart', noindex: true });
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  const shipping = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;

  // Related products for empty state / upsell
  const suggested = mockProducts.filter(p => !items.find(i => i.id === p.id)).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <ShoppingBag className="w-16 h-16 text-culte-navy/20 mx-auto mb-6" />
          <h1 className="font-cormorant text-4xl text-culte-navy mb-4">YOUR BAG IS EMPTY</h1>
          <p className="text-culte-black/60 mb-8">Discover something exceptional.</p>
          <Link to="/shop"><Button size="lg">START SHOPPING</Button></Link>
        </div>
        {/* Suggested */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-cormorant text-2xl text-culte-navy">YOU MIGHT LIKE</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {suggested.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-culte-light-blue mb-3">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-xs text-culte-navy/40 tracking-wider">{p.seller}</p>
                <p className="text-sm text-culte-black group-hover:text-culte-orange transition-colors mt-0.5">{p.name}</p>
                <p className="text-sm text-culte-navy mt-0.5">£{p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">REVIEW</p>
          <h1 className="font-cormorant text-5xl text-culte-navy">YOUR BAG</h1>
          <p className="text-culte-black/50 mt-2">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Items */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {items.map((item, i) => (
                <div key={`${item.id}-${item.size}`} className={`flex gap-6 py-8 ${i < items.length - 1 ? 'border-b border-culte-navy/10' : ''}`}>
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-28 md:w-28 md:h-36 overflow-hidden bg-culte-light-blue">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/seller/${item.sellerSlug || item.seller.toLowerCase().replace(/\s+/g, '-')}`}>
                          <p className="text-xs text-culte-navy/40 tracking-wider hover:text-culte-orange transition-colors">{item.seller}</p>
                        </Link>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="text-base text-culte-black hover:text-culte-orange transition-colors mt-0.5">{item.name}</h3>
                        </Link>
                        {item.size && (
                          <p className="text-xs text-culte-black/40 mt-1">Size: {item.size}</p>
                        )}
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size)} className="text-culte-navy/30 hover:text-culte-orange transition-colors flex-shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-6">
                      {/* Quantity */}
                      <div className="flex items-center border-2 border-culte-navy/15">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-culte-light-blue transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-culte-light-blue transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-cormorant text-lg text-culte-navy">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue shopping */}
            <Link to="/shop" className="mt-4 inline-flex items-center gap-2 text-xs text-culte-navy/50 hover:text-culte-navy transition-colors tracking-widest">
              <ArrowRight className="w-3 h-3 rotate-180" /> CONTINUE SHOPPING
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-culte-light-blue p-8 lg:sticky lg:top-28">
              <h2 className="text-xs text-culte-navy tracking-widest mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-culte-black">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-culte-black">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-culte-orange text-xs' : ''}>
                    {shipping === 0 ? 'FREE' : `£{shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-culte-black/50">
                    Add £{(150 - subtotal).toFixed(2)} for free delivery
                  </p>
                )}
              </div>

              <div className="border-t-2 border-culte-navy/15 mt-6 pt-6 flex justify-between">
                <span className="text-sm text-culte-navy">TOTAL</span>
                <span className="font-cormorant text-xl text-culte-navy">£{total.toFixed(2)}</span>
              </div>

              {/* Promo code */}
              <div className="mt-6">
                <form onSubmit={(e) => e.preventDefault()} className="flex">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    className="flex-1 bg-white border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-xs tracking-wider text-culte-navy placeholder:text-culte-navy/30"
                  />
                  <button
                    type="submit"
                    className="bg-culte-navy text-white px-4 py-3 text-xs hover:bg-culte-orange transition-colors flex-shrink-0"
                  >
                    APPLY
                  </button>
                </form>
              </div>

              <div className="mt-6 space-y-3">
                <Link to="/checkout" className="block">
                  <Button size="lg" fullWidth>
                    PROCEED TO CHECKOUT
                  </Button>
                </Link>
                <p className="text-xs text-center text-culte-black/50">Secure checkout · SSL encrypted</p>
              </div>

              {/* Accepted payments */}
              <div className="mt-6 pt-6 border-t border-culte-navy/10">
                <p className="text-xs text-culte-navy/30 tracking-widest mb-3">WE ACCEPT</p>
                <div className="flex gap-2">
                  {['VISA', 'MC', 'AMEX', 'PAYPAL'].map(m => (
                    <span key={m} className="text-xs text-culte-navy/40 border border-culte-navy/15 px-2 py-1">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};