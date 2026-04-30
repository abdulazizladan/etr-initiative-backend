import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /** Public feed – excludes heavy `content` field */
  async findAll(): Promise<Partial<Post>[]> {
    return this.postsRepository.find({
      select: ['id', 'title', 'slug', 'author', 'thumbnail', 'summary', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }

  /** Single post by slug – includes full content */
  async findBySlug(slug: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { slug } });
    if (!post) throw new NotFoundException(`Post with slug "${slug}" not found`);
    return post;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const slug = dto.slug
      ? dto.slug
      : slugify(dto.title, { lower: true, strict: true });

    const existing = await this.postsRepository.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException(`A post with slug "${slug}" already exists`);
    }

    const post = this.postsRepository.create({ ...dto, slug });
    return this.postsRepository.save(post);
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Post with id "${id}" not found`);

    // Re-generate slug if title changed and no explicit slug provided
    if (dto.title && !dto.slug) {
      dto.slug = slugify(dto.title, { lower: true, strict: true });
    }

    Object.assign(post, dto);
    return this.postsRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Post with id "${id}" not found`);
    await this.postsRepository.remove(post);
  }
}
