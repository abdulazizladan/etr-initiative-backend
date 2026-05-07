import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'Executive Director' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;
}
