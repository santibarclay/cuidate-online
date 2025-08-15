import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'primary' | 'secondary' | 'locked';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-security-green/10 text-green-800',
      primary: 'bg-security-blue/10 text-blue-800',
      secondary: 'bg-gray-100 text-gray-600',
      locked: 'bg-gray-200 text-gray-400'
    };

    return (
      <div
        ref={ref}
        className={cn('badge', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };