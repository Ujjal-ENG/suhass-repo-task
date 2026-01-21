import { z } from 'zod';
import { ProjectStatus } from '../models/Project.js';

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
  }),
});
