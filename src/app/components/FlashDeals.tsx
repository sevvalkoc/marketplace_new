import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Zap, ArrowRight } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';

const useCountdown = (targetHours: number) => {
  const [time, setTime] = useState({ h: targetHours, m: 23, s: 47 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};

const pad = (n: number) => String(n).padStart(2, '0');

const deals = mockProducts.filter(p => p.isFeatured).slice(0, 4).map((p, i) => ({
  ...p,
  discount: [20, 30, 25, 15][i],
  originalPrice: [Math.round(p.price * 1.25), Math.round(p.price * 1.43), Math.round(p.price * 1.33), Math.round(p.price * 1.18)][i],
  sold: [68, 42, 55, 31][i],
  total: [100, 80, 90, 60][i],
}));

export const FlashDeals = () => {
  const { h, m, s } = useCountdown(5);
  const { addToCart } = useCart();

  return (
    <section className="bg-culte-navy py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-culte-orange p-2">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <p className="text-xs text-culte-orange tracking-[0.3em] mb-0.5">LIMITED TIME</p>
              <h2 className="font-cormorant text-3xl text-white">Flash Deals</h2>
            </div>
            {/* Countdown */}
            <div className="flex items-center gap-1 ml-4">
              <span className="text-xs text-white/40 tracking-widest mr-2">ENDS IN</span>
              {[{ val: pad(h), label: 'HRS' }, { val: pad(m), label: 'MIN' }, { val: pad(s), label: 'SEC' }].map((item, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="flex flex-col items-center">
                    <span className="bg-culte-orange text-white text-lg px-3 py-1.5 min-w-[3rem] text-center tabular-nums block">
                      {item.val}
                    </span>
                    <span className="text-white/30 mt-0.5" style={{fontSize:'9px'}}>{item.label}</span>
                  </span>
                  {i < 2 && <span className="text-white/40 text-lg pb-5 mx-0.5">:</span>}
                </span>
              ))}
            </div>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-xs text-white/60 hover:text-culte-orange transition-colors tracking-widest"
          >
            ALL DEALS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map(deal => (
            <div key={deal.id} className="bg-white group">
              <div className="relative overflow-hidden aspect-[3/4]">
                <Link to={`/product/${deal.id}`}>
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
                {/* Discount badge */}
                <div className="absolute top-0 left-0 bg-culte-orange px-3 py-1.5">
                  <span className="text-xs text-white">-{deal.discount}%</span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="px-4 pt-3 pb-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-culte-orange" style={{fontSize:'10px'}}>SOLD: {deal.sold}/{deal.total}</span>
                  <span className="text-xs text-culte-navy/40" style={{fontSize:'10px'}}>{Math.round((deal.sold / deal.total) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-culte-navy/10 w-full">
                  <div
                    className="h-full bg-culte-orange transition-all"
                    style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="px-4 pb-4 pt-2">
                <p className="text-xs text-culte-navy/40 mb-0.5">{deal.seller}</p>
                <Link to={`/product/${deal.id}`}>
                  <p className="text-sm text-culte-black hover:text-culte-orange transition-colors leading-tight line-clamp-2">{deal.name}</p>
                </Link>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-culte-navy">£{deal.price.toFixed(2)}</span>
                  <span className="text-xs text-culte-black/30 line-through">£{deal.originalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => addToCart({ id: deal.id, name: deal.name, price: deal.price, seller: deal.seller, sellerSlug: deal.sellerSlug, image: deal.image })}
                  className="mt-3 w-full py-2.5 bg-culte-navy text-white text-xs tracking-widest hover:bg-culte-orange transition-colors"
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};