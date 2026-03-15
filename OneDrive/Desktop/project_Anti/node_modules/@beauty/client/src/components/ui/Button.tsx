import React from 'react';
import { cn } from '@/lib/utils'; // We need to create this utility or just use clsx directly

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm border border-transparent',
            secondary: 'bg-[#F2C1C2] text-stone-900 hover:bg-[#E89B9B] shadow-sm border border-transparent',
            outline: 'bg-transparent border border-stone-200 text-stone-900 hover:bg-stone-50',
            ghost: 'bg-transparent text-stone-900 hover:bg-stone-100',
        };

        const sizes = {
            sm: 'h-8 px-4 text-xs',
            md: 'h-10 px-6 text-sm',
            lg: 'h-12 px-8 text-base',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
