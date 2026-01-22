import { Router } from 'express';
import { inviteUser, login, register } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { restrictTo } from '../middlewares/roleMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { UserRole } from '../models/User.js';
import { inviteSchema, loginSchema, registerSchema } from '../validators/authValidators.js';

const router = Router();

router.post('/login', validateRequest(loginSchema), login);
router.post('/register-via-invite', validateRequest(registerSchema), register);

// Admin only routes
router.post(
  '/invite',
  protect,
  restrictTo(UserRole.ADMIN),
  validateRequest(inviteSchema),
  inviteUser
);

export default router;
