import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  author: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  thumbnail: string;

  @CreateDateColumn()
  createdAt: Date;
}
