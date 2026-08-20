import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const brands = [
  {
    id: 1,
    label: 'New to Studio Marche',
    name: 'Atelier\nMaison.',
    tagline: 'Parisian elegance refined for the modern wardrobe. Small-batch, handcrafted, never rushed.',
    origin: 'Paris, France',
    pieces: '24 pieces',
    cta: { label: 'Discover the Brand', path: '/shop' },
    image: 'https://images.unsplash.com/photo-1637348318881-03b4c930a723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
  {
    id: 2,
    label: 'Now Available',
    name: 'Studio\nFormé.',
    tagline: 'Objects for living. Ceramics, textiles, and tools that belong in considered interiors.',
    origin: 'Copenhagen, Denmark',
    pieces: '18 pieces',
    cta: { label: 'See the Collection', path: '/category/home' },
    image: 'https://images.unsplash.com/photo-1545042707-e54ee93c94f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
  {
    id: 3,
    label: 'Just Joined',
    name: 'Lune\nCollective.',
    tagline: 'A collective of independent artisans united by a philosophy of slow, intentional production.',
    origin: 'Milan, Italy',
    pieces: '31 pieces',
    cta: { label: 'Explore the Edit', path: '/shop' },
    image: 'https://images.unsplash.com/photo-1766934587214-86e21b3ae093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
];

export const NewBrandsSlider = () => {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (transitioning || index === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTransitioning(false);
    }, 350);
  }, [active, transitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % brands.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [active, goTo]);

  const brand = brands[active];

  return (
    <section className="py-0 border-y border-black/8 overflow-hidden">
      <style>{`
        @keyframes brand-fade {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .brand-enter {
          animation: brand-fade 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-8 flex items-end justify-between">
        <div>
          <p
            className="text-black/35 mb-2 uppercase"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.35em' }}
          >
            New Brands
          </p>
          <h2
            className="font-cormorant text-black"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 300 }}
          >
            Just Arrived
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => goTo((active - 1 + brands.length) % brands.length)}
            className="w-10 h-10 border border-black/15 flex items-center justify-center hover:border-black transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4 text-black" />
          </button>
          <button
            onClick={() => goTo((active + 1) % brands.length)}
            className="w-10 h-10 border border-black/15 flex items-center justify-center hover:border-black transition-colors"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>

      {/* Slide */}
      <div className="grid lg:grid-cols-[55%_45%]" style={{ minHeight: '540px' }}>
        {/* Image */}
        <div className="relative overflow-hidden bg-[#F4F4F2] min-h-[50vw] lg:min-h-0">
          <img
            key={`brand-img-${brand.id}`}
            src={brand.image}
            alt={brand.name}
            className="w-full h-full object-cover absolute inset-0"
            style={{
              transition: 'opacity 0.5s ease',
              opacity: transitioning ? 0 : 1,
              objectPosition: 'center center',
            }}
          />
        </div>

        {/* Text */}
        <div
          key={`brand-text-${brand.id}`}
          className={`flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 bg-white ${!transitioning ? 'brand-enter' : 'opacity-0'}`}
        >
          <p
            className="text-black/35 mb-6 uppercase"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.35em' }}
          >
            {brand.label}
          </p>
          <h3
            className="font-cormorant text-black mb-6"
            style={{
              fontSize: 'clamp(3rem, 5vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: '0.95',
              letterSpacing: '-0.02em',
              whiteSpace: 'pre-line',
            }}
          >
            {brand.name}
          </h3>
          <p
            className="text-black/50 mb-8 max-w-sm"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', lineHeight: '1.7', fontWeight: 300 }}
          >
            {brand.tagline}
          </p>

          <div className="flex items-center gap-6 mb-10">
            <div>
              <p
                className="text-black/25 mb-1 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em' }}
              >
                Origin
              </p>
              <p
                className="text-black"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}
              >
                {brand.origin}
              </p>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div>
              <p
                className="text-black/25 mb-1 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em' }}
              >
                Available
              </p>
              <p
                className="text-black"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}
              >
                {brand.pieces}
              </p>
            </div>
          </div>

          <Link
            to={brand.cta.path}
            className="group inline-flex items-center gap-3 text-black border-b border-black pb-0.5 hover:border-black/30 transition-colors self-start"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            {brand.cta.label}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-12">
            {brands.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 ${
                  i === active ? 'w-8 h-px bg-black' : 'w-3 h-px bg-black/20 hover:bg-black/40'
                }`}
                aria-label={`Brand ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
