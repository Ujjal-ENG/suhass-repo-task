import { Router } from 'express';
import { getUsers, updateUserRole, updateUserStatus } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { restrictTo as requireRole } from '../middlewares/roleMiddleware.js'; // Alias to match common naming if needed, or just use import
import { validateRequest } from '../middlewares/validateRequest.js';
import { UserRole } from '../models/User.js';
import { updateRoleSchema, updateStatusSchema } from '../validators/userValidators.js';

const router = Router();

// Protect all routes
router.use(protect);
router.use(requireRole(UserRole.ADMIN));

router.get('/', getUsers);
router.patch('/:id/role', validateRequest(updateRoleSchema), updateUserRole);
router.patch('/:id/status', validateRequest(updateStatusSchema), updateUserStatus);

export default router;
