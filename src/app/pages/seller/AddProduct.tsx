import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload, X, Plus } from 'lucide-react';
import { Button } from '../../components/Button';

export const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', price: '', comparePrice: '', sku: '', stock: '',
    category: '', weight: '', tags: '', status: 'draft'
  });
  const [images, setImages] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (status: 'draft' | 'published') => {
    setForm(prev => ({ ...prev, status }));
    setSaved(true);
    setTimeout(() => {
      navigate('/seller/products');
    }, 1200);
  };

  const mockImages = [
    'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop',
  ];

  const addMockImage = () => {
    const img = mockImages[images.length % mockImages.length];
    if (!images.includes(img)) setImages(prev => [...prev, img]);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">PRODUCTS</p>
          <h1 className="font-cormorant text-4xl text-culte-navy">ADD PRODUCT</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => handleSubmit('draft')}>SAVE DRAFT</Button>
          <Button size="sm" onClick={() => handleSubmit('published')}>
            {saved ? '✓ PUBLISHED' : 'PUBLISH PRODUCT'}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Info */}
          <div className="border-2 border-culte-navy/10 p-6 space-y-5">
            <h2 className="text-xs text-culte-navy tracking-widest border-b border-culte-navy/10 pb-4">PRODUCT DETAILS</h2>

            <div>
              <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">PRODUCT NAME *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Minimalist Ceramic Vase"
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">DESCRIPTION *</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your product — materials, process, dimensions, care instructions..."
                rows={5}
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm resize-none"
              />
              <p className="text-xs text-culte-black/30 mt-1">{form.description.length} / 1000 characters</p>
            </div>

            <div>
              <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">TAGS</label>
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm({ ...form, tags: e.target.value })}
                placeholder="e.g. ceramic, handmade, home decor (comma separated)"
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
              />
            </div>
          </div>

          {/* Media */}
          <div className="border-2 border-culte-navy/10 p-6 space-y-4">
            <h2 className="text-xs text-culte-navy tracking-widest border-b border-culte-navy/10 pb-4">MEDIA</h2>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); addMockImage(); }}
              onClick={addMockImage}
              className={`border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center py-12 ${
                dragOver ? 'border-culte-orange bg-culte-orange/5' : 'border-culte-navy/20 hover:border-culte-navy'
              }`}
            >
              <Upload className="w-8 h-8 text-culte-navy/30 mb-3" />
              <p className="text-sm text-culte-navy/60">DROP IMAGES HERE OR CLICK TO UPLOAD</p>
              <p className="text-xs text-culte-navy/30 mt-1">JPG, PNG, WEBP up to 10MB each</p>
            </div>

            {/* Image previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <div className="absolute top-1 left-1 bg-culte-orange px-2 py-0.5">
                        <span className="text-xs text-white">MAIN</span>
                      </div>
                    )}
                    <button
                      onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 bg-white flex items-center justify-center hover:bg-culte-orange hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addMockImage}
                  className="aspect-square border-2 border-dashed border-culte-navy/20 hover:border-culte-navy flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-culte-navy/30" />
                </button>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="border-2 border-culte-navy/10 p-6 space-y-4">
            <h2 className="text-xs text-culte-navy tracking-widest border-b border-culte-navy/10 pb-4">PRICING</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">PRICE (£) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-culte-navy/40 text-sm">£</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full border-2 border-culte-navy/15 pl-8 pr-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">COMPARE AT PRICE (£)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-culte-navy/40 text-sm">£</span>
                  <input
                    type="number"
                    value={form.comparePrice}
                    onChange={e => setForm({ ...form, comparePrice: e.target.value })}
                    placeholder="0.00"
                    className="w-full border-2 border-culte-navy/15 pl-8 pr-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                  />
                </div>
              </div>
            </div>
            {form.price && (
              <div className="p-4 bg-culte-light-blue text-xs text-culte-navy space-y-1">
                <p>Selling price: <strong>£${form.price}</strong></p>
                <p>Studio Marche commission (12%): <strong>£${(parseFloat(form.price) * 0.12).toFixed(2)}</strong></p>
                <p className="text-culte-orange">Your payout: <strong>£${(parseFloat(form.price) * 0.88).toFixed(2)}</strong></p>
              </div>
            )}
          </div>

          {/* Inventory */}
          <div className="border-2 border-culte-navy/10 p-6 space-y-4">
            <h2 className="text-xs text-culte-navy tracking-widest border-b border-culte-navy/10 pb-4">INVENTORY</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">SKU</label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={e => setForm({ ...form, sku: e.target.value })}
                  placeholder="e.g. HOME-001"
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">QUANTITY *</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                  placeholder="0"
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status */}
          <div className="border-2 border-culte-navy/10 p-6 space-y-4">
            <h2 className="text-xs text-culte-navy tracking-widest border-b border-culte-navy/10 pb-4">STATUS</h2>
            {['draft', 'published'].map(s => (
              <label key={s} className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, status: s })}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
                    form.status === s ? 'border-culte-orange' : 'border-culte-navy/30'
                  }`}
                >
                  {form.status === s && <div className="w-2.5 h-2.5 bg-culte-orange rounded-full" />}
                </div>
                <div>
                  <p className="text-xs text-culte-navy capitalize">{s}</p>
                  <p className="text-xs text-culte-black/40">{s === 'draft' ? 'Not visible to buyers' : 'Visible on Studio Marche'}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Category */}
          <div className="border-2 border-culte-navy/10 p-6 space-y-4">
            <h2 className="text-xs text-culte-navy tracking-widest border-b border-culte-navy/10 pb-4">CATEGORY</h2>
            <div>
              <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">CATEGORY *</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm bg-white"
              >
                <option value="">Select category</option>
                {['Women', 'Men', 'Home', 'Beauty', 'Objects', 'Kids'].map(c => (
                  <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Shipping */}
          <div className="border-2 border-culte-navy/10 p-6 space-y-4">
            <h2 className="text-xs text-culte-navy tracking-widest border-b border-culte-navy/10 pb-4">SHIPPING</h2>
            <div>
              <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">WEIGHT (grams)</label>
              <input
                type="number"
                value={form.weight}
                onChange={e => setForm({ ...form, weight: e.target.value })}
                placeholder="0"
                className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Button fullWidth onClick={() => handleSubmit('published')}>
              {saved ? '✓ PUBLISHED' : 'PUBLISH PRODUCT'}
            </Button>
            <Button variant="ghost" fullWidth onClick={() => handleSubmit('draft')}>SAVE AS DRAFT</Button>
          </div>
        </div>
      </div>
    </div>
  );
};