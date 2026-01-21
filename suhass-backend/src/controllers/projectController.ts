import { NextFunction, Request, Response } from 'express';
import { ProjectService } from '../services/projectService.js';

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    // req.user is guaranteed by protect middleware
    const project = await projectService.createProject(name, description, req.user!.id);
    res.status(201).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await projectService.getAllProjects(page, limit);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const project = await projectService.updateProject(id, name, description, status);
    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
