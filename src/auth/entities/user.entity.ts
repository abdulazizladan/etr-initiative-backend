import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'admin@etr-initiative.org' })
  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Don't return password by default
  password: string;

  @ApiProperty({ example: 'admin' })
  @Column({ default: 'admin' })
  role: string;
}
