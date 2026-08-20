import { Link } from 'react-router';
import { TrendingUp, Package, ShoppingCart, DollarSign, Eye, Plus, ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockRevenueData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-culte-navy text-white px-4 py-3 text-xs font-valibuk space-y-1">
        <p className="text-culte-orange mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name}>{entry.name.toUpperCase()}: {entry.name === 'revenue' ? `£${entry.value.toLocaleString()}` : entry.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export const SellerDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '£31,372', change: '+18%', trend: 'up', icon: DollarSign },
    { label: 'Total Orders', value: '272', change: '+12%', trend: 'up', icon: ShoppingCart },
    { label: 'Products Listed', value: '24', change: '+3 this month', trend: 'up', icon: Package },
    { label: 'Profile Views', value: '4,812', change: '+24%', trend: 'up', icon: Eye },
  ];

  const recentOrders = [
    { id: 'ORD-1234', product: 'Minimalist Ceramic Vase', customer: 'Sarah M.', amount: 89.00, status: 'Pending', date: 'Today' },
    { id: 'ORD-1233', product: 'Stoneware Dinner Set', customer: 'James K.', amount: 320.00, status: 'Shipped', date: 'Yesterday' },
    { id: 'ORD-1232', product: 'Handwoven Wool Blanket', customer: 'Amina T.', amount: 195.00, status: 'Delivered', date: '3 days ago' },
    { id: 'ORD-1231', product: 'Sculptural Table Lamp', customer: 'Leo P.', amount: 220.00, status: 'Delivered', date: '5 days ago' },
  ];

  const topProducts = [
    { name: 'Minimalist Ceramic Vase', sold: 42, revenue: 3738, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100&h=100&fit=crop' },
    { name: 'Stoneware Dinner Set', sold: 18, revenue: 5760, image: 'https://images.unsplash.com/photo-1603199506016-5a1f76dc2f18?w=100&h=100&fit=crop' },
    { name: 'Sculptural Table Lamp', sold: 12, revenue: 2640, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=100&h=100&fit=crop' },
  ];

  const statusConfig: Record<string, { bg: string; text: string }> = {
    Pending: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
    Shipped: { bg: 'bg-culte-light-blue', text: 'text-culte-navy' },
    Delivered: { bg: 'bg-green-50', text: 'text-green-700' },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">SELLER PORTAL</p>
          <h1 className="font-valibuk text-4xl text-culte-navy">DASHBOARD</h1>
          <p className="text-culte-black/50 mt-1 text-sm">Good morning, Studio Clay</p>
        </div>
        <div className="flex gap-3">
          <Link to="/seller/add-product">
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> ADD PRODUCT
            </Button>
          </Link>
          <Link to="/" target="_blank">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              VIEW STORE <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border-2 border-culte-navy/10 p-6 hover:border-culte-navy transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-culte-light-blue flex items-center justify-center">
                  <Icon className="w-5 h-5 text-culte-navy" />
                </div>
                <div className={`flex items-center gap-1 font-valibuk text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.change}
                </div>
              </div>
              <p className="font-valibuk text-3xl text-culte-navy">{stat.value}</p>
              <p className="text-xs text-culte-black/40 tracking-wider mt-1">{stat.label.toUpperCase()}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="border-2 border-culte-navy/10 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-valibuk text-sm text-culte-navy tracking-widest">REVENUE OVERVIEW</h2>
          <p className="font-valibuk text-xs text-culte-navy/30 tracking-widest">NOV 2025 – APR 2026</p>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockRevenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#181E51" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#181E51" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(24,30,81,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Valibuk', fill: '#181E51', opacity: 0.4 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#181E51', opacity: 0.4 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="revenue" stroke="#181E51" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ fill: '#E17544', r: 4, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#E17544' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-valibuk text-lg text-culte-navy">RECENT ORDERS</h2>
            <Link to="/seller/orders" className="flex items-center gap-1 font-valibuk text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest">
              VIEW ALL <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="border-2 border-culte-navy/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-culte-light-blue border-b border-culte-navy/10">
                  <th className="text-left px-5 py-3 font-valibuk text-xs text-culte-navy/50 tracking-widest">ORDER</th>
                  <th className="text-left px-5 py-3 font-valibuk text-xs text-culte-navy/50 tracking-widest hidden md:table-cell">PRODUCT</th>
                  <th className="text-left px-5 py-3 font-valibuk text-xs text-culte-navy/50 tracking-widest hidden lg:table-cell">DATE</th>
                  <th className="text-left px-5 py-3 font-valibuk text-xs text-culte-navy/50 tracking-widest">AMOUNT</th>
                  <th className="text-left px-5 py-3 font-valibuk text-xs text-culte-navy/50 tracking-widest">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={order.id} className={`${i < recentOrders.length - 1 ? 'border-b border-culte-navy/5' : ''} hover:bg-culte-light-blue/30 transition-colors`}>
                    <td className="px-5 py-4">
                      <p className="font-valibuk text-xs text-culte-navy">{order.id}</p>
                      <p className="text-xs text-culte-black/40 mt-0.5">{order.customer}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-culte-black hidden md:table-cell">{order.product}</td>
                    <td className="px-5 py-4 text-xs text-culte-black/40 hidden lg:table-cell">{order.date}</td>
                    <td className="px-5 py-4 font-valibuk text-sm text-culte-navy">£${order.amount.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 font-valibuk text-xs ${statusConfig[order.status]?.bg} ${statusConfig[order.status]?.text}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Products */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-valibuk text-lg text-culte-navy">TOP PRODUCTS</h2>
              <Link to="/seller/products" className="font-valibuk text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest">
                SEE ALL
              </Link>
            </div>
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-culte-navy/10 hover:border-culte-navy transition-colors">
                  <div className="w-12 h-12 overflow-hidden bg-culte-light-blue flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-culte-black truncate">{product.name}</p>
                    <p className="font-valibuk text-xs text-culte-navy/40 mt-0.5">{product.sold} sold</p>
                  </div>
                  <p className="font-valibuk text-xs text-culte-navy flex-shrink-0">£${product.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="font-valibuk text-lg text-culte-navy mb-4">QUICK ACTIONS</h2>
            <div className="space-y-2">
              {[
                { label: 'ADD PRODUCT', path: '/seller/add-product', icon: Package },
                { label: 'MANAGE ORDERS', path: '/seller/orders', icon: ShoppingCart },
                { label: 'VIEW PAYOUTS', path: '/seller/payouts', icon: DollarSign },
                { label: 'ANALYTICS', path: '/seller/inventory', icon: TrendingUp },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.path}
                    to={action.path}
                    className="flex items-center gap-3 p-4 border border-culte-navy/10 hover:border-culte-orange hover:bg-culte-orange/5 transition-all group"
                  >
                    <Icon className="w-4 h-4 text-culte-navy group-hover:text-culte-orange transition-colors" />
                    <span className="font-valibuk text-xs text-culte-navy group-hover:text-culte-orange transition-colors tracking-widest">{action.label}</span>
                    <ArrowRight className="w-3 h-3 text-culte-navy/20 group-hover:text-culte-orange ml-auto transition-colors" />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Payout preview */}
          <section className="bg-culte-navy p-6">
            <p className="font-valibuk text-xs text-culte-orange tracking-widest mb-3">NEXT PAYOUT</p>
            <p className="font-valibuk text-3xl text-white">£2,840.00</p>
            <p className="text-xs text-white/40 mt-1">Scheduled: May 1, 2026</p>
            <Link to="/seller/payouts" className="mt-4 inline-flex items-center gap-1 font-valibuk text-xs text-white/60 hover:text-white transition-colors tracking-widest">
              VIEW PAYOUTS <ArrowRight className="w-3 h-3" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
