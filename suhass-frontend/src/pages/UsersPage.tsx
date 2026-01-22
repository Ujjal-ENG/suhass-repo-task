import { EmptyState } from '@/components/EmptyState';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';
import { InviteUserDialog } from '@/components/users/InviteUserDialog';
import { UsersTable } from '@/components/users/UsersTable';
import api from '@/lib/api';
import type { User, UserRole, UserStatus } from '@/types';
import { UserStatus as UserStatusValues } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users?limit=100');
      setUsers(res.data.data.users);
    } catch (error) {
      console.error('Failed to fetch users', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await api.patch(`/users/${userId}/role`, { role: newRole });
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      toast.success('Role updated successfully');
    } catch (error) {
      console.error('Failed to update role', error);
      toast.error('Failed to update role');
    }
  };

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    try {
      await api.patch(`/users/${userId}/status`, { status: newStatus });
      setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
      toast.success(
        `User ${newStatus === UserStatusValues.ACTIVE ? 'activated' : 'deactivated'} successfully`
      );
    } catch (error) {
      console.error('Failed to update status', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage users and roles."
        action={<InviteUserDialog onInviteSuccess={fetchUsers} />}
      />

      {users.length === 0 ? (
        <EmptyState message="No users found." />
      ) : (
        <UsersTable
          users={users}
          onRoleChange={handleRoleChange}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
