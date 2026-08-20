import { Link, useLocation } from 'react-router';
import { User, Package, MapPin, CreditCard, Settings, ChevronRight, Heart } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const navItems = [
  { label: 'OVERVIEW', path: '/buyer/account', icon: User },
  { label: 'MY ORDERS', path: '/buyer/orders', icon: Package },
  { label: 'WISHLIST', path: '/wishlist', icon: Heart },
  { label: 'ADDRESSES', path: '/buyer/addresses', icon: MapPin },
  { label: 'PAYMENT', path: '/buyer/payment', icon: CreditCard },
  { label: 'SETTINGS', path: '/buyer/settings', icon: Settings },
];

export const BuyerAccount = () => {
  const location = useLocation();
  const recentOrders = mockOrders.slice(0, 2);
  const { itemCount: wishlistCount } = useWishlist();
  const { itemCount: cartCount } = useCart();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">PORTAL</p>
          <h1 className="font-cormorant text-5xl text-culte-navy">MY ACCOUNT</h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-culte-light-blue p-6 mb-6">
              <div className="w-14 h-14 bg-culte-navy flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-cormorant text-lg text-culte-navy">Sarah M.</h2>
              <p className="text-xs text-culte-black/50 mt-0.5">sarah@example.com</p>
              <p className="text-xs text-culte-orange mt-3">MEMBER SINCE 2024</p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive
                        ? 'bg-culte-navy text-white'
                        : 'text-culte-navy hover:bg-culte-light-blue'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs tracking-wider flex-1">{item.label}</span>
                    <ChevronRight className="w-3 h-3 opacity-40" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-culte-navy/10">
              <Link to="/" className="text-xs text-culte-black/40 hover:text-culte-orange transition-colors tracking-widest">
                SIGN OUT
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-9 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'TOTAL ORDERS', value: mockOrders.length.toString() },
                { label: 'WISHLIST', value: wishlistCount.toString() },
                { label: 'LOYALTY PTS', value: '1,240' }
              ].map((stat) => (
                <div key={stat.label} className="border-2 border-culte-navy/10 p-6 text-center">
                  <p className="font-cormorant text-3xl text-culte-navy">{stat.value}</p>
                  <p className="text-xs text-culte-navy/40 tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-cormorant text-xl text-culte-navy">RECENT ORDERS</h2>
                <Link to="/buyer/orders" className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest">
                  VIEW ALL
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-2 border-culte-navy/10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-culte-navy">{order.id}</p>
                        <p className="text-xs text-culte-black/50 mt-0.5">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs px-3 py-1 ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-culte-light-blue text-culte-navy' :
                          'bg-culte-peach/30 text-culte-orange'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                        <p className="text-sm text-culte-navy">£${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="w-14 h-16 overflow-hidden bg-culte-light-blue flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-14 h-16 bg-culte-navy flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-cormorant text-xl text-culte-navy">RECOMMENDED FOR YOU</h2>
                <Link to="/shop" className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest">
                  SHOP ALL
                </Link>
              </div>
              <div className="p-8 bg-culte-light-blue text-center">
                <p className="text-sm text-culte-navy mb-2">PERSONALISED PICKS COMING SOON</p>
                <p className="text-sm text-culte-black/60">Browse more to receive personalised recommendations.</p>
                <Link to="/shop" className="mt-4 inline-block text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5">
                  EXPLORE THE COLLECTION →
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};