import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'orange' | 'navy' | 'blue';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  const variantStyles = {
    default: 'bg-culte-light-blue text-culte-navy',
    orange: 'bg-culte-orange text-white',
    navy: 'bg-culte-navy text-white',
    blue: 'bg-culte-light-blue text-culte-navy'
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs tracking-widest uppercase ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};