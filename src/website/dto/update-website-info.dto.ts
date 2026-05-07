import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWebsiteInfoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mission?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vision?: string;
}
