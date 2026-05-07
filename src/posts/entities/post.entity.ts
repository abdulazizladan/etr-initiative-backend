import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('posts')
export class Post {
  @ApiProperty({
    description: 'The unique identifier of the post (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The title of the blog post',
    example: 'Getting Started with ETR Initiative',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'URL-friendly slug',
    example: 'getting-started-with-etr-initiative',
  })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({
    description: 'The author of the post',
    example: 'John Doe',
  })
  @Column()
  author: string;

  @ApiProperty({
    description: 'A brief summary of the post',
    example: 'In this post, we explore the core mission of ETR...',
  })
  @Column({ type: 'text' })
  summary: string;

  @ApiProperty({
    description: 'The full content of the post',
    example: '<p>Welcome to our initiative...</p>',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'URL to the post thumbnail image',
    example: 'https://example.com/images/post1.jpg',
  })
  @Column({ type: 'text' })
  thumbnail: string;

  @ApiProperty({
    description: 'The date when the post was created',
    example: '2024-05-07T10:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}
