import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ChevronDown, Lock, Check, ShoppingBag } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { useSEO } from '../lib/useSEO';

export const Checkout = () => {
  useSEO({ title: 'Checkout | Studio Marche', path: '/checkout', noindex: true });
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<'info' | 'shipping' | 'payment' | 'confirmation'>('info');
  const [sameAddress, setSameAddress] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [orderNumber] = useState(() => `ORD-2026-${Math.floor(Math.random() * 9000) + 1000}`);
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', postcode: '', country: 'United Kingdom',
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  });

  const shippingCost = shippingMethod === 'express' ? 22 : subtotal >= 150 ? 0 : 12;
  const total = subtotal + shippingCost;

  const steps = [
    { id: 'info', label: 'INFORMATION' },
    { id: 'shipping', label: 'SHIPPING' },
    { id: 'payment', label: 'PAYMENT' },
  ];

  const handlePlaceOrder = () => {
    clearCart();
    setStep('confirmation');
  };

  // Empty cart guard
  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-culte-navy/20 mx-auto mb-6" />
          <h1 className="font-cormorant text-3xl text-culte-navy mb-4">YOUR BAG IS EMPTY</h1>
          <p className="text-culte-black/60 mb-8">Add some products before checking out.</p>
          <Link to="/shop"><Button size="lg">SHOP NOW</Button></Link>
        </div>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-culte-orange flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">ORDER CONFIRMED</p>
          <h1 className="font-cormorant text-4xl text-culte-navy mb-4">THANK YOU.</h1>
          <p className="text-culte-black/60 leading-relaxed mb-2">
            Your order <span className="font-cormorant text-culte-navy">#{orderNumber}</span> has been placed.
          </p>
          <p className="text-culte-black/60 mb-8">
            A confirmation will be sent to <span className="text-culte-navy">{form.email || 'your email'}</span>.
          </p>

          {/* Estimated delivery */}
          <div className="mb-8 p-5 bg-culte-light-blue flex items-center justify-between text-left">
            <div>
              <p className="text-xs text-culte-navy/40 tracking-widest mb-1">ESTIMATED DELIVERY</p>
              <p className="text-sm text-culte-navy">
                {shippingMethod === 'express' ? '2–3 working days' : '5–7 working days'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-culte-navy/40 tracking-widest mb-1">SHIPPING</p>
              <p className="text-sm text-culte-navy">
                {shippingMethod === 'express' ? 'Express' : 'Standard'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Link to="/buyer/orders"><Button>VIEW MY ORDERS</Button></Link>
            <Link to="/shop"><Button variant="ghost">CONTINUE SHOPPING</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Checkout Header */}
      <div className="border-b-2 border-culte-navy bg-white sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-cormorant text-3xl text-culte-navy">Studio Marche</Link>
          <div className="flex items-center gap-2 text-xs text-culte-black/40">
            <Lock className="w-3.5 h-3.5" /> SECURE CHECKOUT
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Step Progress */}
        <div className="flex items-center gap-0 mb-12 max-w-lg">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 flex items-center justify-center text-xs transition-colors ${
                  step === s.id ? 'bg-culte-orange text-white' :
                  steps.findIndex(x => x.id === step) > i ? 'bg-culte-navy text-white' : 'bg-culte-navy/10 text-culte-navy/40'
                }`}>
                  {steps.findIndex(x => x.id === step) > i ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`hidden sm:block text-xs tracking-widest ${
                  step === s.id ? 'text-culte-navy' : 'text-culte-navy/30'
                }`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${steps.findIndex(x => x.id === step) > i ? 'bg-culte-navy' : 'bg-culte-navy/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form column */}
          <div className="lg:col-span-7">

            {/* INFORMATION */}
            {step === 'info' && (
              <div>
                <h2 className="font-cormorant text-2xl text-culte-navy mb-6">CONTACT INFORMATION</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                  />

                  <h3 className="text-sm text-culte-navy tracking-wider mt-8 mb-4">SHIPPING ADDRESS</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="First name"
                      value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                      className="border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                    />
                    <input
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                      className="border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                    />
                  </div>
                  <input
                    placeholder="Address"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="City"
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                    />
                    <input
                      placeholder="Postcode"
                      value={form.postcode}
                      onChange={e => setForm({ ...form, postcode: e.target.value })}
                      className="border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={form.country}
                      onChange={e => setForm({ ...form, country: e.target.value })}
                      className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm appearance-none bg-white transition-colors"
                    >
                      {['United Kingdom', 'United States', 'France', 'Germany', 'Australia', 'Canada', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Denmark', 'Norway', 'Ireland'].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-culte-navy/40 pointer-events-none" />
                  </div>
                </div>
                <Button size="lg" className="mt-8" onClick={() => setStep('shipping')}>
                  CONTINUE TO SHIPPING
                </Button>
              </div>
            )}

            {/* SHIPPING */}
            {step === 'shipping' && (
              <div>
                <h2 className="font-cormorant text-2xl text-culte-navy mb-6">SHIPPING METHOD</h2>
                <div className="space-y-3">
                  {[
                    { id: 'standard', label: 'STANDARD SHIPPING', desc: '5–7 working days', price: subtotal >= 150 ? 0 : 12 },
                    { id: 'express', label: 'EXPRESS SHIPPING', desc: '2–3 working days', price: 22 },
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-5 border-2 cursor-pointer transition-colors ${
                        shippingMethod === method.id ? 'border-culte-orange bg-culte-orange/5' : 'border-culte-navy/15 hover:border-culte-navy'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          shippingMethod === method.id ? 'border-culte-orange' : 'border-culte-navy/30'
                        }`}>
                          {shippingMethod === method.id && <div className="w-2.5 h-2.5 bg-culte-orange rounded-full" />}
                        </div>
                        <div>
                          <p className="text-sm text-culte-navy">{method.label}</p>
                          <p className="text-xs text-culte-black/50 mt-0.5">{method.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm text-culte-navy">
                        {method.price === 0 ? <span className="text-culte-orange">FREE</span> : `£{method.price}`}
                      </span>
                      <input type="radio" name="shipping" className="hidden" checked={shippingMethod === method.id} onChange={() => setShippingMethod(method.id)} />
                    </label>
                  ))}
                </div>
                {subtotal >= 150 && shippingMethod === 'standard' && (
                  <p className="text-xs text-culte-orange mt-3 tracking-wider">✓ YOUR ORDER QUALIFIES FOR FREE STANDARD SHIPPING</p>
                )}
                <div className="flex gap-4 mt-8">
                  <Button variant="ghost" onClick={() => setStep('info')}>BACK</Button>
                  <Button size="lg" onClick={() => setStep('payment')}>CONTINUE TO PAYMENT</Button>
                </div>
              </div>
            )}

            {/* PAYMENT */}
            {step === 'payment' && (
              <div>
                <h2 className="font-cormorant text-2xl text-culte-navy mb-6">PAYMENT DETAILS</h2>
                <div className="space-y-4">
                  <input
                    placeholder="Name on card"
                    value={form.cardName}
                    onChange={e => setForm({ ...form, cardName: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                  />
                  <input
                    placeholder="Card number"
                    value={form.cardNumber}
                    onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="MM / YY"
                      value={form.expiry}
                      onChange={e => setForm({ ...form, expiry: e.target.value })}
                      className="border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                    />
                    <input
                      placeholder="CVV"
                      value={form.cvv}
                      onChange={e => setForm({ ...form, cvv: e.target.value })}
                      className="border-2 border-culte-navy/15 px-4 py-4 focus:outline-none focus:border-culte-navy text-sm transition-colors"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={sameAddress} onChange={e => setSameAddress(e.target.checked)} className="w-4 h-4 accent-culte-orange" />
                    <span className="text-sm text-culte-black">Billing address same as shipping</span>
                  </label>
                </div>
                <div className="flex items-center gap-3 mt-4 p-4 bg-culte-light-blue">
                  <Lock className="w-4 h-4 text-culte-navy flex-shrink-0" />
                  <p className="text-xs text-culte-black/60">Your payment information is encrypted and secure. We never store your card details.</p>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button variant="ghost" onClick={() => setStep('shipping')}>BACK</Button>
                  <Button size="lg" onClick={handlePlaceOrder}>
                    PLACE ORDER — £{total.toFixed(2)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-culte-light-blue p-8 lg:sticky lg:top-28">
              <h2 className="text-xs text-culte-navy tracking-widest mb-6">YOUR ORDER ({items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'})</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                    <div className="w-16 h-20 overflow-hidden bg-white flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-culte-navy text-white text-xs flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-culte-navy/40">{item.seller}</p>
                      <p className="text-sm text-culte-black leading-tight">{item.name}</p>
                      {item.size && <p className="text-xs text-culte-black/40 mt-0.5">Size: {item.size}</p>}
                    </div>
                    <p className="text-sm text-culte-navy flex-shrink-0">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-culte-navy/15 pt-5 space-y-3 text-sm">
                <div className="flex justify-between text-culte-black">
                  <span>Subtotal</span><span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-culte-black">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-culte-orange text-xs' : ''}>
                    {shippingCost === 0 ? 'FREE' : `£{shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-culte-navy border-t border-culte-navy/15 pt-3 mt-3">
                  <span>TOTAL</span><span className="text-lg">£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Accepted payments */}
              <div className="mt-6 pt-5 border-t border-culte-navy/10">
                <p className="text-xs text-culte-navy/30 tracking-widest mb-3">WE ACCEPT</p>
                <div className="flex gap-2">
                  {['VISA', 'MC', 'AMEX', 'PAYPAL'].map(m => (
                    <span key={m} className="text-xs text-culte-navy/40 border border-culte-navy/15 px-2 py-1">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};