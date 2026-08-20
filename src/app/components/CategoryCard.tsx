import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  productCount?: number;
  variant?: 'overlay' | 'below';
}

export const CategoryCard = ({ name, slug, image, productCount, variant = 'overlay' }: CategoryCardProps) => {
  if (variant === 'below') {
    return (
      <Link to={`/category/${slug}`} className="group block">
        <div className="relative bg-culte-light-blue aspect-[5/4] mb-4 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div>
          <h3 className="font-cormorant text-2xl text-culte-navy group-hover:text-culte-orange transition-colors">{name}</h3>
          {productCount !== undefined && (
            <p className="text-sm text-culte-black/60 mt-1">{productCount} Products</p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/category/${slug}`} className="group block relative overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-culte-light-blue">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-culte-navy/70 via-culte-navy/10 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
          <div>
            <h3 className="font-cormorant text-2xl text-white">{name}</h3>
            {productCount !== undefined && (
              <p className="text-xs text-white/70 mt-1 tracking-wider">{productCount} PRODUCTS</p>
            )}
          </div>
          <div className="w-10 h-10 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowRight className="w-4 h-4 text-culte-navy" />
          </div>
        </div>
      </div>
    </Link>
  );
};