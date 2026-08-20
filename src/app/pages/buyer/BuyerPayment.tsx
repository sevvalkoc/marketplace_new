import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { User, Package, MapPin, CreditCard, Settings, ChevronRight, Heart, Plus, Trash2, Check, X, Shield } from 'lucide-react';
import { Button } from '../../components/Button';

const navItems = [
  { label: 'OVERVIEW', path: '/buyer/account', icon: User },
  { label: 'MY ORDERS', path: '/buyer/orders', icon: Package },
  { label: 'WISHLIST', path: '/wishlist', icon: Heart },
  { label: 'ADDRESSES', path: '/buyer/addresses', icon: MapPin },
  { label: 'PAYMENT', path: '/buyer/payment', icon: CreditCard },
  { label: 'SETTINGS', path: '/buyer/settings', icon: Settings },
];

interface PaymentCard {
  id: number;
  type: 'Visa' | 'Mastercard' | 'Amex';
  last4: string;
  expiry: string;
  name: string;
  isDefault: boolean;
}

const initialCards: PaymentCard[] = [
  {
    id: 1,
    type: 'Visa',
    last4: '4242',
    expiry: '12/26',
    name: 'Sarah Mitchell',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Mastercard',
    last4: '5678',
    expiry: '08/27',
    name: 'Sarah Mitchell',
    isDefault: false,
  },
];

const cardColors: Record<string, { bg: string; text: string; sub: string }> = {
  Visa: { bg: 'bg-culte-navy', text: 'text-white', sub: 'text-white/60' },
  Mastercard: { bg: 'bg-culte-black', text: 'text-white', sub: 'text-white/60' },
  Amex: { bg: 'bg-culte-orange', text: 'text-white', sub: 'text-white/70' },
};

