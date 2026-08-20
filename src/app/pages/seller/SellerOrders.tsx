import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

const initialOrders = [
  { id: 'ORD-1234', customer: 'Sarah M.', email: 'sarah@example.com', product: 'Minimalist Ceramic Vase', sku: 'HOME-001', qty: 1, amount: 89.00, date: 'Apr 19, 2026', status: 'Pending' as OrderStatus, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=80&h=80&fit=crop', address: '42 Oak Lane, Portland, OR' },
  { id: 'ORD-1233', customer: 'James K.', email: 'james@example.com', product: 'Stoneware Dinner Set', sku: 'HOME-009', qty: 1, amount: 320.00, date: 'Apr 18, 2026', status: 'Shipped' as OrderStatus, image: 'https://images.unsplash.com/photo-1603199506016-5a1f76dc2f18?w=80&h=80&fit=crop', address: '15 Maple Ave, Seattle, WA' },
  { id: 'ORD-1232', customer: 'Amina T.', email: 'amina@example.com', product: 'Sculptural Table Lamp', sku: 'HOME-007', qty: 1, amount: 220.00, date: 'Apr 15, 2026', status: 'Delivered' as OrderStatus, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=80&h=80&fit=crop', address: '8 Birch St, Brooklyn, NY' },
  { id: 'ORD-1231', customer: 'Leo P.', email: 'leo@example.com', product: 'Obsidian Bookend Pair', sku: 'OBJ-014', qty: 2, amount: 276.00, date: 'Apr 14, 2026', status: 'Processing' as OrderStatus, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop', address: '3 Cedar Blvd, Austin, TX' },
  { id: 'ORD-1230', customer: 'Maya R.', email: 'maya@example.com', product: 'Minimalist Ceramic Vase', sku: 'HOME-001', qty: 1, amount: 89.00, date: 'Apr 12, 2026', status: 'Delivered' as OrderStatus, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=80&h=80&fit=crop', address: '71 Elm Road, Chicago, IL' },
];

const statusConfig: Record<OrderStatus, { bg: string; text: string; icon: typeof Package }> = {
  Pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock },
  Processing: { bg: 'bg-culte-peach/20', text: 'text-culte-orange', icon: Package },
  Shipped: { bg: 'bg-culte-light-blue', text: 'text-culte-navy', icon: Truck },
  Delivered: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle },
};

const statusFlow: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export const SellerOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<'All' | OrderStatus>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  const advanceStatus = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const idx = statusFlow.indexOf(o.status);
      if (idx < statusFlow.length - 1) {
        return { ...o, status: statusFlow[idx + 1] };
      }
      return o;
    }));
  };

  const counts: Record<string, number> = {
    All: orders.length,
    Pending: orders.filter(o => o.status === 'Pending').length,
    Processing: orders.filter(o => o.status === 'Processing').length,
    Shipped: orders.filter(o => o.status === 'Shipped').length,
    Delivered: orders.filter(o => o.status === 'Delivered').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">ORDERS</p>
          <h1 className="font-valibuk text-4xl text-culte-navy">ORDERS</h1>
          <p className="text-culte-black/50 text-sm mt-1">{orders.length} total orders</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto border-b-2 border-culte-navy/10 mb-6">
        {(['All', 'Pending', 'Processing', 'Shipped', 'Delivered'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-shrink-0 px-5 py-3 font-valibuk text-xs tracking-widest border-b-2 transition-colors ${
              filter === s
                ? 'border-culte-orange text-culte-orange'
                : 'border-transparent text-culte-navy/40 hover:text-culte-navy'
            }`}
          >
            {s.toUpperCase()} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const StatusIcon = statusConfig[order.status].icon;
          const isExpanded = expanded === order.id;
          const canAdvance = order.status !== 'Delivered';

          return (
            <div key={order.id} className="border-2 border-culte-navy/10 hover:border-culte-navy/20 transition-colors">
              {/* Order row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : order.id)}
              >
                <div className="w-12 h-12 overflow-hidden bg-culte-light-blue flex-shrink-0">
                  <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-valibuk text-xs text-culte-navy">{order.id}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 font-valibuk text-xs ${statusConfig[order.status].bg} ${statusConfig[order.status].text}`}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-culte-black mt-0.5 truncate">{order.product}</p>
                  <p className="text-xs text-culte-black/40 mt-0.5">{order.customer} · {order.date}</p>
                </div>
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="font-valibuk text-sm text-culte-navy">£{order.amount.toFixed(2)}</p>
                  <p className="text-xs text-culte-black/40">Qty: {order.qty}</p>
                </div>
                <div className="flex-shrink-0 text-culte-navy/30">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-culte-navy/10 px-5 py-5 bg-culte-light-blue/20">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="font-valibuk text-xs text-culte-navy/40 tracking-widest mb-2">CUSTOMER</p>
                      <p className="text-sm text-culte-black">{order.customer}</p>
                      <p className="text-xs text-culte-black/50">{order.email}</p>
                    </div>
                    <div>
                      <p className="font-valibuk text-xs text-culte-navy/40 tracking-widest mb-2">SHIPPING TO</p>
                      <p className="text-sm text-culte-black">{order.address}</p>
                    </div>
                    <div>
                      <p className="font-valibuk text-xs text-culte-navy/40 tracking-widest mb-2">ORDER DETAILS</p>
                      <p className="text-sm text-culte-black">{order.product}</p>
                      <p className="text-xs text-culte-black/50">SKU: {order.sku} · Qty: {order.qty}</p>
                    </div>
                  </div>

                  {/* Status progress */}
                  <div className="mt-5 pt-5 border-t border-culte-navy/10">
                    <div className="flex items-center gap-0">
                      {statusFlow.map((s, i) => {
                        const done = statusFlow.indexOf(order.status) >= i;
                        const current = order.status === s;
                        return (
                          <div key={s} className="flex items-center flex-1">
                            <div className={`flex items-center gap-1.5 ${current ? 'text-culte-orange' : done ? 'text-culte-navy' : 'text-culte-navy/20'}`}>
                              <div className={`w-5 h-5 flex items-center justify-center border-2 ${current ? 'border-culte-orange bg-culte-orange' : done ? 'border-culte-navy bg-culte-navy' : 'border-culte-navy/20'}`}>
                                {done && <span className="text-white" style={{ fontSize: '10px' }}>✓</span>}
                              </div>
                              <span className="font-valibuk text-xs tracking-wider hidden sm:block">{s.toUpperCase()}</span>
                            </div>
                            {i < statusFlow.length - 1 && (
                              <div className={`flex-1 h-0.5 mx-2 ${done && !current ? 'bg-culte-navy' : 'bg-culte-navy/10'}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {canAdvance && (
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); advanceStatus(order.id); }}
                        className="font-valibuk text-xs bg-culte-orange text-white px-5 py-2.5 hover:bg-[#D16538] transition-colors tracking-widest"
                      >
                        MARK AS {statusFlow[statusFlow.indexOf(order.status) + 1]?.toUpperCase()}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 border-2 border-culte-navy/10">
          <Package className="w-10 h-10 text-culte-navy/20 mx-auto mb-4" />
          <p className="font-valibuk text-xl text-culte-navy mb-2">NO ORDERS</p>
          <p className="text-culte-black/40 text-sm">No orders in this category yet.</p>
        </div>
      )}
    </div>
  );
};
