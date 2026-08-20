import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, className = '', children, ...props }, ref) => {
    const baseStyles = 'transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed tracking-widest uppercase';
    const fontStyle = { fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em' };

    const variantStyles = {
      primary: 'bg-[#111111] text-white hover:bg-black/75',
      secondary: 'bg-white text-black border border-black hover:bg-black hover:text-white',
      ghost: 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
    };

    const sizeStyles = {
      sm: 'px-5 py-2',
      md: 'px-7 py-3',
      lg: 'px-10 py-4'
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        style={fontStyle}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
