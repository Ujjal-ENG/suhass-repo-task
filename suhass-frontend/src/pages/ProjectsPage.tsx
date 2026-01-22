import { EmptyState } from '@/components/EmptyState';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectDialog } from '@/components/projects/ProjectDialog';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { Project } from '@/types';
import { UserRole } from '@/types';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.role === UserRole.ADMIN;

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects?limit=100');
      setProjects(res.data.data.projects);
    } catch (error) {
      console.error('Failed to fetch projects', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateOpen = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const handleEditOpen = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects(projects.filter((p) => p.id !== projectId));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete', error);
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage your team's projects."
        action={
          <Button onClick={handleCreateOpen}>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        }
      />

      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        project={editingProject}
        onSuccess={fetchProjects}
      />

      {projects.length === 0 ? (
        <EmptyState message="No projects found. Create one to get started." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showActions={isAdmin}
              onEdit={handleEditOpen}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
