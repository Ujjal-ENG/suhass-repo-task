import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

const authService = new AuthService();

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const inviteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, role } = req.body;
    const result = await authService.createInvite(email, role);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, name, password } = req.body;
    const result = await authService.registerViaInvite(token, name, password);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id; // From protect middleware
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(userId, currentPassword, newPassword);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};
