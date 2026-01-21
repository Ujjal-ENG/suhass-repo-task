import { AppDataSource } from '../config/db.js';
import { Project, ProjectStatus } from '../models/Project.js';
import { AppError } from '../utils/AppError.js';

export class ProjectService {
  private projectRepo = AppDataSource.getRepository(Project);

  async createProject(name: string, description: string | undefined, userId: string) {
    const project = this.projectRepo.create({
      name,
      description,
      createdById: userId,
      status: ProjectStatus.ACTIVE,
    });

    return await this.projectRepo.save(project);
  }

  async getAllProjects(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [projects, total] = await this.projectRepo.findAndCount({
      where: { isDeleted: false }, // Only fetch non-deleted projects
      relations: ['createdBy'], // Eager load creator
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    // Sanitize creator data (remove password etc if eager loaded directly, though TypeORM selects usually handle this if configured right, but explicitly safest map)
    const sanitizedProjects = projects.map(p => ({
      ...p,
      createdBy: {
        id: p.createdBy.id,
        name: p.createdBy.name,
        email: p.createdBy.email
      }
    }));

    return {
      projects: sanitizedProjects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateProject(id: string, name?: string, description?: string, status?: ProjectStatus) {
    const project = await this.projectRepo.findOne({ where: { id, isDeleted: false } });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;

    return await this.projectRepo.save(project);
  }

  async deleteProject(id: string) {
    const project = await this.projectRepo.findOne({ where: { id, isDeleted: false } });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    project.isDeleted = true;
    project.status = ProjectStatus.DELETED; // Updating status as well per requirements
    
    return await this.projectRepo.save(project);
  }
}
