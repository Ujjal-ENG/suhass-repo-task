import { z } from 'zod';
import { UserRole, UserStatus } from '../models/User.js';

export const updateRoleSchema = z.object({
  body: z.object({
    role: z.nativeEnum(UserRole),
  }),
});

export const updateStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(UserStatus),
  }),
});
