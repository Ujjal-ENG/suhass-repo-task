import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { User, UserRole, UserStatus } from '@/types';
import { UserActionsDropdown } from './UserActionsDropdown';

interface UsersTableProps {
  users: User[];
  onRoleChange: (userId: string, role: UserRole) => void;
  onStatusChange: (userId: string, status: UserStatus) => void;
}

export function UsersTable({ users, onRoleChange, onStatusChange }: UsersTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <StatusBadge variant="role" value={user.role} />
                </TableCell>
                <TableCell>
                  <StatusBadge variant="status" value={user.status} />
                </TableCell>
                <TableCell>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <UserActionsDropdown
                    user={user}
                    onRoleChange={onRoleChange}
                    onStatusChange={onStatusChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
