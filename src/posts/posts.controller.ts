import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // ──────────────────────────────────────────────
  // Public endpoints (read-only)
  // ──────────────────────────────────────────────

  /** GET /posts – lightweight feed (no content field) */
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  /** GET /posts/:slug – full post including content */
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  // ──────────────────────────────────────────────
  // Administrative endpoints (JWT protected)
  // ──────────────────────────────────────────────

  /** POST /posts – create a new post */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  /** PUT /posts/:id – update an existing post */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  /** DELETE /posts/:id – remove a post */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
