'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, color = 'gradient', size = 'md', showValue = false, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const sizes = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-3'
    };
    
    const colors = {
      blue: 'bg-security-blue',
      green: 'bg-security-green',
      gradient: 'bg-gradient-to-r from-security-blue to-security-green'
    };

    return (
      <div className="space-y-1">
        {showValue && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>{value}</span>
            <span>{max}</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn('progress-bar', sizes[size], className)}
          {...props}
        >
          <div
            className={cn('progress-fill', colors[color])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };