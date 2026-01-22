import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ message, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg',
        className
      )}
    >
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p>{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
