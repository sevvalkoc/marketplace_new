import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { mockEditArticles, mockProducts } from '../data/mockData';
import { useSEO, SITE_URL } from '../lib/useSEO';

export const TheEdit = () => {
  useSEO({
    title: 'The Edit — Studio Marche | Stories from Independent Makers',
    description: 'Stories from the studios, fields, and workshops behind the brands on Studio Marche — interviews, essays, and product deep-dives.',
    path: '/the-edit',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'The Edit',
      url: `${SITE_URL}/the-edit`,
      isPartOf: { '@type': 'WebSite', name: 'Studio Marche', url: SITE_URL },
    },
  });

  const heroArticle = mockEditArticles[0];
  const remaining = mockEditArticles.slice(1);

  return (
    <div className="bg-white min-h-screen">
      {/* Page header */}
      <div className="bg-culte-navy">
        <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-24">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">STUDIO MARCHE EDITORIAL</p>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h1 className="font-cormorant text-6xl lg:text-8xl text-white leading-none">THE EDIT.</h1>
            <p className="text-white/60 leading-relaxed max-w-lg lg:text-right">
              Stories from the studios, fields, and workshops behind the things we sell.
              Interviews, essays, and product deep-dives from our editorial team.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Article */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <Link to={`/the-edit/${heroArticle.id}`} className="group block">
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden border-2 border-culte-navy/10 hover:border-culte-navy transition-colors duration-300">
            <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-culte-light-blue">
              <img
                src={heroArticle.image}
                alt={heroArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12 bg-white">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs text-culte-orange tracking-widest">{heroArticle.category}</span>
                <span className="text-xs text-culte-black/40">{heroArticle.date}</span>
                <span className="text-xs text-culte-black/40">·</span>
                <span className="text-xs text-culte-black/40">{heroArticle.readTime}</span>
              </div>
              <h2 className="font-cormorant text-4xl lg:text-5xl text-culte-navy leading-tight group-hover:text-culte-orange transition-colors">
                {heroArticle.title}
              </h2>
              <p className="mt-6 text-culte-black/70 leading-relaxed text-lg">{heroArticle.subtitle}</p>
              <div className="mt-8 flex items-center gap-2 text-xs text-culte-navy hover:text-culte-orange transition-colors tracking-widest">
                READ MORE <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Article Grid */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {remaining.map((article) => (
            <Link key={article.id} to={`/the-edit/${article.id}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-culte-light-blue mb-5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-culte-orange tracking-widest">{article.category}</span>
                <span className="text-xs text-culte-black/40">{article.readTime}</span>
              </div>
              <h3 className="font-cormorant text-2xl text-culte-navy group-hover:text-culte-orange transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-sm text-culte-black/60 mt-3 leading-relaxed line-clamp-3">{article.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Mid-editorial product section */}
      <div className="bg-culte-light-blue py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">SHOP THE STORY</p>
              <h2 className="font-cormorant text-3xl text-culte-navy">FEATURED PIECES</h2>
            </div>
            <Link to="/shop" className="text-xs text-culte-navy hover:text-culte-orange transition-colors tracking-widest flex items-center gap-2">
              SHOP ALL <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockProducts.filter(p => p.isFeatured).slice(0, 4).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-white mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs text-culte-navy/40 tracking-wider">{product.seller}</p>
                <p className="text-sm text-culte-black group-hover:text-culte-orange transition-colors mt-0.5">{product.name}</p>
                <p className="text-sm text-culte-navy">£{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-culte-navy py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-xs text-culte-orange tracking-[0.4em] mb-4">STAY INFORMED</p>
          <h2 className="font-cormorant text-4xl text-white mb-4">THE EDIT, DELIVERED.</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">New stories, new arrivals, and curated picks — straight to your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-white/10 border-2 border-white/20 text-white placeholder:text-white/30 px-5 py-4 focus:outline-none focus:border-culte-orange text-xs tracking-wider"
            />
            <button
              type="submit"
              className="bg-culte-orange text-white px-6 py-4 text-xs tracking-widest hover:bg-[#D16538] transition-colors flex-shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};