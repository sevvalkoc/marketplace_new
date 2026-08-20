import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/Button';

export const BuyerLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    // Mock login
    navigate('/buyer/account');
  };

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex flex-col bg-culte-navy p-16 relative overflow-hidden">
        <Link to="/" className="font-cormorant text-4xl text-white">Studio Marche</Link>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-6">WELCOME BACK</p>
          <h2 className="font-cormorant text-5xl text-white leading-tight">
            YOUR PERSONAL<br />CONCEPT STORE.
          </h2>
          <p className="mt-6 text-white/60 leading-relaxed max-w-sm">
            Sign in to track orders, manage your wishlist, and discover new arrivals curated just for you.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-culte-light-blue/10 rounded-full translate-x-24 translate-y-24" />
        <div className="absolute top-24 right-12 w-32 h-32 bg-culte-orange/10 rounded-full" />
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center px-6 md:px-16 lg:px-20 py-16">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="lg:hidden font-cormorant text-3xl text-culte-navy block mb-12">Studio Marche</Link>

          <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">ACCOUNT</p>
          <h1 className="font-cormorant text-4xl text-culte-navy mb-2">SIGN IN</h1>
          <p className="text-culte-black/50 text-sm mb-8">
            New to Studio Marche? <Link to="/buyer/signup" className="text-culte-orange hover:text-culte-navy transition-colors">CREATE AN ACCOUNT</Link>
          </p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-culte-navy tracking-widest mb-2">EMAIL</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-culte-navy tracking-widest">PASSWORD</label>
                <Link to="#" className="text-xs text-culte-orange hover:text-culte-navy transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border-2 border-culte-navy/15 px-4 py-4 pr-12 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-culte-navy/40 hover:text-culte-navy transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" size="lg" fullWidth className="mt-6">
              SIGN IN
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-culte-navy/10 text-center">
            <p className="text-xs text-culte-black/40 mb-4">Are you a seller?</p>
            <Link to="/seller/login">
              <Button variant="ghost" fullWidth>SELLER SIGN IN</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};