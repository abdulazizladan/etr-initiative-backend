import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the blog post',
    example: 'Getting Started with ETR Initiative',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'URL-friendly slug (auto-generated if not provided)',
    example: 'getting-started-with-etr-initiative',
    required: false,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'The author of the post',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'A brief summary of the post',
    example: 'In this post, we explore the core mission of ETR...',
  })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty({
    description: 'The full HTML content of the post',
    example: '<p>Welcome to our initiative...</p>',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'URL to the post thumbnail image',
    example: 'https://example.com/images/post1.jpg',
  })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;
}
