import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { User, Package, MapPin, CreditCard, Settings, ChevronRight, Heart, Check, Eye, EyeOff, Bell, Shield, Trash2 } from 'lucide-react';
import { Button } from '../../components/Button';

const navItems = [
  { label: 'OVERVIEW', path: '/buyer/account', icon: User },
  { label: 'MY ORDERS', path: '/buyer/orders', icon: Package },
  { label: 'WISHLIST', path: '/wishlist', icon: Heart },
  { label: 'ADDRESSES', path: '/buyer/addresses', icon: MapPin },
  { label: 'PAYMENT', path: '/buyer/payment', icon: CreditCard },
  { label: 'SETTINGS', path: '/buyer/settings', icon: Settings },
];

export const BuyerSettings = () => {
  const location = useLocation();
  const [profileForm, setProfileForm] = useState({ firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah@example.com', phone: '+1 (555) 234-5678' });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [notifications, setNotifications] = useState({
    newArrivals: true, orderUpdates: true, wishlistBack: false, newsletter: true, sms: false
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'password' | 'notifications' | 'privacy'>('profile');

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  const sectionTabs = [
    { id: 'profile', label: 'PROFILE', icon: User },
    { id: 'password', label: 'PASSWORD', icon: Shield },
    { id: 'notifications', label: 'NOTIFICATIONS', icon: Bell },
  ] as const;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">PORTAL</p>
          <h1 className="font-cormorant text-5xl text-culte-navy">SETTINGS</h1>
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
                      isActive ? 'bg-culte-navy text-white' : 'text-culte-navy hover:bg-culte-light-blue'
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

          {/* Main */}
          <main className="lg:col-span-9">
            {/* Section tabs */}
            <div className="flex border-b-2 border-culte-navy/10 mb-10">
              {sectionTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-xs tracking-widest border-b-2 transition-colors -mb-[2px] ${
                      activeSection === tab.id
                        ? 'border-culte-orange text-culte-orange'
                        : 'border-transparent text-culte-navy/40 hover:text-culte-navy'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* PROFILE */}
            {activeSection === 'profile' && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-cormorant text-2xl text-culte-navy">PERSONAL INFORMATION</h2>
                  {profileSaved && (
                    <div className="flex items-center gap-2 text-green-600 text-xs">
                      <Check className="w-4 h-4" /> SAVED
                    </div>
                  )}
                </div>
                <form onSubmit={saveProfile} className="space-y-5 max-w-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">FIRST NAME</label>
                      <input
                        value={profileForm.firstName}
                        onChange={e => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">LAST NAME</label>
                      <input
                        value={profileForm.lastName}
                        onChange={e => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">PHONE NUMBER (OPTIONAL)</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                    />
                  </div>
                  <Button type="submit">SAVE CHANGES</Button>
                </form>

                {/* Danger zone */}
                <div className="mt-16 pt-8 border-t-2 border-culte-navy/10 max-w-2xl">
                  <h3 className="font-cormorant text-lg text-culte-navy mb-2">DANGER ZONE</h3>
                  <p className="text-sm text-culte-black/60 mb-5">Once you delete your account, there is no going back. All your data, orders, and preferences will be permanently removed.</p>
                  {showDeleteConfirm ? (
                    <div className="bg-red-50 border-2 border-red-200 p-5">
                      <p className="text-sm text-red-700 mb-4">Are you sure you want to delete your account? This cannot be undone.</p>
                      <div className="flex gap-3">
                        <button className="bg-red-500 text-white px-5 py-2.5 text-xs tracking-widest hover:bg-red-600 transition-colors">CONFIRM DELETE</button>
                        <button onClick={() => setShowDeleteConfirm(false)} className="border-2 border-red-300 text-red-600 px-5 py-2.5 text-xs tracking-widest hover:border-red-500 transition-colors">CANCEL</button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center gap-2 border-2 border-red-200 text-red-600 px-5 py-3 text-xs tracking-widest hover:border-red-400 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> DELETE ACCOUNT
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* PASSWORD */}
            {activeSection === 'password' && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-cormorant text-2xl text-culte-navy">CHANGE PASSWORD</h2>
                  {passwordSaved && (
                    <div className="flex items-center gap-2 text-green-600 text-xs">
                      <Check className="w-4 h-4" /> PASSWORD UPDATED
                    </div>
                  )}
                </div>
                <form onSubmit={savePassword} className="space-y-5 max-w-2xl">
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">CURRENT PASSWORD</label>
                    <div className="relative">
                      <input
                        type={showCurrent ? 'text' : 'password'}
                        value={passwordForm.current}
                        onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                        placeholder="••••••••"
                        className="w-full border-2 border-culte-navy/15 px-4 py-3 pr-12 focus:outline-none focus:border-culte-navy text-sm"
                      />
                      <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-culte-navy/40 hover:text-culte-navy transition-colors">
                        {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">NEW PASSWORD</label>
                    <div className="relative">
                      <input
                        type={showNew ? 'text' : 'password'}
                        value={passwordForm.newPass}
                        onChange={e => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                        placeholder="Min. 8 characters"
                        className="w-full border-2 border-culte-navy/15 px-4 py-3 pr-12 focus:outline-none focus:border-culte-navy text-sm"
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-culte-navy/40 hover:text-culte-navy transition-colors">
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">CONFIRM NEW PASSWORD</label>
                    <input
                      type="password"
                      value={passwordForm.confirm}
                      onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                      placeholder="••••••••"
                      className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                    />
                  </div>
                  {passwordForm.newPass && passwordForm.confirm && passwordForm.newPass !== passwordForm.confirm && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                  <Button type="submit" disabled={!!passwordForm.newPass && !!passwordForm.confirm && passwordForm.newPass !== passwordForm.confirm}>
                    UPDATE PASSWORD
                  </Button>
                </form>
              </section>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === 'notifications' && (
              <section>
                <h2 className="font-cormorant text-2xl text-culte-navy mb-8">NOTIFICATION PREFERENCES</h2>

                <div className="space-y-0 max-w-2xl border-2 border-culte-navy/10">
                  {([
                    { key: 'newArrivals', label: 'New arrivals & drops', desc: 'Be the first to know when new products land on Studio Marche' },
                    { key: 'orderUpdates', label: 'Order updates & shipping', desc: 'Get notified when your orders are processed, shipped, and delivered.' },
                    { key: 'wishlistBack', label: 'Wishlist restocks', desc: 'Notify me when a wishlisted item comes back in stock.' },
                    { key: 'newsletter', label: 'The Edit newsletter', desc: 'Curated stories, new makers, and editorial content.' },
                    { key: 'sms', label: 'SMS notifications', desc: 'Receive order updates and delivery alerts via text message.' },
                  ] as const).map((pref, i, arr) => (
                    <label key={pref.key} className={`flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-culte-light-blue/30 transition-colors ${i < arr.length - 1 ? 'border-b border-culte-navy/5' : ''}`}>
                      <div className="flex-1 pr-8">
                        <p className="text-sm text-culte-black">{pref.label}</p>
                        <p className="text-xs text-culte-black/50 mt-0.5">{pref.desc}</p>
                      </div>
                      {/* Toggle */}
                      <div
                        onClick={() => setNotifications(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                        className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${notifications[pref.key] ? 'bg-culte-orange' : 'bg-culte-navy/20'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifications[pref.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                  ))}
                </div>

                <p className="text-xs text-culte-black/40 mt-4 max-w-2xl">
                  You can manage your notification preferences at any time. Transactional emails (order confirmations, receipts) cannot be disabled.
                </p>

                <div className="mt-8">
                  <Button onClick={() => {}}>SAVE PREFERENCES</Button>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};