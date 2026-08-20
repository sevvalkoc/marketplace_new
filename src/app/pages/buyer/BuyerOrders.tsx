import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Package, CheckCircle, Truck, Clock, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { mockOrders } from '../../data/mockData';

const navItems = [
  { label: 'OVERVIEW', path: '/buyer/account' },
  { label: 'MY ORDERS', path: '/buyer/orders' },
  { label: 'WISHLIST', path: '/wishlist' },
  { label: 'ADDRESSES', path: '/buyer/addresses' },
  { label: 'PAYMENT', path: '/buyer/payment' },
  { label: 'SETTINGS', path: '/buyer/settings' },
];

const statusConfig: Record<string, { bg: string; text: string; icon: typeof Package }> = {
  Delivered: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle },
  Shipped: { bg: 'bg-culte-light-blue', text: 'text-culte-navy', icon: Truck },
  Pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock },
  Processing: { bg: 'bg-culte-peach/20', text: 'text-culte-orange', icon: Package },
};

export const BuyerOrders = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">PORTAL</p>
          <h1 className="font-cormorant text-5xl text-culte-navy">MY ORDERS</h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 transition-colors text-xs tracking-wider ${
                    item.path === '/buyer/orders' ? 'bg-culte-navy text-white' : 'text-culte-navy hover:bg-culte-light-blue'
                  }`}
                >
                  {item.label}
                  <ChevronRight className="w-3 h-3 opacity-40" />
                </Link>
              ))}
            </nav>
          </aside>

          <main className="lg:col-span-9">
            {mockOrders.length === 0 ? (
              <div className="text-center py-20 border-2 border-culte-navy/10">
                <Package className="w-12 h-12 text-culte-navy/20 mx-auto mb-4" />
                <p className="font-cormorant text-xl text-culte-navy mb-2">NO ORDERS YET</p>
                <p className="text-culte-black/50 mb-6">When you place an order, it will appear here.</p>
                <Link to="/shop" className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5">
                  SHOP NOW →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {mockOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status]?.icon || Package;
                  const isOpen = expanded === order.id;
                  return (
                    <div key={order.id} className="border-2 border-culte-navy/10 hover:border-culte-navy/20 transition-colors">
                      {/* Order header */}
                      <div
                        className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-culte-navy/10 bg-culte-light-blue/30 cursor-pointer"
                        onClick={() => setExpanded(isOpen ? null : order.id)}
                      >
                        <div>
                          <span className="text-xs text-culte-navy/40 tracking-widest">ORDER</span>
                          <p className="text-sm text-culte-navy">{order.id}</p>
                        </div>
                        <div>
                          <span className="text-xs text-culte-navy/40 tracking-widest">PLACED</span>
                          <p className="text-sm text-culte-black">{order.date}</p>
                        </div>
                        <div>
                          <span className="text-xs text-culte-navy/40 tracking-widest">TOTAL</span>
                          <p className="text-sm text-culte-navy">£${order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-3 py-1.5 flex items-center gap-1.5 ${statusConfig[order.status]?.bg} ${statusConfig[order.status]?.text}`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.status.toUpperCase()}
                          </span>
                          <div className="text-culte-navy/30">
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Order items */}
                      <div className="p-6 space-y-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-16 h-20 overflow-hidden bg-culte-light-blue flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-culte-black">{item.name}</p>
                              <p className="text-xs text-culte-black/40 mt-0.5">Qty: {item.qty}</p>
                            </div>
                            <p className="text-sm text-culte-navy">£${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      {/* Expanded: tracking timeline */}
                      {isOpen && (
                        <div className="border-t border-culte-navy/10 px-6 py-6 bg-white">
                          {/* Tracking number */}
                          {order.trackingNumber && (
                            <div className="mb-6 p-4 bg-culte-light-blue flex items-center justify-between">
                              <div>
                                <p className="text-xs text-culte-navy/40 tracking-widest mb-1">TRACKING NUMBER</p>
                                <p className="text-sm text-culte-navy">{order.trackingNumber}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-culte-navy/40 tracking-widest mb-1">ESTIMATED DELIVERY</p>
                                <p className="text-sm text-culte-black">{order.estimatedDelivery}</p>
                              </div>
                            </div>
                          )}

                          {/* Timeline */}
                          <div>
                            <p className="text-xs text-culte-navy/40 tracking-widest mb-5">ORDER TIMELINE</p>
                            <div className="space-y-0 relative">
                              {/* vertical line */}
                              <div className="absolute left-3.5 top-4 bottom-4 w-0.5 bg-culte-navy/10" />
                              {order.timeline.map((step, i) => (
                                <div key={i} className="flex items-start gap-4 pb-5 relative">
                                  <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 z-10 ${
                                    step.done ? 'bg-culte-navy' : 'bg-white border-2 border-culte-navy/15'
                                  }`}>
                                    {step.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                  </div>
                                  <div className="pt-0.5">
                                    <p className={`text-xs tracking-widest ${step.done ? 'text-culte-navy' : 'text-culte-navy/30'}`}>
                                      {step.label.toUpperCase()}
                                    </p>
                                    <p className="text-xs text-culte-black/40 mt-0.5">{step.date}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Order actions */}
                      <div className="px-6 pb-4 flex gap-4 border-t border-culte-navy/5">
                        <button
                          onClick={() => setExpanded(isOpen ? null : order.id)}
                          className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest pt-4"
                        >
                          {isOpen ? 'HIDE DETAILS' : 'TRACK ORDER'}
                        </button>
                        {order.status === 'Delivered' && (
                          <button className="text-xs text-culte-navy/50 hover:text-culte-navy transition-colors tracking-widest pt-4 flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" /> RETURN / EXCHANGE
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};