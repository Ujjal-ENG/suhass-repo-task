import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function LoadingSpinner({ 
  className, 
  size = 'md', 
  fullPage = true 
}: LoadingSpinnerProps) {
  const spinner = (
    <Loader2 className={cn('animate-spin', sizeClasses[size], className)} />
  );

  if (fullPage) {
    return (
      <div className="flex justify-center p-8">
        {spinner}
      </div>
    );
  }

  return spinner;
}
