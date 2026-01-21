import { z } from 'zod';
import { UserRole } from '../models/User.js';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const inviteSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    token: z.string().min(1),
    name: z.string().min(1),
    password: z.string().min(6), // Enforce some strength
  }),
});
