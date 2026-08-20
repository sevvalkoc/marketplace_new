import { useState } from 'react';
import { HelpCircle, Book, MessageCircle, ChevronDown, ArrowUpRight, DollarSign, Package, ShoppingCart, BarChart3, Check } from 'lucide-react';
import { Button } from '../../components/Button';

const sellerFaqs = [
  {
    category: 'PAYOUTS',
    items: [
      { q: 'When are payouts processed?', a: 'Payouts are processed on the 1st of each month for all completed orders from the previous month. Funds typically arrive in your bank account within 2–3 working days.' },
      { q: 'What is Studio Marche\'s commission rate?', a: 'Studio Marche charges a 12% commission on each sale. This covers payment processing, platform fees, and access to our curated buyer community. You keep 88% of every sale.' },
      { q: 'What payment methods do I need to support?', a: 'Studio Marche handles all payment processing. Buyers can pay by Visa, Mastercard, Amex, and PayPal. You don\'t need to manage payments directly — we handle all of this and pay you monthly.' },
    ]
  },
  {
    category: 'PRODUCTS',
    items: [
      { q: 'How do I list a new product?', a: 'Go to Products → Add Product in your seller dashboard. Fill in the product details, upload images, set your price, and either save as a draft or publish directly. All new listings are reviewed by our curation team within 24 hours.' },
      { q: 'Can I sell products that are currently out of stock?', a: 'We recommend only publishing products you can fulfil. You can set stock levels on each product and manage inventory from the Inventory page. Products that reach zero stock are automatically hidden from buyers.' },
      { q: 'My product was removed — why?', a: 'Products may be removed if they no longer meet our curation standards, if stock has been at zero for more than 30 days, or if we receive consistent quality complaints. You\'ll receive an email explaining the reason and what steps to take.' },
    ]
  },
  {
    category: 'ORDERS',
    items: [
      { q: 'How do I fulfil an order?', a: 'When you receive an order, ship it to the address provided, update the order status to Shipped in your dashboard, and add a tracking number. Buyers are automatically notified at each stage.' },
      { q: 'What happens if I can\'t fulfil an order?', a: 'Contact us immediately via this support form. We\'ll work with you to either extend the fulfilment window or cancel the order with a full refund to the buyer. Uncommunicated non-fulfilment may result in account suspension.' },
      { q: 'A buyer wants to return an item — what do I do?', a: 'Studio Marche manages returns centrally. When a buyer initiates a return, you\'ll receive a notification. Once we receive the item and verify its condition, we process the refund and adjust your next payout accordingly.' },
    ]
  },
  {
    category: 'ACCOUNT',
    items: [
      { q: 'Can I have multiple stores on Studio Marche?', a: 'Currently, each seller account is limited to one store. If you have multiple distinct brands you\'d like to sell, please contact us to discuss a multi-brand arrangement.' },
      { q: 'How do I update my store information?', a: 'Go to Settings in your seller dashboard to update your store name, description, location, contact information, and payout details.' },
    ]
  },
];

const quickLinks = [
  { icon: DollarSign, label: 'PAYOUTS', desc: 'Payment schedule, commission, and statements.', path: '/seller/payouts' },
  { icon: Package, label: 'PRODUCTS', desc: 'Adding, editing, and managing your catalogue.', path: '/seller/products' },
  { icon: ShoppingCart, label: 'ORDERS', desc: 'Order fulfilment, shipping, and returns.', path: '/seller/orders' },
  { icon: BarChart3, label: 'ANALYTICS', desc: 'Sales data, inventory tracking, and insights.', path: '/seller/inventory' },
];

