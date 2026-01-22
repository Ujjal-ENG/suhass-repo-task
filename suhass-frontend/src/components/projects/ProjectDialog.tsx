import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import type { Project, ProjectFormData } from '@/types';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onSuccess: () => void;
}

export function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ProjectDialogProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || '',
      });
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [project, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await api.patch(`/projects/${project.id}`, formData);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', formData);
        toast.success('Project created successfully');
      }
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('Failed to save project', error);
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Project' : 'Create Project'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update project details.'
              : 'Add a new project to your workspace.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-description">Description (Optional)</Label>
              <Input
                id="project-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
