import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('team_members')
export class TeamMember {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe' })
  @Column()
  fullName: string;

  @ApiProperty({ example: 'Executive Director' })
  @Column()
  title: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', required: false })
  @Column({ nullable: true })
  image: string;
}
