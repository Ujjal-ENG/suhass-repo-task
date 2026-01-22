import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types';
import { FolderGit2, Pencil, Trash2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

export function ProjectCard({
  project,
  showActions = false,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    onDelete?.(project.id);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
        <FolderGit2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-4">
          {project.description || 'No description'}
        </div>
        <div className="text-xs text-gray-500 mb-4">
          Created by {project.createdBy?.name || 'Unknown'} on{' '}
          {new Date(project.createdAt).toLocaleDateString()}
        </div>

        {showActions && (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(project)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
