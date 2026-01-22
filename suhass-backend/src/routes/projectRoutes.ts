import { Router } from 'express';
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/projectController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { restrictTo } from '../middlewares/roleMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { UserRole } from '../models/User.js';
import { createProjectSchema, updateProjectSchema } from '../validators/projectValidators.js';

const router = Router();

router.use(protect);

// All authenticated users can view and create projects
router.get('/', getProjects);
router.post('/', validateRequest(createProjectSchema), createProject);

// Only ADMIN can edit or delete projects
router.patch(
  '/:id',
  restrictTo(UserRole.ADMIN),
  validateRequest(updateProjectSchema),
  updateProject
);

router.delete(
  '/:id',
  restrictTo(UserRole.ADMIN),
  deleteProject
);

export default router;
