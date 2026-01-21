import bcrypt from 'bcrypt';
import 'reflect-metadata';
import { AppDataSource, connectDB } from '../config/db.js';
import { User, UserRole, UserStatus } from '../models/User.js';

const seed = async () => {
  await connectDB();

  const userRepo = AppDataSource.getRepository(User);

  const existingAdmin = await userRepo.findOne({ where: { role: UserRole.ADMIN } });
  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash('admin123', 12);

  const admin = userRepo.create({
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  });

  await userRepo.save(admin);
  console.log('✅ Admin user created: admin@example.com / admin123');
  process.exit(0);
};

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});
