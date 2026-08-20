import { Link } from 'react-router';
import { ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';

interface ComingSoonProps {
  /** Short eyebrow label, e.g. "OBJECTS" or "KIDS" */
  eyebrow?: string;
  /** Main heading — keep it short and confident */
  title: string;
  /** One or two sentences. Should feel intentional, not apologetic. */
  description: string;
  /** Which soft CTA to show alongside the waitlist form */
  secondaryAction?: {
    label: string;
    path: string;
  };
  /** Visual size — 'section' for a full category page, 'inline' for smaller slots */
  size?: 'section' | 'inline';
}

/**
 * A premium "coming soon" state for marketplace sections that don't yet have
 * live products — new categories, brands mid-onboarding, or a Shopify feed
 * that returned nothing. Designed to feel like part of a considered launch,
 * never like a broken page.
 */
export const ComingSoon = ({
  eyebrow,
  title,
  description,
  secondaryAction,
  size = 'section',
}: ComingSoonProps) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
      setEmail('');
    }
  };

  const isInline = size === 'inline';

  return (
    <div
      className={`flex flex-col items-center justify-center text-center bg-culte-light-blue ${
        isInline ? 'py-14 px-6' : 'py-24 px-6'
      }`}
    >
      {eyebrow && (
        <p
          className="text-culte-navy/35 mb-4 uppercase"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em' }}
        >
          {eyebrow}
        </p>
      )}

      <h3
        className="font-cormorant text-culte-navy mb-4"
        style={{
          fontSize: isInline ? 'clamp(1.6rem, 3vw, 2.2rem)' : 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h3>

      <p
        className="text-culte-black/55 max-w-md mb-8"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', lineHeight: '1.7', fontWeight: 300 }}
      >
        {description}
      </p>

      {/* Waitlist form */}
      {joined ? (
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 bg-culte-orange" />
          <p
            className="text-culte-navy"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.05em' }}
          >
            You're on the list — we'll let you know.
          </p>
        </div>
      ) : (
        <form onSubmit={handleJoin} className="flex w-full max-w-sm mb-4">
          <div className="relative flex-1">
            <Mail className="w-3.5 h-3.5 text-culte-navy/30 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-white border border-culte-navy/15 text-culte-navy placeholder:text-culte-navy/30 pl-10 pr-4 py-3 focus:outline-none focus:border-culte-navy transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}
            />
          </div>
          <button
            type="submit"
            className="bg-culte-navy text-white px-5 py-3 flex-shrink-0 flex items-center gap-2 hover:bg-black transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}
          >
            Notify Me
          </button>
        </form>
      )}

      {secondaryAction && (
        <Link
          to={secondaryAction.path}
          className="group inline-flex items-center gap-2 text-culte-navy/50 hover:text-culte-navy transition-colors mt-1"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
        >
          {secondaryAction.label}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      )}
    </div>
  );
};
