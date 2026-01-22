import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
