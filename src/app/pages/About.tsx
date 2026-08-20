import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../lib/useSEO';

export const About = () => {
  useSEO({
    title: 'About Studio Marche | Independent Brands, Chosen Carefully',
    description: 'Studio Marche is a curated marketplace built on the belief that less, chosen carefully, beats more chosen carelessly. Read our story.',
    path: '/about',
  });

  const values = [
    {
      heading: 'CURATION OVER QUANTITY',
      body: 'We review every product and every brand personally. Nothing on Studio Marche is here by accident. We apply the same editorial eye to a £45 candle as to a £450 ceramic sculpture.'
    },
    {
      heading: 'INDEPENDENT BY DESIGN',
      body: 'We partner exclusively with independent brands and makers. No mass production, no shortcuts — just people who care deeply about what they make and how they make it.'
    },
    {
      heading: 'QUALITY OVER EVERYTHING',
      body: 'Considered materials. Real craft. Things built to be used, not just bought. We think good design should outlast trends — and so should the people who make it.'
    },
    {
      heading: 'TRANSPARENT & FAIR',
      body: 'We charge a straightforward 12% commission to our sellers, and we show buyers the full story of where their products come from. No surprises, no small print.'
    },
  ];

  const team = [
    { name: 'Isabelle Morel', role: 'FOUNDER & CREATIVE DIRECTOR', location: 'Paris', image: 'https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400' },
    { name: 'James Wu', role: 'CO-FOUNDER & TECH', location: 'London', image: 'https://images.unsplash.com/photo-1767175473698-859bc73e8e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400' },
    { name: 'Amina Diallo', role: 'HEAD OF CURATION', location: 'New York', image: 'https://images.unsplash.com/photo-1738441388022-958455838394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400' },
    { name: 'Leo Ferrara', role: 'BRAND PARTNERSHIPS', location: 'Milan', image: 'https://images.unsplash.com/photo-1644258676710-ffb99d7d7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-culte-navy py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-6">ABOUT STUDIO MARCHE</p>
          <h1
            className="font-cormorant text-white leading-none max-w-3xl"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
          >
            WE DON'T SELL EVERYTHING.
          </h1>
          <h1
            className="font-cormorant text-culte-orange leading-none mt-2 max-w-3xl"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
          >
            WE SELL THE RIGHT THINGS.
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl mt-10 text-lg">
            Studio Marche is a curated marketplace built on the belief that less, chosen carefully, beats more chosen carelessly.
          </p>
        </div>
      </div>

      {/* Story section */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-culte-orange tracking-[0.4em] mb-6">OUR STORY</p>
            <h2 className="font-cormorant text-4xl lg:text-5xl text-culte-navy leading-tight mb-8">
              BORN FROM FRUSTRATION WITH THE ORDINARY.
            </h2>
            <div className="space-y-4 text-culte-black/70 leading-relaxed">
              <p>
                Studio Marche started after its founders spent years looking for a platform that took independent design as seriously as the people making it. Every marketplace felt like a warehouse. Every concept store felt too small to matter.
              </p>
              <p>
                So we built something in between: the editorial eye of a concept store, with the reach of a proper marketplace. Studio Marche is where you find makers the wider market hasn't caught up to yet — and where those makers find buyers who actually understand what they're looking at.
              </p>
              <p>
                Every brand here was chosen by our curation team, not an algorithm. Every product has passed a quality review before it ever reaches you.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-culte-light-blue">
              <img
                src="https://images.unsplash.com/photo-1698915583082-ae18c41f50c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                alt="Studio Marche studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-culte-orange p-6 max-w-[160px]">
              <p className="font-cormorant text-4xl text-white">2023</p>
              <p className="text-xs text-white/70 tracking-widest mt-1">FOUNDED</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-culte-light-blue py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-6">WHAT WE STAND FOR</p>
          <h2 className="font-cormorant text-4xl lg:text-5xl text-culte-navy mb-16 max-w-2xl">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs text-culte-orange/50">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1 h-px bg-culte-orange/20" />
                </div>
                <h3 className="font-cormorant text-xl text-culte-navy mb-4">{value.heading}</h3>
                <p className="text-culte-black/70 text-sm leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-culte-navy py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
            {[
              { num: '80+', label: 'INDEPENDENT MAKERS' },
              { num: '500+', label: 'CURATED PRODUCTS' },
              { num: '12', label: 'COUNTRIES' },
              { num: '10K+', label: 'HAPPY BUYERS' }
            ].map((stat, i) => (
              <div key={i} className={`text-center py-10 px-6 ${i < 3 ? 'border-r border-white/10' : ''}`}>
                <p className="font-cormorant text-4xl text-white">{stat.num}</p>
                <p className="text-xs text-white/30 tracking-widest mt-3">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
        <p className="text-xs text-culte-orange tracking-[0.4em] mb-6">THE TEAM</p>
        <h2 className="font-cormorant text-4xl text-culte-navy mb-12">Who We Are</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i}>
              <div className="aspect-square bg-culte-light-blue mb-4 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-cormorant text-lg text-culte-navy">{member.name}</h3>
              <p className="text-xs text-culte-orange tracking-widest mt-1">{member.role}</p>
              <p className="text-xs text-culte-black/40 mt-1">{member.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-culte-navy py-20">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="font-cormorant text-4xl text-white mb-4">Ready to Look Properly?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Every piece here was chosen on purpose. Have a browse and see what we mean.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/shop"><Button size="lg">SHOP THE COLLECTION</Button></Link>
            <Link to="/seller/login"><Button variant="ghost" size="lg" className="border-white/30 text-white hover:bg-white hover:text-culte-navy">SELL ON STUDIO MARCHE</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};