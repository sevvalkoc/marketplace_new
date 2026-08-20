import { useState } from 'react';
import { Store, User, Bell, DollarSign, Shield, Check, Upload, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/Button';

const sectionTabs = [
  { id: 'store', label: 'STORE', icon: Store },
  { id: 'account', label: 'ACCOUNT', icon: User },
  { id: 'payouts', label: 'PAYOUTS', icon: DollarSign },
  { id: 'notifications', label: 'NOTIFICATIONS', icon: Bell },
  { id: 'security', label: 'SECURITY', icon: Shield },
] as const;

export const SellerSettings = () => {
  const [activeSection, setActiveSection] = useState<'store' | 'account' | 'payouts' | 'notifications' | 'security'>('store');
  const [storeSaved, setStoreSaved] = useState(false);
  const [accountSaved, setAccountSaved] = useState(false);
  const [payoutSaved, setPayoutSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [storeForm, setStoreForm] = useState({
    name: 'Studio Clay',
    tagline: 'Handcrafted ceramics from Portland, Oregon.',
    description: 'Studio Clay was founded in 2018 by ceramicist Maya Torres. Each piece is thrown on the wheel, glazed by hand, and fired in a wood-reduction kiln. Limited batches, intentional objects.',
    location: 'Portland, Oregon',
    slug: 'studio-clay',
    website: 'https://studioclay.com',
    instagram: '@studioclay',
  });

  const [accountForm, setAccountForm] = useState({
    firstName: 'Maya',
    lastName: 'Torres',
    email: 'maya@studioclay.com',
    phone: '+1 (503) 555-0192',
  });

  const [payoutForm, setPayoutForm] = useState({
    bankName: 'First National Bank',
    accountHolder: 'Studio Clay LLC',
    accountNumber: '****1234',
    routingNumber: '****5678',
    currency: 'USD',
  });

  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderShipped: false,
    lowStock: true,
    weeklySummary: false,
    payoutProcessed: true,
    newReview: true,
    applicationUpdates: true,
  });

  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleStoreSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoreSaved(true);
    setTimeout(() => setStoreSaved(false), 2500);
  };

  const handleAccountSave = (e: React.FormEvent) => {
    e.preventDefault();
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 2500);
  };

  const handlePayoutSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSaved(true);
    setTimeout(() => setPayoutSaved(false), 2500);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">PORTAL</p>
          <h1 className="font-valibuk text-4xl text-culte-navy">SETTINGS</h1>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex overflow-x-auto border-b-2 border-culte-navy/10 mb-10">
        {sectionTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-5 py-4 font-valibuk text-xs tracking-widest border-b-2 transition-colors -mb-[2px] flex-shrink-0 ${
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

      {/* STORE SETTINGS */}
      {activeSection === 'store' && (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-valibuk text-2xl text-culte-navy">STORE INFORMATION</h2>
            {storeSaved && (
              <div className="flex items-center gap-2 text-green-600 font-valibuk text-xs">
                <Check className="w-4 h-4" /> SAVED
              </div>
            )}
          </div>

          <form onSubmit={handleStoreSave} className="space-y-6">
            {/* Store logo */}
            <div className="border-2 border-culte-navy/10 p-6">
              <p className="font-valibuk text-xs text-culte-navy/50 tracking-widest mb-4">STORE LOGO</p>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 overflow-hidden bg-culte-light-blue flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1766802981816-732b1679a6eb?w=100&h=100&fit=crop"
                    alt="Store logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="flex items-center gap-2 border-2 border-culte-navy/15 px-5 py-2.5 font-valibuk text-xs text-culte-navy hover:border-culte-navy transition-colors mb-2"
                  >
                    <Upload className="w-3.5 h-3.5" /> UPLOAD LOGO
                  </button>
                  <p className="text-xs text-culte-black/40">Recommended: 400×400px, PNG or JPG, max 2MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">STORE NAME *</label>
                <input
                  value={storeForm.name}
                  onChange={e => setStoreForm({ ...storeForm, name: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">TAGLINE</label>
                <input
                  value={storeForm.tagline}
                  onChange={e => setStoreForm({ ...storeForm, tagline: e.target.value })}
                  placeholder="A short tagline for your store"
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">STORE DESCRIPTION</label>
                <textarea
                  value={storeForm.description}
                  onChange={e => setStoreForm({ ...storeForm, description: e.target.value })}
                  rows={4}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm resize-none transition-colors"
                />
                <p className="text-xs text-culte-black/30 mt-1">{storeForm.description.length} characters</p>
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">LOCATION</label>
                <input
                  value={storeForm.location}
                  onChange={e => setStoreForm({ ...storeForm, location: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">STORE URL</label>
                <div className="flex items-center border-2 border-culte-navy/15 focus-within:border-culte-navy transition-colors">
                  <span className="px-3 text-culte-black/30 text-sm">culte.store/</span>
                  <input
                    value={storeForm.slug}
                    onChange={e => setStoreForm({ ...storeForm, slug: e.target.value })}
                    className="flex-1 py-3 pr-4 focus:outline-none text-sm bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">WEBSITE</label>
                <input
                  type="url"
                  value={storeForm.website}
                  onChange={e => setStoreForm({ ...storeForm, website: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">INSTAGRAM</label>
                <input
                  value={storeForm.instagram}
                  onChange={e => setStoreForm({ ...storeForm, instagram: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
            </div>

            <Button type="submit">SAVE STORE SETTINGS</Button>
          </form>

          {/* Preview link */}
          <div className="mt-8 p-5 bg-culte-light-blue flex items-center justify-between">
            <div>
              <p className="font-valibuk text-xs text-culte-navy tracking-wider mb-1">STORE PREVIEW</p>
              <p className="text-xs text-culte-black/60">See how your store looks to buyers on Studio Marche</p>
            </div>
            <a
              href="/seller/studio-clay"
              target="_blank"
              className="flex items-center gap-2 font-valibuk text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5"
            >
              VIEW STORE <Eye className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* ACCOUNT */}
      {activeSection === 'account' && (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-valibuk text-2xl text-culte-navy">ACCOUNT DETAILS</h2>
            {accountSaved && (
              <div className="flex items-center gap-2 text-green-600 font-valibuk text-xs">
                <Check className="w-4 h-4" /> SAVED
              </div>
            )}
          </div>
          <form onSubmit={handleAccountSave} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">FIRST NAME</label>
                <input
                  value={accountForm.firstName}
                  onChange={e => setAccountForm({ ...accountForm, firstName: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">LAST NAME</label>
                <input
                  value={accountForm.lastName}
                  onChange={e => setAccountForm({ ...accountForm, lastName: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={accountForm.email}
                onChange={e => setAccountForm({ ...accountForm, email: e.target.value })}
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">PHONE NUMBER</label>
              <input
                type="tel"
                value={accountForm.phone}
                onChange={e => setAccountForm({ ...accountForm, phone: e.target.value })}
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
              />
            </div>
            <Button type="submit">SAVE ACCOUNT DETAILS</Button>
          </form>
        </div>
      )}

      {/* PAYOUTS */}
      {activeSection === 'payouts' && (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-valibuk text-2xl text-culte-navy">PAYOUT INFORMATION</h2>
            {payoutSaved && (
              <div className="flex items-center gap-2 text-green-600 font-valibuk text-xs">
                <Check className="w-4 h-4" /> SAVED
              </div>
            )}
          </div>

          <div className="p-5 bg-culte-light-blue mb-8 flex items-start gap-3">
            <DollarSign className="w-4 h-4 text-culte-navy flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-valibuk text-xs text-culte-navy tracking-wider mb-1">PAYOUT SCHEDULE</p>
              <p className="text-xs text-culte-black/60 leading-relaxed">
                Payouts are processed on the 1st of each month for all completed orders from the prior month. Funds arrive within 2–3 working days. Studio Marche retains a 12% commission on each sale.
              </p>
            </div>
          </div>

          <form onSubmit={handlePayoutSave} className="space-y-5">
            <div>
              <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">BANK NAME *</label>
              <input
                value={payoutForm.bankName}
                onChange={e => setPayoutForm({ ...payoutForm, bankName: e.target.value })}
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">ACCOUNT HOLDER NAME *</label>
              <input
                value={payoutForm.accountHolder}
                onChange={e => setPayoutForm({ ...payoutForm, accountHolder: e.target.value })}
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">ACCOUNT NUMBER *</label>
                <input
                  value={payoutForm.accountNumber}
                  onChange={e => setPayoutForm({ ...payoutForm, accountNumber: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">ROUTING NUMBER *</label>
                <input
                  value={payoutForm.routingNumber}
                  onChange={e => setPayoutForm({ ...payoutForm, routingNumber: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">PAYOUT CURRENCY</label>
              <select
                value={payoutForm.currency}
                onChange={e => setPayoutForm({ ...payoutForm, currency: e.target.value })}
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm bg-white"
              >
                {['USD', 'GBP', 'EUR', 'AUD', 'CAD'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 p-4 bg-culte-light-blue">
              <Shield className="w-4 h-4 text-culte-navy flex-shrink-0" />
              <p className="text-xs text-culte-black/60">Bank details are encrypted and stored securely. They are never shared with third parties.</p>
            </div>
            <Button type="submit">UPDATE PAYOUT INFORMATION</Button>
          </form>
        </div>
      )}

      {/* NOTIFICATIONS */}
      {activeSection === 'notifications' && (
        <div className="max-w-3xl">
          <h2 className="font-valibuk text-2xl text-culte-navy mb-8">NOTIFICATION PREFERENCES</h2>

          <div className="space-y-6">
            {[
              {
                group: 'ORDERS',
                items: [
                  { key: 'newOrder', label: 'New order received', desc: 'Get notified every time a buyer places a new order.' },
                  { key: 'orderShipped', label: 'Order shipped confirmation', desc: 'Confirm when an order status changes to Shipped.' },
                ] as const
              },
              {
                group: 'PRODUCTS',
                items: [
                  { key: 'lowStock', label: 'Low stock alerts', desc: 'Get notified when a product falls below 5 units.' },
                  { key: 'newReview', label: 'New customer review', desc: 'Get notified when a buyer leaves a review on your products.' },
                ] as const
              },
              {
                group: 'BUSINESS',
                items: [
                  { key: 'payoutProcessed', label: 'Payout processed', desc: 'Confirm when your monthly payout has been sent.' },
                  { key: 'weeklySummary', label: 'Weekly sales summary', desc: 'Receive a weekly report of your sales and performance.' },
                  { key: 'applicationUpdates', label: 'Studio Marche platform updates', desc: 'News about new features and improvements to the seller portal.' },
                ] as const
              }
            ].map(section => (
              <div key={section.group}>
                <p className="font-valibuk text-xs text-culte-navy/40 tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-culte-navy/20 block" />
                  {section.group}
                </p>
                <div className="border-2 border-culte-navy/10">
                  {section.items.map((pref, i, arr) => (
                    <label
                      key={pref.key}
                      className={`flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-culte-light-blue/30 transition-colors ${i < arr.length - 1 ? 'border-b border-culte-navy/5' : ''}`}
                    >
                      <div className="flex-1 pr-8">
                        <p className="text-sm text-culte-black">{pref.label}</p>
                        <p className="text-xs text-culte-black/50 mt-0.5">{pref.desc}</p>
                      </div>
                      <div
                        onClick={() => setNotifications(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                        className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${notifications[pref.key] ? 'bg-culte-orange' : 'bg-culte-navy/20'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifications[pref.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button onClick={() => {}}>SAVE PREFERENCES</Button>
          </div>
        </div>
      )}

      {/* SECURITY */}
      {activeSection === 'security' && (
        <div className="max-w-3xl space-y-10">
          {/* Change password */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-valibuk text-2xl text-culte-navy">CHANGE PASSWORD</h2>
              {passwordSaved && (
                <div className="flex items-center gap-2 text-green-600 font-valibuk text-xs">
                  <Check className="w-4 h-4" /> PASSWORD UPDATED
                </div>
              )}
            </div>
            <form onSubmit={handlePasswordSave} className="space-y-4">
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">CURRENT PASSWORD</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordForm.current}
                    onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    placeholder="••••••••"
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 pr-12 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-culte-navy/40 hover:text-culte-navy transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">NEW PASSWORD</label>
                <input
                  type="password"
                  value={passwordForm.newPass}
                  onChange={e => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                  placeholder="Min. 8 characters"
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">CONFIRM NEW PASSWORD</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
              </div>
              <Button type="submit">UPDATE PASSWORD</Button>
            </form>
          </section>

          {/* 2FA placeholder */}
          <section className="border-t-2 border-culte-navy/10 pt-10">
            <h2 className="font-valibuk text-2xl text-culte-navy mb-4">TWO-FACTOR AUTHENTICATION</h2>
            <p className="text-sm text-culte-black/60 mb-5 leading-relaxed">
              Add an extra layer of security to your account. When enabled, you'll need to verify your identity with a second device when signing in.
            </p>
            <div className="flex items-center justify-between p-5 border-2 border-culte-navy/10">
              <div className="flex items-center gap-4">
                <Shield className="w-5 h-5 text-culte-navy/40" />
                <div>
                  <p className="font-valibuk text-sm text-culte-navy">Authenticator App</p>
                  <p className="text-xs text-culte-black/40 mt-0.5">Not yet enabled</p>
                </div>
              </div>
              <button className="font-valibuk text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5">
                ENABLE
              </button>
            </div>
          </section>

          {/* Active sessions */}
          <section className="border-t-2 border-culte-navy/10 pt-10">
            <h2 className="font-valibuk text-2xl text-culte-navy mb-5">ACTIVE SESSIONS</h2>
            <div className="space-y-3">
              {[
                { device: 'MacBook Pro — Chrome', location: 'Portland, OR, USA', time: 'Current session', current: true },
                { device: 'iPhone 15 — Safari', location: 'Portland, OR, USA', time: '2 hours ago', current: false },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-5 border-2 border-culte-navy/10">
                  <div>
                    <p className="text-sm text-culte-black">{session.device}</p>
                    <p className="text-xs text-culte-black/40 mt-0.5">{session.location} · {session.time}</p>
                  </div>
                  {session.current ? (
                    <span className="font-valibuk text-xs text-culte-orange">CURRENT</span>
                  ) : (
                    <button className="font-valibuk text-xs text-culte-navy/40 hover:text-red-500 transition-colors tracking-widest">REVOKE</button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
