/**
 * Centralized type definitions for the application
 */

// ============================================
// Constants (using const objects instead of enums for erasableSyntaxOnly)
// ============================================

export const UserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const ProjectStatus = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED',
} as const;
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

// ============================================
// Interfaces
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
}

// ============================================
// Form Types
// ============================================

export interface ProjectFormData {
  name: string;
  description: string;
}

export interface InviteFormData {
  email: string;
  role: UserRole;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
