import { Link } from 'react-router';

const panels = [
  {
    id: 1,
    eyebrow: 'The Studio',
    headline: 'Every Brand\nHas a Story.',
    subline: 'We work with makers who care how something is made, not just that it sells.',
    cta: { label: 'Explore the Studio', path: '/shop' },
    image: 'https://images.unsplash.com/photo-1692116716561-953cc9a868b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    imagePosition: 'center top',
  },
  {
    id: 2,
    eyebrow: 'New This Week',
    headline: 'Chosen,\nNot Just Sourced.',
    subline: 'Each new arrival is reviewed by hand before it earns a place here.',
    cta: { label: 'See What\'s New', path: '/new-arrivals' },
    image: 'https://images.unsplash.com/photo-1664076458686-3449062080ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    imagePosition: 'center center',
  },
];

export const HeroSlider = () => {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {panels.map((panel) => (
          <div key={panel.id} className="flex flex-col">
            {/* Image */}
            <div
              className="w-full overflow-hidden bg-culte-light-blue"
              style={{ height: 'clamp(220px, 40vh, 440px)' }}
            >
              <img
                src={panel.image}
                alt={panel.eyebrow}
                className="w-full h-full object-cover"
                style={{ objectPosition: panel.imagePosition }}
              />
            </div>

            {/* Text */}
            <div className="bg-white px-8 md:px-10 lg:px-14 pt-7 pb-8">
              <p
                className="text-black/35 mb-4 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.63rem', letterSpacing: '0.35em' }}
              >
                {panel.eyebrow}
              </p>

              <h2
                className="font-cormorant text-culte-navy mb-4"
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)',
                  fontWeight: 300,
                  whiteSpace: 'pre-line',
                  lineHeight: 1.1,
                }}
              >
                {panel.headline}
              </h2>

              <p
                className="text-black/45 mb-6 max-w-xs"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', lineHeight: '1.65', fontWeight: 300 }}
              >
                {panel.subline}
              </p>

              <Link
                to={panel.cta.path}
                className="inline-flex items-center text-culte-navy border-b border-culte-navy pb-0.5 hover:text-culte-orange hover:border-culte-orange transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                {panel.cta.label}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
