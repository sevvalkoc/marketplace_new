import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Check, ArrowRight, Lock } from 'lucide-react';
import { Button } from '../../components/Button';

export const SellerLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'apply'>('login');
  const [form, setForm] = useState({ email: '', password: '', brandName: '', website: '', category: '', message: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    navigate('/seller/dashboard');
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.brandName) {
      setError('Please fill in all required fields.');
      return;
    }
    setMode('login');
    setError('');
    // Show success
  };

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      {/* Left: Brand Editorial Panel */}
      <div className="relative hidden lg:block bg-culte-navy overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1765371513189-44702dcee4be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
          alt="Sell on Studio Marche"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 flex flex-col h-full p-16">
          <Link to="/" className="font-valibuk text-4xl text-white">Studio Marche</Link>
          <div className="flex-1 flex flex-col justify-center">
            <p className="font-valibuk text-xs text-culte-orange tracking-[0.4em] mb-6">SELLER PORTAL</p>
            <h2 className="font-valibuk text-5xl text-white leading-tight">
              YOUR BRAND.<br />OUR PLATFORM.
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed max-w-sm">
              Reach a curated audience of design-conscious buyers. Manage your products, track orders, and grow your brand through Studio Marche's editorial platform.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { num: '10K+', label: 'Active buyers' },
                { num: '80+', label: 'Makers' },
                { num: '12%', label: 'Commission' },
                { num: '4.8★', label: 'Avg rating' }
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 p-4">
                  <p className="font-valibuk text-2xl text-white">{stat.num}</p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <Lock className="w-3.5 h-3.5" />
            Secure seller portal
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center px-6 md:px-16 lg:px-20 py-16">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="lg:hidden font-valibuk text-3xl text-culte-navy block mb-12">Studio Marche</Link>

          {/* Mode Toggle */}
          <div className="flex border-2 border-culte-navy/15 mb-8">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-3 font-valibuk text-xs tracking-widest transition-colors ${
                mode === 'login' ? 'bg-culte-navy text-white' : 'text-culte-navy/50 hover:text-culte-navy'
              }`}
            >
              SELLER LOGIN
            </button>
            <button
              onClick={() => { setMode('apply'); setError(''); }}
              className={`flex-1 py-3 font-valibuk text-xs tracking-widest transition-colors ${
                mode === 'apply' ? 'bg-culte-orange text-white' : 'text-culte-navy/50 hover:text-culte-navy'
              }`}
            >
              APPLY TO SELL
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <>
              <p className="font-valibuk text-xs text-culte-orange tracking-[0.4em] mb-4">PORTAL ACCESS</p>
              <h1 className="font-valibuk text-4xl text-culte-navy mb-6">SELLER SIGN IN</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block font-valibuk text-xs text-culte-navy tracking-widest mb-2">EMAIL</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="brand@example.com"
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
                <div>
                  <label className="block font-valibuk text-xs text-culte-navy tracking-widest mb-2">PASSWORD</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full border-2 border-culte-navy/15 px-4 py-4 pr-12 focus:outline-none focus:border-culte-navy text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-culte-navy/40 hover:text-culte-navy"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" size="lg" fullWidth className="mt-2">
                  SIGN IN TO DASHBOARD
                </Button>
              </form>
              <p className="text-xs text-center text-culte-black/40 mt-6">
                Not a seller yet?{' '}
                <button onClick={() => setMode('apply')} className="text-culte-orange hover:text-culte-navy transition-colors font-valibuk">
                  APPLY NOW
                </button>
              </p>
            </>
          ) : (
            <>
              <p className="font-valibuk text-xs text-culte-orange tracking-[0.4em] mb-4">FOR MAKERS</p>
              <h1 className="font-valibuk text-4xl text-culte-navy mb-2">APPLY TO SELL</h1>
              <p className="text-culte-black/50 text-sm mb-6">
                Tell us about your brand. Our curation team reviews every application within 5 working days.
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6 p-5 bg-culte-light-blue">
                {['Access to 10,000+ design-conscious buyers', 'Editorial brand placement', 'Transparent 12% commission', 'Full dashboard & analytics'].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-culte-orange flex-shrink-0" />
                    <span className="text-xs text-culte-black/70">{benefit}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block font-valibuk text-xs text-culte-navy tracking-widest mb-2">BRAND NAME *</label>
                  <input
                    type="text"
                    value={form.brandName}
                    onChange={e => setForm({ ...form, brandName: e.target.value })}
                    placeholder="Your brand name"
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
                <div>
                  <label className="block font-valibuk text-xs text-culte-navy tracking-widest mb-2">EMAIL *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="brand@example.com"
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
                <div>
                  <label className="block font-valibuk text-xs text-culte-navy tracking-widest mb-2">WEBSITE</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={e => setForm({ ...form, website: e.target.value })}
                    placeholder="https://yourbrand.com"
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
                <div>
                  <label className="block font-valibuk text-xs text-culte-navy tracking-widest mb-2">CATEGORY</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm bg-white"
                  >
                    <option value="">Select a category</option>
                    {['Women', 'Men', 'Home', 'Beauty', 'Objects', 'Kids'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-valibuk text-xs text-culte-navy tracking-widest mb-2">ABOUT YOUR BRAND</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your brand, your process, and what makes your products special..."
                    rows={3}
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm resize-none"
                  />
                </div>
                <Button type="submit" size="lg" fullWidth className="flex items-center justify-center gap-2">
                  SUBMIT APPLICATION <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-culte-navy/10">
            <Link to="/buyer/login" className="text-xs text-culte-black/40 hover:text-culte-orange transition-colors">
              ← Back to buyer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};