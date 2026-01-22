import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@/types';
import { UserRole, UserStatus } from '@/types';
import { MoreHorizontal } from 'lucide-react';

interface UserActionsDropdownProps {
  user: User;
  onRoleChange: (userId: string, role: UserRole) => void;
  onStatusChange: (userId: string, status: UserStatus) => void;
}

export function UserActionsDropdown({
  user,
  onRoleChange,
  onStatusChange,
}: UserActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onRoleChange(user.id, UserRole.STAFF)}>
          Set to STAFF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRoleChange(user.id, UserRole.MANAGER)}>
          Set to MANAGER
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRoleChange(user.id, UserRole.ADMIN)}>
          Set to ADMIN
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onStatusChange(user.id, UserStatus.ACTIVE)}>
          Activate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange(user.id, UserStatus.INACTIVE)}>
          Deactivate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
