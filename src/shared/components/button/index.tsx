import React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from './types';

const buttonVariants = {
  primary: 'bg-gray-800 hover:bg-black text-white',
  secondary: 'bg-secondary-200 hover:bg-secondary-300 text-secondary-800',
  outline: 'border border-gray-800 text-gray-800 hover:bg-gray-50',
  ghost: 'text-gray-800 hover:bg-gray-50',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className = '',
  ...buttonProps
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
  `;

  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      aria-disabled={disabled || loading}
      {...buttonProps}
    >
      {loading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};