export const SellerSupport = () => {
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ subject: '', category: '', message: '' });
  const [sent, setSent] = useState(false);

  const toggleFaq = (key: string) => {
    setOpenFaqs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">HELP & SUPPORT</p>
          <h1 className="font-valibuk text-4xl text-culte-navy">SELLER SUPPORT</h1>
          <p className="text-culte-black/50 text-sm mt-1">Get help with your Studio Marche seller account.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2.5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
          <span className="font-valibuk text-xs text-green-700 tracking-widest">SUPPORT AVAILABLE MON–FRI</span>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.path}
              className="border-2 border-culte-navy/10 p-5 hover:border-culte-orange hover:bg-culte-orange/5 transition-all group"
            >
              <div className="w-10 h-10 bg-culte-light-blue flex items-center justify-center mb-4 group-hover:bg-culte-orange transition-colors">
                <Icon className="w-4 h-4 text-culte-navy group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-valibuk text-sm text-culte-navy group-hover:text-culte-orange transition-colors mb-1">{link.label}</h3>
              <p className="text-xs text-culte-black/50">{link.desc}</p>
            </a>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* FAQ section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">KNOWLEDGE BASE</p>
              <h2 className="font-valibuk text-2xl text-culte-navy">FREQUENTLY ASKED</h2>
            </div>
          </div>

          <div className="space-y-6">
            {sellerFaqs.map((section) => (
              <div key={section.category}>
                <p className="font-valibuk text-xs text-culte-navy/40 tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-culte-navy/20 block" />
                  {section.category}
                </p>
                <div className="space-y-0 border-2 border-culte-navy/10">
                  {section.items.map((faq, i) => {
                    const key = `${section.category}-${i}`;
                    const isOpen = openFaqs[key];
                    return (
                      <div key={key} className={`${i < section.items.length - 1 ? 'border-b border-culte-navy/5' : ''}`}>
                        <button
                          onClick={() => toggleFaq(key)}
                          className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-culte-light-blue/30 transition-colors"
                        >
                          <span className="text-sm text-culte-black font-medium leading-snug">{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-culte-navy/40 flex-shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-sm text-culte-black/70 leading-relaxed border-t border-culte-navy/5">
                            <p className="pt-3">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div>
          <div className="mb-8">
            <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">GET IN TOUCH</p>
            <h2 className="font-valibuk text-2xl text-culte-navy">CONTACT SELLER SUPPORT</h2>
          </div>

          {sent ? (
            <div className="border-2 border-culte-navy/10 p-12 text-center">
              <div className="w-14 h-14 bg-culte-orange flex items-center justify-center mx-auto mb-6">
                <Check className="w-7 h-7 text-white" />
              </div>
              <p className="font-valibuk text-xl text-culte-navy mb-2">MESSAGE SENT</p>
              <p className="text-culte-black/60 text-sm mb-6">Our seller support team typically responds within 4 business hours.</p>
              <button
                onClick={() => { setSent(false); setForm({ subject: '', category: '', message: '' }); }}
                className="font-valibuk text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-5 border-2 border-culte-navy/10 p-8">
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">TOPIC *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm bg-white"
                  required
                >
                  <option value="">Select a topic</option>
                  <option>Payouts & Payments</option>
                  <option>Product Listing</option>
                  <option>Order Fulfilment</option>
                  <option>Returns & Refunds</option>
                  <option>Account Settings</option>
                  <option>Technical Issue</option>
                  <option>Partnership & Press</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">SUBJECT *</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                  required
                />
              </div>
              <div>
                <label className="block font-valibuk text-xs text-culte-navy/50 tracking-widest mb-2">MESSAGE *</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Please provide as much detail as possible, including any relevant order IDs or product SKUs."
                  rows={6}
                  className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm resize-none"
                  required
                />
                <p className="text-xs text-culte-black/30 mt-1">{form.message.length} characters</p>
              </div>
              <Button type="submit" size="lg" fullWidth>SEND MESSAGE</Button>
            </form>
          )}

          {/* Additional resources */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 p-4 border border-culte-navy/10 hover:border-culte-orange transition-colors group cursor-pointer">
              <Book className="w-4 h-4 text-culte-navy group-hover:text-culte-orange transition-colors flex-shrink-0" />
              <div className="flex-1">
                <p className="font-valibuk text-xs text-culte-navy group-hover:text-culte-orange transition-colors">SELLER HANDBOOK</p>
                <p className="text-xs text-culte-black/40">Everything you need to know about selling on Studio Marche</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-culte-navy/20 group-hover:text-culte-orange transition-colors" />
            </div>
            <div className="flex items-center gap-3 p-4 border border-culte-navy/10 hover:border-culte-orange transition-colors group cursor-pointer">
              <MessageCircle className="w-4 h-4 text-culte-navy group-hover:text-culte-orange transition-colors flex-shrink-0" />
              <div className="flex-1">
                <p className="font-valibuk text-xs text-culte-navy group-hover:text-culte-orange transition-colors">LIVE CHAT</p>
                <p className="text-xs text-culte-black/40">Available Monday–Friday, 9am–6pm GMT.</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-culte-navy/20 group-hover:text-culte-orange transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
