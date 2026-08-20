import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link to="/" className="text-culte-navy hover:text-culte-orange transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-culte-navy" />
          {index === items.length - 1 ? (
            <span className="text-culte-black">{item.label}</span>
          ) : (
            <Link to={item.path} className="text-culte-navy hover:text-culte-orange transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
