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

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
});
