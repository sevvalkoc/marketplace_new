import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, MessageCircle, Truck, RotateCcw, CreditCard, Package } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../lib/useSEO';

const faqs = [
  { q: 'How do I track my order?', a: 'Once your order is dispatched, you\'ll receive a tracking number by email. You can also track all orders from your account dashboard under "My Orders".' },
  { q: 'What is your returns policy?', a: 'We offer free 30-day returns on all unworn, undamaged items in their original packaging. Simply start a return from your account or get in touch with our support team.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 working days. Express delivery (2–3 working days) is available at checkout. Free standard delivery on all orders over £150.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be changed or cancelled within 2 hours of placing them. After that, you\'ll need to wait for delivery and start a return.' },
  { q: 'Are products authentic?', a: 'Every brand on Studio Marche is personally reviewed by our curation team. We only work with genuine independent makers and brands.' },
  { q: 'How do I become a seller?', a: 'You can apply through our seller portal. Our curation team reviews every application within 5 working days, looking for quality, originality, and craft.' },
];

const topics = [
  { icon: Truck, label: 'Delivery', desc: 'Track orders, delivery times, and delivery costs.' },
  { icon: RotateCcw, label: 'Returns', desc: '30-day free returns on eligible items.' },
  { icon: CreditCard, label: 'Payments', desc: 'Payment methods, charges, and billing.' },
  { icon: Package, label: 'Orders', desc: 'Order status, changes, and cancellations.' },
];

export const Support = () => {
  useSEO({
    title: 'Help Centre | Studio Marche',
    description: 'Track orders, manage returns, and get answers to common questions about shopping and selling on Studio Marche.',
    path: '/support',
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-culte-navy py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">HELP CENTRE</p>
          <h1 className="font-cormorant text-5xl lg:text-6xl text-white mb-4">HOW CAN WE HELP?</h1>
          <p className="text-white/60 max-w-md mx-auto">
            Search our help centre, browse common topics, or reach out to our support team.
          </p>
        </div>
      </div>

      {/* Topic grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div key={topic.label} className="border-2 border-culte-navy/10 p-6 hover:border-culte-orange transition-colors cursor-pointer group text-center">
                <div className="w-10 h-10 bg-culte-light-blue flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-culte-navy group-hover:text-culte-orange transition-colors" />
                </div>
                <h3 className="text-sm text-culte-navy group-hover:text-culte-orange transition-colors mb-1">{topic.label}</h3>
                <p className="text-xs text-culte-black/50">{topic.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* FAQs */}
          <div>
            <p className="text-xs text-culte-orange tracking-[0.3em] mb-4">COMMON QUESTIONS</p>
            <h2 className="font-cormorant text-3xl text-culte-navy mb-8">FAQ</h2>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-culte-navy/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm text-culte-black font-medium">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-culte-navy/40 flex-shrink-0 mt-0.5 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="pb-5 text-sm text-culte-black/70 leading-relaxed">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <p className="text-xs text-culte-orange tracking-[0.3em] mb-4">GET IN TOUCH</p>
            <h2 className="font-cormorant text-3xl text-culte-navy mb-8">CONTACT US</h2>

            {sent ? (
              <div className="bg-culte-light-blue p-8 text-center">
                <div className="w-12 h-12 bg-culte-orange flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <p className="font-cormorant text-xl text-culte-navy mb-2">MESSAGE SENT</p>
                <p className="text-culte-black/60 text-sm">We typically respond within 24 hours on working days.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest">
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">NAME</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">EMAIL</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">SUBJECT</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option>Order Issue</option>
                    <option>Return or Exchange</option>
                    <option>Shipping Question</option>
                    <option>Product Query</option>
                    <option>Seller Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-culte-navy/50 tracking-widest mb-2">MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's happening..."
                    rows={5}
                    className="w-full border-2 border-culte-navy/15 px-4 py-3 focus:outline-none focus:border-culte-navy text-sm resize-none"
                  />
                </div>
                <Button type="submit" size="lg" fullWidth>SEND MESSAGE</Button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-culte-navy/10">
              <p className="text-xs text-culte-navy/40 tracking-widest mb-3">SELLER SUPPORT</p>
              <p className="text-sm text-culte-black/60 mb-3">Have a seller-specific question?</p>
              <Link to="/seller/support" className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest border-b border-culte-orange pb-0.5">
                VISIT SELLER SUPPORT →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};