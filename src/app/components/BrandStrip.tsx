import { Link } from 'react-router';
import { mockSellers } from '../data/mockData';

export const BrandStrip = () => {
  const brands = [...mockSellers, ...mockSellers];

  return (
    <section className="border-y border-black/8 bg-white py-10 overflow-hidden">
      <style>{`
        @keyframes brand-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-track {
          animation: brand-scroll 35s linear infinite;
          display: flex;
          width: max-content;
          align-items: center;
        }
        .brand-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mb-6 px-6 max-w-[1400px] mx-auto">
        <p
          className="text-black/25 uppercase"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.35em' }}
        >
          Featured Brands
        </p>
      </div>

      <div className="brand-track">
        {brands.map((seller, i) => (
          <Link
            key={i}
            to={`/seller/${seller.slug}`}
            className="flex items-center gap-5 mx-10 group flex-shrink-0"
          >
            <div className="w-9 h-9 overflow-hidden bg-[#F4F4F2] flex-shrink-0">
              <img
                src={seller.image}
                alt={seller.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <p
              className="text-black/40 group-hover:text-black transition-colors whitespace-nowrap"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {seller.name}
            </p>
            <div className="w-px h-5 bg-black/10 ml-5" />
          </Link>
        ))}
      </div>
    </section>
  );
};
