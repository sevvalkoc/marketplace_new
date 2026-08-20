import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '../../components/Button';

export const BuyerSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!agreed) {
      setError('Please accept the terms to continue.');
      return;
    }
    navigate('/buyer/account');
  };

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabels = ['', 'WEAK', 'GOOD', 'STRONG'];
  const strengthColors = ['', 'bg-red-400', 'bg-culte-orange', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex flex-col bg-culte-light-blue p-16 relative overflow-hidden">
        <Link to="/" className="font-cormorant text-4xl text-culte-navy">Studio Marche</Link>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-6">JOIN US</p>
          <h2 className="font-cormorant text-5xl text-culte-navy leading-tight">
            DISCOVER THE<br />FINEST THINGS.
          </h2>
          <p className="mt-6 text-culte-black/60 leading-relaxed max-w-sm">
            Create an account to save your favourites, track orders, and get early access to new arrivals.
          </p>
          <div className="mt-12 space-y-3">
            {[
              'Curated new arrivals weekly',
              'Exclusive member-only offers',
              'Track orders & returns',
              'Save to wishlist'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-culte-orange flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-culte-black/70">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center px-6 md:px-16 lg:px-20 py-16">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="lg:hidden font-cormorant text-3xl text-culte-navy block mb-12">Studio Marche</Link>

          <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">NEW ACCOUNT</p>
          <h1 className="font-cormorant text-4xl text-culte-navy mb-2">CREATE ACCOUNT</h1>
          <p className="text-culte-black/50 text-sm mb-8">
            Already have an account? <Link to="/buyer/login" className="text-culte-orange hover:text-culte-navy transition-colors">SIGN IN</Link>
          </p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-culte-navy tracking-widest mb-2">FIRST NAME</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  placeholder="First"
                  className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-culte-navy tracking-widest mb-2">LAST NAME</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Last"
                  className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-culte-navy tracking-widest mb-2">EMAIL</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-culte-navy tracking-widest mb-2">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  className="w-full border-2 border-culte-navy/15 px-4 py-4 pr-12 focus:outline-none focus:border-culte-navy text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-culte-navy/40 hover:text-culte-navy transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 transition-colors ${i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-culte-navy/10'}`} />
                    ))}
                  </div>
                  <span className={`text-xs ${passwordStrength === 1 ? 'text-red-400' : passwordStrength === 2 ? 'text-culte-orange' : 'text-green-500'}`}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-colors cursor-pointer ${agreed ? 'bg-culte-orange border-culte-orange' : 'border-culte-navy/30 hover:border-culte-navy'}`}
              >
                {agreed && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-xs text-culte-black/60 leading-relaxed">
                I agree to the <Link to="#" className="text-culte-orange hover:text-culte-navy transition-colors">Terms of Service</Link> and{' '}
                <Link to="#" className="text-culte-orange hover:text-culte-navy transition-colors">Privacy Policy</Link>.
              </span>
            </label>

            <Button type="submit" size="lg" fullWidth className="mt-4">
              CREATE ACCOUNT
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};