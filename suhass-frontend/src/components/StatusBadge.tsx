import { cn } from '@/lib/utils';
import { UserRole, UserStatus } from '@/types';

interface StatusBadgeProps {
  variant: 'role' | 'status';
  value: UserRole | UserStatus | string;
  className?: string;
}

const roleStyles: Record<string, string> = {
  ADMIN: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  MANAGER: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  STAFF: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  INACTIVE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

export function StatusBadge({ variant, value, className }: StatusBadgeProps) {
  const styles = variant === 'role' ? roleStyles : statusStyles;
  const colorClass = styles[value] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        colorClass,
        className
      )}
    >
      {value}
    </span>
  );
}
