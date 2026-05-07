import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('programs')
export class Program {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'The unique identifier of the program' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Empowerment Program', description: 'The title of the program' })
  @Column()
  title: string;

  @ApiProperty({ example: 'A program designed to empower youth.', description: 'Brief description of the program' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'Phase 1 Completed', description: 'Current milestone or key milestone description' })
  @Column()
  milestone: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL of the program image' })
  @Column()
  image: string;

  @ApiProperty({ example: 5000, description: 'Impact statistic number' })
  @Column({ type: 'int', default: 0 })
  impactNumber: number;

  @ApiProperty({ example: 'Students Trained', description: 'Label for the impact statistic' })
  @Column({ nullable: true })
  impactLabel: string;

  @ApiProperty({ example: '<h1>About the program</h1><p>Detailed rich text content...</p>', description: 'Rich text content about the program' })
  @Column({ type: 'text' })
  about: string;

  @ApiProperty({ description: 'The date when the program was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the program was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
