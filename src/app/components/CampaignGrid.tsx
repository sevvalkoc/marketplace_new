import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

interface Campaign {
  label: string;
  title: string;
  subtitle: string;
  image: string;
  path: string;
}

const campaigns: Campaign[] = [
  {
    label: 'SS26 COLLECTION',
    title: 'WOMEN',
    subtitle: 'Fluid silhouettes, natural fabrics, editorial ease.',
    image: 'https://images.unsplash.com/photo-1681552304194-62a7fa5269cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    path: '/category/women',
  },
  {
    label: 'NEW SEASON',
    title: 'MEN',
    subtitle: 'Considered cuts, rare materials, no compromise.',
    image: 'https://images.unsplash.com/photo-1755151608612-011278860989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    path: '/category/men',
  },
  {
    label: 'CLEAN BEAUTY',
    title: 'BEAUTY',
    subtitle: 'Botanical. Effective. Beautiful.',
    image: 'https://images.unsplash.com/photo-1774348599868-8e4bec62eafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    path: '/category/beauty',
  },
  {
    label: 'OBJECTS & HOME',
    title: 'HOME',
    subtitle: 'Objects that define your space, your way.',
    image: 'https://images.unsplash.com/photo-1762423656649-24aaf046402e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    path: '/category/home',
  },
];

const CampaignCard = ({ campaign, tall = false }: { campaign: Campaign; tall?: boolean }) => (
  <Link
    to={campaign.path}
    className={`group relative overflow-hidden bg-culte-light-blue block w-full ${tall ? 'h-full min-h-[480px]' : 'min-h-[220px]'}`}
  >
    <img
      src={campaign.image}
      alt={campaign.title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className={`absolute inset-0 ${tall ? 'bg-gradient-to-t from-culte-navy/85 via-culte-navy/30 to-transparent' : 'bg-gradient-to-t from-culte-navy/80 via-culte-navy/20 to-transparent'}`} />
    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
      <p className="text-xs text-culte-orange tracking-[0.3em] mb-1.5">{campaign.label}</p>
      <h3 className={`font-cormorant text-white mb-1.5 ${tall ? 'text-4xl lg:text-5xl' : 'text-2xl'}`}>{campaign.title}</h3>
      <p className={`text-white/60 mb-4 ${tall ? 'text-sm' : 'text-xs'} line-clamp-1`}>{campaign.subtitle}</p>
      <span className={`inline-flex items-center gap-2 text-xs border transition-colors ${
        tall
          ? 'text-white border-white/40 px-4 py-2 group-hover:bg-culte-orange group-hover:border-culte-orange'
          : 'text-white/80 border-transparent underline underline-offset-2 group-hover:text-culte-orange'
      }`}>
        SHOP NOW <ArrowRight className="w-3.5 h-3.5" />
      </span>
    </div>
  </Link>
);

export const CampaignGrid = () => {
  const [main, ...rest] = campaigns;

  return (
    <section className="py-10 lg:py-16 px-6 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">SS26 CAMPAIGNS</p>
          <h2 className="font-cormorant text-4xl lg:text-5xl text-culte-navy">Shop the Season</h2>
        </div>
        <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs text-culte-navy hover:text-culte-orange transition-colors tracking-widest">
          VIEW ALL <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Layout: Left tall + Right 3-up */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4" style={{ height: 'auto' }}>
        {/* Main tall campaign */}
        <div className="lg:w-[42%] min-h-[380px] lg:min-h-[500px]">
          <CampaignCard campaign={main} tall />
        </div>

        {/* Right side: 3 smaller campaigns */}
        <div className="lg:w-[58%] grid grid-cols-2 gap-3 lg:gap-4">
          {rest.map((campaign, i) => (
            <div
              key={i}
              className={i === rest.length - 1 ? 'col-span-2' : ''}
            >
              <CampaignCard campaign={campaign} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};