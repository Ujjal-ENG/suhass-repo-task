import { AppDataSource } from '../config/db.js';
import { User, UserRole, UserStatus } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepo.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateUserRole(userId: string, role: UserRole) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.role = role;
    return await this.userRepo.save(user);
  }

  async updateUserStatus(userId: string, status: UserStatus) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.status = status;
    return await this.userRepo.save(user);
  }
}
