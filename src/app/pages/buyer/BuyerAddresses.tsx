import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { User, Package, MapPin, CreditCard, Settings, ChevronRight, Heart, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { Button } from '../../components/Button';

const navItems = [
  { label: 'OVERVIEW', path: '/buyer/account', icon: User },
  { label: 'MY ORDERS', path: '/buyer/orders', icon: Package },
  { label: 'WISHLIST', path: '/wishlist', icon: Heart },
  { label: 'ADDRESSES', path: '/buyer/addresses', icon: MapPin },
  { label: 'PAYMENT', path: '/buyer/payment', icon: CreditCard },
  { label: 'SETTINGS', path: '/buyer/settings', icon: Settings },
];

interface Address {
  id: number;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: 1,
    label: 'Home',
    name: 'Sarah Mitchell',
    line1: '42 Belmont Gardens',
    line2: 'Flat 4B',
    city: 'London',
    postcode: 'NW3 5RT',
    country: 'United Kingdom',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    name: 'Sarah Mitchell',
    line1: '12 Finsbury Square',
    city: 'London',
    postcode: 'EC2A 4BX',
    country: 'United Kingdom',
    isDefault: false,
  },
];

const emptyForm = { label: '', name: '', line1: '', line2: '', city: '', postcode: '', country: 'United Kingdom' };

export const BuyerAddresses = () => {
  const location = useLocation();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (addr: Address) => {
    setEditId(addr.id);
    setForm({
      label: addr.label, name: addr.name, line1: addr.line1, line2: addr.line2 || '',
      city: addr.city, postcode: addr.postcode, country: addr.country
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.line1 || !form.city || !form.postcode) return;
    if (editId !== null) {
      setAddresses(prev => prev.map(a => a.id === editId ? { ...a, ...form } : a));
    } else {
      const newAddr: Address = { id: Date.now(), ...form, isDefault: addresses.length === 0 };
      setAddresses(prev => [...prev, newAddr]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setAddresses(prev => {
      const remaining = prev.filter(a => a.id !== id);
      // If deleted was default, make first remaining address default
      if (remaining.length > 0 && !remaining.find(a => a.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
    setDeleteId(null);
  };

  const setDefault = (id: number) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">PORTAL</p>
          <h1 className="font-cormorant text-5xl text-culte-navy">MY ADDRESSES</h1>
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
                <h2 className="font-cormorant text-xl text-culte-navy">SAVED ADDRESSES</h2>
                <p className="text-sm text-culte-black/50 mt-1">{addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved</p>
              </div>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 bg-culte-navy text-white px-5 py-3 text-xs tracking-widest hover:bg-culte-orange transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> ADD ADDRESS
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-20 border-2 border-culte-navy/10">
                <MapPin className="w-12 h-12 text-culte-navy/20 mx-auto mb-4" />
                <p className="font-cormorant text-xl text-culte-navy mb-2">NO ADDRESSES YET</p>
                <p className="text-culte-black/50 mb-6 text-sm">Add a delivery address to make checkout faster.</p>
                <button onClick={openAdd} className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5">
                  ADD YOUR FIRST ADDRESS →
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {addresses.map((addr) => (
                  <div key={addr.id} className={`border-2 p-6 transition-colors ${addr.isDefault ? 'border-culte-navy' : 'border-culte-navy/10 hover:border-culte-navy/20'}`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-culte-navy tracking-widest border border-culte-navy/20 px-2 py-0.5">{addr.label.toUpperCase()}</span>
                        {addr.isDefault && (
                          <span className="text-xs text-white bg-culte-orange px-2 py-0.5 flex items-center gap-1">
                            <Check className="w-3 h-3" /> DEFAULT
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Address details */}
                    <div className="space-y-1 mb-5">
                      <p className="text-sm text-culte-black">{addr.name}</p>
                      <p className="text-sm text-culte-black/70">{addr.line1}</p>
                      {addr.line2 && <p className="text-sm text-culte-black/70">{addr.line2}</p>}
                      <p className="text-sm text-culte-black/70">{addr.city} {addr.postcode}</p>
                      <p className="text-sm text-culte-black/70">{addr.country}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-culte-navy/10">
                      <button
                        onClick={() => openEdit(addr)}
                        className="flex items-center gap-1.5 text-xs text-culte-navy hover:text-culte-orange transition-colors"
                      >
                        <Edit2 className="w-3 h-3" /> EDIT
                      </button>
                      {!addr.isDefault && (
                        <>
                          <span className="text-culte-navy/20">|</span>
                          <button
                            onClick={() => setDefault(addr.id)}
                            className="text-xs text-culte-navy/50 hover:text-culte-navy transition-colors"
                          >
                            SET AS DEFAULT
                          </button>
                          <span className="text-culte-navy/20">|</span>
                          <button
                            onClick={() => setDeleteId(addr.id)}
                            className="flex items-center gap-1.5 text-xs text-culte-navy/40 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" /> REMOVE
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add new card */}
                <button
                  onClick={openAdd}
                  className="border-2 border-dashed border-culte-navy/20 p-6 flex flex-col items-center justify-center gap-3 hover:border-culte-orange hover:bg-culte-orange/5 transition-all group min-h-[180px]"
                >
                  <div className="w-10 h-10 border-2 border-culte-navy/20 group-hover:border-culte-orange flex items-center justify-center transition-colors">
                    <Plus className="w-5 h-5 text-culte-navy/40 group-hover:text-culte-orange transition-colors" />
                  </div>
                  <p className="text-xs text-culte-navy/40 group-hover:text-culte-orange transition-colors tracking-widest">ADD NEW ADDRESS</p>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-culte-navy/60 z-50 flex items-center justify-center px-4 py-8">
          <div className="bg-white p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-cormorant text-xl text-culte-navy">{editId ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}</h3>
              <button onClick={() => setShowModal(false)} className="text-culte-navy/40 hover:text-culte-navy transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">LABEL</label>
                  <input
                    placeholder="e.g. Home, Office"
                    value={form.label}
                    onChange={e => setForm({ ...form, label: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">FULL NAME *</label>
                  <input
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">ADDRESS LINE 1 *</label>
                <input
                  placeholder="Street address"
                  value={form.line1}
                  onChange={e => setForm({ ...form, line1: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">ADDRESS LINE 2 (OPTIONAL)</label>
                <input
                  placeholder="Apt, suite, floor, etc."
                  value={form.line2}
                  onChange={e => setForm({ ...form, line2: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">CITY *</label>
                  <input
                    placeholder="City"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">POSTCODE *</label>
                  <input
                    placeholder="Postcode"
                    value={form.postcode}
                    onChange={e => setForm({ ...form, postcode: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">COUNTRY *</label>
                <select
                  value={form.country}
                  onChange={e => setForm({ ...form, country: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm bg-white"
                >
                  {['United Kingdom', 'United States', 'France', 'Germany', 'Australia', 'Canada', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Denmark', 'Norway', 'Ireland'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button fullWidth onClick={handleSave}>
                {editId ? 'SAVE CHANGES' : 'ADD ADDRESS'}
              </Button>
              <Button variant="ghost" onClick={() => setShowModal(false)}>CANCEL</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-culte-navy/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-8 max-w-sm w-full">
            <h3 className="font-cormorant text-xl text-culte-navy mb-3">REMOVE ADDRESS?</h3>
            <p className="text-sm text-culte-black/60 mb-8">This address will be permanently removed from your account.</p>
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