import { Router } from 'express';
import { changePassword, inviteUser, login, register } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { restrictTo } from '../middlewares/roleMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { UserRole } from '../models/User.js';
import { changePasswordSchema, inviteSchema, loginSchema, registerSchema } from '../validators/authValidators.js';

const router = Router();

router.post('/login', validateRequest(loginSchema), login);
router.post('/register-via-invite', validateRequest(registerSchema), register);

// Protected routes (authenticated users)
router.post(
  '/change-password',
  protect,
  validateRequest(changePasswordSchema),
  changePassword
);

// Admin only routes
router.post(
  '/invite',
  protect,
  restrictTo(UserRole.ADMIN),
  validateRequest(inviteSchema),
  inviteUser
);

export default router;
