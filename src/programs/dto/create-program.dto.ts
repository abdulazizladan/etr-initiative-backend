import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramDto {
  @ApiProperty({
    description: 'The title of the program',
    example: 'Youth Empowerment Initiative',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A brief description of the program',
    example: 'A program aimed at providing technical skills to youth.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'A key milestone or status of the program',
    example: 'Q3 Goal: 500 graduates',
  })
  @IsString()
  @IsNotEmpty()
  milestone: string;

  @ApiProperty({
    description: 'The URL of the program image',
    example: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Impact statistic number',
    example: 5000,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  impactNumber?: number;

  @ApiProperty({
    description: 'Label for the impact statistic',
    example: 'Students Trained',
    required: false,
  })
  @IsString()
  @IsOptional()
  impactLabel?: string;

  @ApiProperty({
    description: 'Detailed rich text content about the program',
    example: '<p>This program covers various aspects of modern technology...</p>',
  })
  @IsString()
  @IsNotEmpty()
  about: string;
}
