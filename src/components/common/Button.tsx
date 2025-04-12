
import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        // Base styles
        "font-medium rounded-lg transition-colors duration-200",
        
        // Variant styles
        variant === 'primary' && "bg-restaurant-primary text-white hover:bg-opacity-90",
        variant === 'secondary' && "bg-restaurant-secondary text-white hover:bg-opacity-90",
        variant === 'outline' && "border border-restaurant-primary text-restaurant-primary hover:bg-restaurant-primary hover:text-white",
        variant === 'ghost' && "text-restaurant-primary hover:bg-restaurant-cream",
        
        // Size styles
        size === 'sm' && "px-3 py-1.5 text-sm",
        size === 'md' && "px-4 py-2",
        size === 'lg' && "px-6 py-3 text-lg",
        
        // Width
        fullWidth && "w-full",
        
        // Custom class
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
