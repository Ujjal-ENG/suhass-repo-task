import { DataSource } from 'typeorm';
import { Invite } from '../models/Invite';
import { Project } from '../models/Project';
import { User } from '../models/User';
import { env } from './env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.NODE_ENV === 'development', // Auto-create tables in dev
  logging: env.NODE_ENV === 'development',
  entities: [User, Invite, Project],
  subscribers: [],
  migrations: [],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
