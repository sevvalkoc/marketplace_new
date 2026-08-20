import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { TrustBar } from '../components/TrustBar';
import { BrandStrip } from '../components/BrandStrip';
import { HeroSlider } from '../components/HeroSlider';
import { NewBrandsSlider } from '../components/NewBrandsSlider';
import { mockProducts, mockSellers, mockEditArticles } from '../data/mockData';
import { useSEO } from '../lib/useSEO';

export const Home = () => {
  useSEO({
    title: 'Studio Marche | A Curated Marketplace for Independent Brands',
    description: 'Discover thoughtfully made products from independent brands and emerging designers. Every piece on Studio Marche is chosen by hand, never by algorithm.',
    path: '/',
  });

  const thisWeek = mockProducts.filter(p => p.isFeatured).slice(0, 4);
  const editArticles = mockEditArticles.slice(0, 3);

  const brandNames = [
    'Studio Clay', 'Essential Threads', 'Craft & Co.',
    'Pure Botanics', 'Atelier Rose', 'Northern Knit',
    'Heritage Textiles', 'Light & Form',
  ];

  return (
    <div className="bg-white">
      <h1 className="sr-only">Studio Marche — A Curated Marketplace for Independent Brands</h1>

      {/* ─── 1. HERO SLIDER ─── */}
      <HeroSlider />

      {/* ─── 2. TRUST STRIP ─── */}
      <TrustBar />

      {/* ─── 3. MARQUEE — brand names ─── */}
      <MarqueeStrip
        items={brandNames}
        bgColor="bg-[#F4F4F2]"
        textColor="text-black/40"
        separator="—"
      />

      {/* ─── 4. NEW BRANDS SLIDER ─── */}
      <NewBrandsSlider />

      {/* ─── 5. THIS WEEK FEATURED ─── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">

          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p
                className="text-black/30 mb-3 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em' }}
              >
                This Week
              </p>
              <h2
                className="font-cormorant text-black"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 300, lineHeight: '1.0' }}
              >
                Featured Selection
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-black/50 hover:text-black transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4-col product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {thisWeek.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-10 text-center md:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border-b border-black text-black pb-0.5"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. FEATURED BRANDS SCROLLING ─── */}
      <BrandStrip />

      {/* ─── 7. EDITORIAL SPLIT — new arrivals highlight ─── */}
      <section className="bg-[#F4F4F2]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 items-stretch">
            {/* Image */}
            <div className="relative overflow-hidden min-h-[35vw] lg:min-h-0 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1769547673654-c67427ac94ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                alt="New Arrivals"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-10 lg:py-14 order-1 lg:order-2 bg-white">
              <p
                className="text-black/30 mb-5 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em' }}
              >
                Just In
              </p>
              <h2
                className="font-cormorant text-black mb-6"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', fontWeight: 300, lineHeight: '1.0' }}
              >
                New<br />Arrivals
              </h2>
              <p
                className="text-black/45 mb-10 max-w-sm"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', lineHeight: '1.7', fontWeight: 300 }}
              >
                Fresh from independent makers, chosen one at a time. Nothing arrives here by accident.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {mockProducts.filter(p => p.isNew).slice(0, 2).map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group">
                    <div className="aspect-[4/3] overflow-hidden bg-[#F4F4F2] mb-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                      />
                    </div>
                    <p className="text-black/35 mb-0.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{product.seller}</p>
                    <p className="text-black/70 group-hover:text-black transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>{product.name}</p>
                    <p className="text-black mt-0.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>£{product.price}</p>
                  </Link>
                ))}
              </div>
              <Link
                to="/new-arrivals"
                className="group inline-flex items-center gap-3 text-black border-b border-black pb-0.5 hover:border-black/30 transition-colors self-start"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
              >
                See All New Arrivals
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. THE EDIT — Magazine Layout ─── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">

          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p
                className="text-black/30 mb-3 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em' }}
              >
                Editorial
              </p>
              <h2
                className="font-cormorant text-black"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 300, lineHeight: '1.0' }}
              >
                The Edit
              </h2>
            </div>
            <Link
              to="/the-edit"
              className="hidden md:flex items-center gap-2 text-black/50 hover:text-black transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              All Stories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Magazine grid: 1 large + 2 stacked */}
          <div className="grid lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8">

            {/* Large featured article */}
            {editArticles[0] && (
              <Link to={`/the-edit/${editArticles[0].id}`} className="group block">
                <div className="overflow-hidden aspect-[16/9] mb-4">
                  <img
                    src={editArticles[0].image}
                    alt={editArticles[0].title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="text-black/35 uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em' }}
                    >
                      {editArticles[0].category}
                    </span>
                    <span
                      className="text-black/25"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem' }}
                    >
                      {editArticles[0].readTime}
                    </span>
                  </div>
                  <h3
                    className="font-cormorant text-black group-hover:text-black/60 transition-colors"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 300, lineHeight: '1.1' }}
                  >
                    {editArticles[0].title}
                  </h3>
                  <p
                    className="text-black/40 mt-3 line-clamp-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', lineHeight: '1.65', fontWeight: 300 }}
                  >
                    {editArticles[0].subtitle}
                  </p>
                </div>
              </Link>
            )}

            {/* Two smaller articles stacked */}
            <div className="flex flex-col gap-8">
              {editArticles.slice(1, 3).map((article) => (
                <Link key={article.id} to={`/the-edit/${article.id}`} className="group flex gap-5 items-start">
                  <div className="overflow-hidden aspect-square flex-shrink-0 w-20 md:w-24">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <p
                      className="text-black/30 mb-2 uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.28em' }}
                    >
                      {article.category}
                    </p>
                    <h3
                      className="font-cormorant text-black group-hover:text-black/60 transition-colors mb-2"
                      style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, lineHeight: '1.1' }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-black/35 line-clamp-2"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', lineHeight: '1.6', fontWeight: 300 }}
                    >
                      {article.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. MAKERS SECTION ─── */}
      <section className="py-12 lg:py-16 bg-[#F4F4F2]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p
                className="text-black/30 mb-3 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em' }}
              >
                Our Makers
              </p>
              <h2
                className="font-cormorant text-black"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 300, lineHeight: '1.0' }}
              >
                Featured Brands
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-black/50 hover:text-black transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              All Brands <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {mockSellers.slice(0, 3).map((seller) => (
              <Link key={seller.slug} to={`/seller/${seller.slug}`} className="group block bg-white">
                <div className="relative aspect-[16/9] overflow-hidden bg-white">
                  <img
                    src={seller.image}
                    alt={seller.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div className="p-4">
                  <p
                    className="text-black/30 mb-1 uppercase"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.25em' }}
                  >
                    {seller.location}
                  </p>
                  <h3
                    className="font-cormorant text-black group-hover:text-black/60 transition-colors mb-2"
                    style={{ fontSize: '1.5rem', fontWeight: 300 }}
                  >
                    {seller.name}
                  </h3>
                  <p
                    className="text-black/45 line-clamp-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: '1.6', fontWeight: 300 }}
                  >
                    {seller.bio.split('.')[0]}.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <p
                      className="text-black/30 uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em' }}
                    >
                      {mockProducts.filter(p => p.sellerSlug === seller.slug).length} pieces
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. SELL ON STUDIO MARCHE ─── */}
      <section className="py-0">
        <div className="grid lg:grid-cols-2" style={{ minHeight: '340px' }}>
          {/* Image */}
          <div className="relative overflow-hidden min-h-[35vw] lg:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1764298493231-59ae059cdc7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              alt="Sell on Studio Marche"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Text */}
          <div className="bg-[#111111] flex flex-col justify-center px-8 md:px-14 lg:px-16 py-10 lg:py-12">
            <p
              className="text-white/30 mb-6 uppercase"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em' }}
            >
              For Makers
            </p>
            <h2
              className="font-cormorant text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 5rem)', fontWeight: 300, lineHeight: '1.0', letterSpacing: '-0.01em' }}
            >
              We don't sell<br />everything.
              <br />
              <em style={{ fontStyle: 'italic' }}>We sell the<br />right things.</em>
            </h2>
            <p
              className="text-white/45 mb-7 max-w-sm"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', lineHeight: '1.7', fontWeight: 300 }}
            >
              Every application to Studio Marche is read by our curation team. Quality, craft, and originality are the only criteria that matter.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/seller/login"
                className="inline-flex items-center gap-3 border border-white text-white px-6 py-3.5 hover:bg-white hover:text-black transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Apply to Sell
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors px-2 py-3.5"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING MARQUEE ─── */}
      <MarqueeStrip
        items={['Quality First', 'Independent Makers', 'Considered Objects', 'Made Slowly', 'Honest Production', 'Curated Weekly']}
        bgColor="bg-[#111111]"
        textColor="text-white/25"
        separator="·"
      />
    </div>
  );
};
