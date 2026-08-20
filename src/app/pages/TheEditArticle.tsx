import { useParams, Link } from 'react-router';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { mockEditArticles, mockProducts, mockCategories } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useSEO, SITE_URL } from '../lib/useSEO';

const MONTHS: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
};

/** Normalises the article's existing "Month YYYY" display date to ISO-8601 for
 * structured data. The data model only stores month + year, so the day is not
 * fabricated data — it is fixed at 01 as the earliest reasonable point in the
 * stated month, and no dateModified is emitted since nothing tracks that. */
function toISODate(display: string): string | undefined {
  const [monthName, year] = display.trim().split(/\s+/);
  const month = MONTHS[monthName?.toLowerCase()];
  if (!month || !year) return undefined;
  return `${year}-${month}-01`;
}

export const TheEditArticle = () => {
  const { id } = useParams();
  const article = mockEditArticles.find(a => a.id === id) || mockEditArticles[0];
  const others = mockEditArticles.filter(a => a.id !== article.id).slice(0, 3);
  const featuredProducts = (article.products || [])
    .map(pid => mockProducts.find(p => p.id === pid))
    .filter(Boolean) as typeof mockProducts;
  const relatedCategory = mockCategories.find(
    c => c.name.toLowerCase() === article.category.toLowerCase()
  );
  const isoDate = toISODate(article.date);

  useSEO({
    title: `${article.title} | The Edit — Studio Marche`,
    description: article.subtitle,
    path: `/the-edit/${article.id}`,
    image: article.image,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.subtitle,
        image: [article.image],
        ...(isoDate ? { datePublished: isoDate } : {}),
        author: { '@type': 'Organization', name: 'Studio Marche Editorial Team' },
        publisher: { '@type': 'Organization', name: 'Studio Marche' },
        mainEntityOfPage: `${SITE_URL}/the-edit/${article.id}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'The Edit', item: SITE_URL + '/the-edit' },
          { '@type': 'ListItem', position: 3, name: article.title, item: `${SITE_URL}/the-edit/${article.id}` },
        ],
      },
    ],
  });

  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen">
      {/* Article Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-culte-navy">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-culte-navy/80 via-culte-navy/40 to-transparent" />

        {/* Back link */}
        <div className="absolute top-8 left-8">
          <Link
            to="/the-edit"
            className="flex items-center gap-2 text-white/70 hover:text-white font-valibuk text-xs tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> THE EDIT
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[900px] mx-auto px-6 pb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-valibuk text-xs text-culte-orange tracking-widest">{article.category}</span>
            <span className="text-white/40 text-xs flex items-center gap-1.5"><Calendar className="w-3 h-3" />{article.date}</span>
            <span className="text-white/40 text-xs flex items-center gap-1.5"><Clock className="w-3 h-3" />{article.readTime}</span>
          </div>
          <h1
            className="font-valibuk text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {article.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-[900px] mx-auto px-6 py-16">
        {/* Subtitle */}
        <p className="text-xl text-culte-black/70 leading-relaxed border-l-4 border-culte-orange pl-6 mb-12 italic">
          {article.subtitle}
        </p>

        {/* Body */}
        <div className="space-y-6 text-culte-black/80 leading-relaxed">
          {(article.body || [article.subtitle]).map((para, i) => (
            <p key={i} className={i === 0 ? 'text-lg' : ''}>
              {i === 0 && (
                <span className="font-valibuk text-culte-navy float-left text-5xl leading-none mr-3 mt-1" style={{ lineHeight: 0.9 }}>
                  {para[0]}
                </span>
              )}
              {i === 0 ? para.slice(1) : para}
            </p>
          ))}
        </div>

        {/* Pull quote */}
        <div className="my-16 py-12 px-8 bg-culte-light-blue text-center">
          <p className="font-valibuk text-2xl md:text-3xl text-culte-navy leading-tight max-w-lg mx-auto">
            "THIS IS THE CRAFT THAT STUDIO MARCHE WAS BUILT FOR."
          </p>
          <p className="text-xs text-culte-black/40 font-valibuk tracking-widest mt-6">— STUDIO MARCHE EDITORIAL TEAM</p>
        </div>

        {/* Continued body (if more than 3 paragraphs) */}
        {(article.body || []).length > 3 && (
          <div className="space-y-6 text-culte-black/80 leading-relaxed">
            {(article.body || []).slice(3).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>

      {/* Shop the Story */}
      {featuredProducts.length > 0 && (
        <div className="bg-culte-light-blue py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">FROM THIS STORY</p>
                <h2 className="font-valibuk text-3xl text-culte-navy">SHOP THE EDIT</h2>
              </div>
              <Link
                to={relatedCategory ? `/category/${relatedCategory.slug}` : '/shop'}
                className="font-valibuk text-xs text-culte-navy hover:text-culte-orange transition-colors tracking-widest flex items-center gap-2 hidden md:flex"
              >
                {relatedCategory ? `SHOP ${relatedCategory.name}` : 'SHOP ALL'} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {featuredProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="group">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-white mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {product.isNew && (
                        <div className="absolute top-4 left-4 bg-culte-orange px-3 py-1">
                          <span className="font-valibuk text-xs text-white">NEW</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="space-y-1 mb-3">
                    <Link to={`/seller/${product.sellerSlug}`}>
                      <p className="font-valibuk text-xs text-culte-navy/40 tracking-wider hover:text-culte-orange transition-colors">{product.seller}</p>
                    </Link>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm text-culte-black hover:text-culte-orange transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-culte-navy">£{product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, seller: product.seller, sellerSlug: product.sellerSlug, image: product.image })}
                    className="w-full py-2.5 border-2 border-culte-navy text-culte-navy font-valibuk text-xs hover:bg-culte-navy hover:text-white transition-colors tracking-widest"
                  >
                    ADD TO BAG
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* More from The Edit */}
      <div className="bg-culte-navy py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">CONTINUE READING</p>
              <h2 className="font-valibuk text-3xl text-white">MORE STORIES</h2>
            </div>
            <Link to="/the-edit" className="font-valibuk text-xs text-white/60 hover:text-white transition-colors tracking-widest flex items-center gap-2">
              ALL STORIES <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((other) => (
              <Link key={other.id} to={`/the-edit/${other.id}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={other.image}
                    alt={other.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-valibuk text-xs text-culte-orange tracking-widest">{other.category}</span>
                  <span className="text-xs text-white/40">{other.readTime}</span>
                </div>
                <h3 className="font-valibuk text-xl text-white group-hover:text-culte-orange transition-colors leading-tight">
                  {other.title}
                </h3>
                <p className="text-sm text-white/50 mt-2 leading-relaxed line-clamp-2">{other.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
