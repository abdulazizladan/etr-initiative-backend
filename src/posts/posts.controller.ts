import {
  Controller,
  Get,
  Post as PostDecorator,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Post as PostEntity } from './entities/post.entity';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // ──────────────────────────────────────────────
  // Public endpoints (read-only)
  // ──────────────────────────────────────────────

  @Get()
  @ApiOperation({
    summary: 'Get all posts',
    description: 'Returns a list of all blog posts (summarized, no full content).',
  })
  @ApiResponse({
    status: 200,
    description: 'List of posts retrieved successfully.',
    type: [PostEntity],
  })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get a post by slug',
    description: 'Returns the full details of a single blog post.',
  })
  @ApiParam({ name: 'slug', description: 'The unique URL-friendly slug of the post' })
  @ApiResponse({
    status: 200,
    description: 'Post details retrieved successfully.',
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  findOne(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  // ──────────────────────────────────────────────
  // Administrative endpoints (JWT protected)
  // ──────────────────────────────────────────────

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @PostDecorator()
  @ApiOperation({
    summary: 'Create a new post',
    description: 'Create a new blog post. Requires admin authentication.',
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: PostEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({
    summary: 'Update an existing post',
    description: 'Update the details of an existing blog post. Requires admin authentication.',
  })
  @ApiParam({ name: 'id', description: 'The unique UUID of the post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a post',
    description: 'Permanently remove a blog post. Requires admin authentication.',
  })
  @ApiParam({ name: 'id', description: 'The unique UUID of the post' })
  @ApiResponse({ status: 24, description: 'The post has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
