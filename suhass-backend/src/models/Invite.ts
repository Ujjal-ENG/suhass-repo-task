import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './User';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role!: UserRole;

  @Column({ type: 'varchar' })
  tokenHash!: string;

  @Column({ type: 'timestamp' })
  expiresAt!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  acceptedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
