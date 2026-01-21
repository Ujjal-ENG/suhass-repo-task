import 'reflect-metadata';
import { AppDataSource, connectDB } from '../config/db.js';
import { Project, ProjectStatus } from '../models/Project.js';
import { User, UserRole } from '../models/User.js';

const seedProjects = async () => {
    await connectDB();
    
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);

    const admin = await userRepo.findOne({ where: { role: UserRole.ADMIN } });
    
    if (!admin) {
        console.log('❌ Admin user not found. Please run seed script first.');
        process.exit(1);
    }

    const projectsData = [
        { name: 'Website Redesign', description: 'Revamp the corporate website with new branding.', status: ProjectStatus.ACTIVE },
        { name: 'Mobile App Launch', description: 'Launch the MVP for iOS and Android.', status: ProjectStatus.ACTIVE },
        { name: 'Internal Audit', description: 'Q1 security and compliance audit.', status: ProjectStatus.ACTIVE },
    ];

    for (const p of projectsData) {
        const exists = await projectRepo.findOne({ where: { name: p.name } });
        if (!exists) {
            const project = projectRepo.create({
                ...p,
                createdById: admin.id
            });
            await projectRepo.save(project);
            console.log(`✅ Project created: ${p.name}`);
        }
    }
    
    console.log('✅ Projects seeding completed');
    process.exit(0);
};

seedProjects().catch((error) => {
  console.error('❌ Seed projects failed:', error);
  process.exit(1);
});
