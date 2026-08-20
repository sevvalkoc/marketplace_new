import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm text-culte-black">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border-2 border-[rgba(24,30,81,0.15)] bg-white text-culte-black placeholder:text-[rgba(15,15,15,0.4)] focus:outline-none focus:border-culte-orange transition-colors ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
