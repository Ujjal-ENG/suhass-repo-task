import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db.js';
import { env } from '../config/env.js';
import { Invite } from '../models/Invite.js';
import { User, UserRole, UserStatus } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);
  private inviteRepo = AppDataSource.getRepository(Invite);

  private signToken(userId: string) {
    return jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: '1d', // Access token only
    });
  }

  private hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async login(email: string, password: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne();

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError('Incorrect email or password', 401);
    }

    // Check if user is deactivated
    if (user.status === UserStatus.INACTIVE) {
      throw new AppError('Your account has been deactivated. Please contact an administrator.', 403);
    }

    const token = this.signToken(user.id);
    // Remove password from output
    user.passwordHash = undefined as any;
    return { user, token };
  }

  async createInvite(email: string, role: UserRole) {
    // Check if user already exists
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(resetToken);

    const invite = this.inviteRepo.create({
      email,
      role,
      tokenHash,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    await this.inviteRepo.save(invite);

    // Simulate sending email
    const inviteLink = `${env.FRONTEND_URL}/register?token=${resetToken}`;
    console.log(`📧 [EMAIL SIMULATION] Invite sent to ${email}. Link: ${inviteLink}`);

    return { message: 'Invite sent successfully', inviteLink }; // Return link for dev convenience
  }

  async registerViaInvite(token: string, name: string, password: string) {
    const tokenHash = this.hashToken(token);

    const invite = await this.inviteRepo.findOne({
      where: { tokenHash },
    });

    if (!invite) {
      throw new AppError('Token is invalid or has expired', 400);
    }

    if (invite.expiresAt < new Date()) {
      throw new AppError('Token has expired', 400);
    }

    if (invite.acceptedAt) {
      throw new AppError('Token has already been used', 400);
    }

    const existingUser = await this.userRepo.findOne({ where: { email: invite.email } });
    if (existingUser) {
       // Should not happen normally if invite creation checks, but good safety
       throw new AppError('User already exists', 400);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = this.userRepo.create({
      name,
      email: invite.email,
      passwordHash,
      role: invite.role, // Inherit role from invite
      invitedAt: invite.createdAt,
    });

    await this.userRepo.save(newUser);

    // Mark invite as accepted
    invite.acceptedAt = new Date();
    await this.inviteRepo.save(invite);

    const authToken = this.signToken(newUser.id);
    // @ts-ignore
    newUser.passwordHash = undefined;

    return { user: newUser, token: authToken };
  }
}
