import { Outlet, Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Settings,
  HelpCircle,
  Menu,
  X,
  BarChart3,
  ArrowUpRight,
  Bell
} from 'lucide-react';
import { useState } from 'react';

export const SellerLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'DASHBOARD', path: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'PRODUCTS', path: '/seller/products', icon: Package },
    { name: 'ORDERS', path: '/seller/orders', icon: ShoppingCart },
    { name: 'INVENTORY', path: '/seller/inventory', icon: BarChart3 },
    { name: 'PAYOUTS', path: '/seller/payouts', icon: DollarSign },
    { name: 'SETTINGS', path: '/seller/settings', icon: Settings },
    { name: 'SUPPORT', path: '/seller/support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-culte-navy border-b border-white/10 sticky top-0 z-40 h-16 flex items-center">
        <div className="flex items-center justify-between w-full px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:text-culte-orange transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/" className="font-cormorant text-2xl text-white hover:text-culte-orange transition-colors">
              Studio Marche
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-white/20">/</span>
              <span className="text-xs text-culte-orange tracking-widest">SELLER PORTAL</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="relative text-white/60 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-culte-orange rounded-full flex items-center justify-center">
                <span className="text-white" style={{ fontSize: '8px' }}>2</span>
              </span>
            </button>

            {/* Store preview */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors tracking-widest border border-white/20 px-3 py-1.5 hover:border-white/40"
            >
              VIEW STORE <ArrowUpRight className="w-3 h-3" />
            </Link>

            {/* Avatar */}
            <div className="w-8 h-8 bg-culte-orange flex items-center justify-center">
              <span className="text-xs text-white">SC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:static
          inset-y-0 left-0 z-30
          w-56 bg-white
          border-r-2 border-culte-navy/10
          transition-transform duration-300
          pt-16 lg:pt-0
          flex flex-col
          min-h-screen
        `}>
          {/* Seller info */}
          <div className="p-6 border-b border-culte-navy/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 overflow-hidden bg-culte-light-blue flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1766802981816-732b1679a6eb?w=100&h=100&fit=crop"
                  alt="Studio Clay"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-culte-navy">STUDIO CLAY</p>
                <p className="text-xs text-culte-black/40 mt-0.5">Verified Maker</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 mb-1 transition-all ${
                    isActive
                      ? 'bg-culte-orange text-white'
                      : 'text-culte-navy/60 hover:text-culte-navy hover:bg-culte-light-blue'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs tracking-widest">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Add product CTA */}
          <div className="p-4 border-t border-culte-navy/10">
            <Link
              to="/seller/add-product"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center justify-center gap-2 bg-culte-navy text-white px-4 py-3 text-xs tracking-widest hover:bg-culte-orange transition-colors w-full"
            >
              + ADD PRODUCT
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-culte-navy/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};