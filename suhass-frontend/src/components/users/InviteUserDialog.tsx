import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { UserRole } from '@/types';
import { Check, Copy, Loader2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface InviteUserDialogProps {
  onInviteSuccess?: () => void;
}

export function InviteUserDialog({ onInviteSuccess }: InviteUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STAFF);
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/invite', { email, role });
      setInviteLink(res.data.data.inviteLink);
      toast.success('Invite sent successfully!');
      onInviteSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to send invite');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyInviteLink = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/invite', { email, role });
      const link = res.data.data.inviteLink;
      await navigator.clipboard.writeText(link);
      toast.success('Invite link copied to clipboard!');
      setInviteLink(link);
      onInviteSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to generate invite');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setInviteLink('');
    setCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Invite User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {inviteLink ? 'Invite Sent!' : 'Invite New User'}
          </DialogTitle>
          <DialogDescription>
            {inviteLink
              ? 'Share this link with the user to let them join the workspace.'
              : 'Send an invitation email to a new team member.'}
          </DialogDescription>
        </DialogHeader>

        {inviteLink ? (
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={inviteLink}
                className="font-mono text-sm"
              />
              <Button size="icon" variant="outline" onClick={handleCopyLink}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleInvite}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invite-role">Role</Label>
                <select
                  id="invite-role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                >
                  <option value={UserRole.STAFF}>STAFF</option>
                  <option value={UserRole.MANAGER}>MANAGER</option>
                  <option value={UserRole.ADMIN}>ADMIN</option>
                </select>
              </div>
            </div>
            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={loading || !email}
                onClick={handleCopyInviteLink}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy Invite Link
                  </>
                )}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Send Invite'
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