export const BuyerPayment = () => {
  const location = useLocation();
  const [cards, setCards] = useState<PaymentCard[]>(initialCards);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAddCard = () => {
    if (!form.name || !form.number || !form.expiry || !form.cvv) return;
    const last4 = form.number.replace(/\s/g, '').slice(-4);
    const type = form.number.startsWith('4') ? 'Visa' : form.number.startsWith('5') ? 'Mastercard' : 'Amex';
    const newCard: PaymentCard = {
      id: Date.now(), type, last4, expiry: form.expiry, name: form.name,
      isDefault: cards.length === 0
    };
    setCards(prev => [...prev, newCard]);
    setForm({ name: '', number: '', expiry: '', cvv: '' });
    setAddedSuccess(true);
    setTimeout(() => { setAddedSuccess(false); setShowAddModal(false); }, 1500);
  };

  const handleDelete = (id: number) => {
    setCards(prev => {
      const remaining = prev.filter(c => c.id !== id);
      if (remaining.length > 0 && !remaining.find(c => c.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
    setDeleteId(null);
  };

  const setDefault = (id: number) => {
    setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">PORTAL</p>
          <h1 className="font-cormorant text-5xl text-culte-navy">PAYMENT</h1>
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-cormorant text-xl text-culte-navy">SAVED PAYMENT METHODS</h2>
                <p className="text-sm text-culte-black/50 mt-1">{cards.length} card{cards.length !== 1 ? 's' : ''} saved</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-culte-navy text-white px-5 py-3 text-xs tracking-widest hover:bg-culte-orange transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> ADD CARD
              </button>
            </div>

            {/* Card visual display */}
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {cards.map((card) => {
                const style = cardColors[card.type];
                return (
                  <div key={card.id} className={`relative ${style.bg} p-6 aspect-[1.6/1] flex flex-col justify-between overflow-hidden`}>
                    {/* Background decorative circles */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5" />
                    <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-white/5" />

                    {/* Default badge */}
                    {card.isDefault && (
                      <div className="absolute top-4 right-4 bg-culte-orange px-2 py-0.5 flex items-center gap-1">
                        <Check className="w-3 h-3 text-white" />
                        <span className="text-xs text-white">DEFAULT</span>
                      </div>
                    )}

                    {/* Card type */}
                    <div className="flex items-center justify-between">
                      <p className={`text-lg ${style.text}`}>{card.type.toUpperCase()}</p>
                    </div>

                    {/* Card number */}
                    <div>
                      <p className={`text-xl tracking-[0.2em] ${style.text} mb-3`}>
                        •••• •••• •••• {card.last4}
                      </p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className={`text-xs ${style.sub} tracking-widest mb-1`}>CARD HOLDER</p>
                          <p className={`text-sm ${style.text}`}>{card.name}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs ${style.sub} tracking-widest mb-1`}>EXPIRES</p>
                          <p className={`text-sm ${style.text}`}>{card.expiry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add new card button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="border-2 border-dashed border-culte-navy/20 aspect-[1.6/1] flex flex-col items-center justify-center gap-3 hover:border-culte-orange hover:bg-culte-orange/5 transition-all group"
              >
                <div className="w-10 h-10 border-2 border-culte-navy/20 group-hover:border-culte-orange flex items-center justify-center transition-colors">
                  <Plus className="w-5 h-5 text-culte-navy/40 group-hover:text-culte-orange transition-colors" />
                </div>
                <p className="text-xs text-culte-navy/40 group-hover:text-culte-orange transition-colors tracking-widest">ADD NEW CARD</p>
              </button>
            </div>

            {/* Card list with actions */}
            <div className="border-2 border-culte-navy/10">
              <div className="bg-culte-light-blue px-6 py-3 border-b border-culte-navy/10">
                <p className="text-xs text-culte-navy/50 tracking-widest">MANAGE CARDS</p>
              </div>
              {cards.map((card, i) => (
                <div key={card.id} className={`flex items-center justify-between px-6 py-4 ${i < cards.length - 1 ? 'border-b border-culte-navy/5' : ''} hover:bg-culte-light-blue/20 transition-colors`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-8 ${cardColors[card.type].bg} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xs text-white">{card.type.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm text-culte-navy">{card.type} •••• {card.last4}</p>
                      <p className="text-xs text-culte-black/40 mt-0.5">Expires {card.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {card.isDefault ? (
                      <span className="text-xs text-culte-orange">DEFAULT</span>
                    ) : (
                      <button
                        onClick={() => setDefault(card.id)}
                        className="text-xs text-culte-navy/40 hover:text-culte-navy transition-colors"
                      >
                        SET DEFAULT
                      </button>
                    )}
                    {!card.isDefault && (
                      <button
                        onClick={() => setDeleteId(card.id)}
                        className="text-culte-navy/30 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Security note */}
            <div className="mt-6 p-5 bg-culte-light-blue flex items-start gap-3">
              <Shield className="w-5 h-5 text-culte-navy flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-culte-navy tracking-wider mb-1">PAYMENT SECURITY</p>
                <p className="text-xs text-culte-black/60 leading-relaxed">
                  All payment information is encrypted using industry-standard SSL technology. Studio Marche never stores your full card details — they are handled securely by our payment provider.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-culte-navy/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-cormorant text-xl text-culte-navy">ADD NEW CARD</h3>
              <button onClick={() => setShowAddModal(false)} className="text-culte-navy/40 hover:text-culte-navy transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {addedSuccess ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-culte-orange flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="font-cormorant text-lg text-culte-navy">CARD ADDED</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">NAME ON CARD *</label>
                  <input
                    placeholder="As it appears on your card"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">CARD NUMBER *</label>
                  <input
                    placeholder="1234 5678 9012 3456"
                    value={form.number}
                    onChange={e => setForm({ ...form, number: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">EXPIRY DATE *</label>
                    <input
                      placeholder="MM / YY"
                      value={form.expiry}
                      onChange={e => setForm({ ...form, expiry: e.target.value })}
                      className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">CVV *</label>
                    <input
                      placeholder="•••"
                      value={form.cvv}
                      onChange={e => setForm({ ...form, cvv: e.target.value })}
                      className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                      maxLength={4}
                      type="password"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 p-3 bg-culte-light-blue">
                  <Shield className="w-3.5 h-3.5 text-culte-navy flex-shrink-0" />
                  <p className="text-xs text-culte-black/60">Your card is encrypted and stored securely.</p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button fullWidth onClick={handleAddCard}>ADD CARD</Button>
                  <Button variant="ghost" onClick={() => setShowAddModal(false)}>CANCEL</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-culte-navy/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-8 max-w-sm w-full">
            <h3 className="font-cormorant text-xl text-culte-navy mb-3">REMOVE CARD?</h3>
            <p className="text-sm text-culte-black/60 mb-8">This card will be permanently removed from your account.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 text-white py-3 text-xs tracking-widest hover:bg-red-600 transition-colors"
              >
                REMOVE
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border-2 border-culte-navy/15 text-culte-navy py-3 text-xs tracking-widest hover:border-culte-navy transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};