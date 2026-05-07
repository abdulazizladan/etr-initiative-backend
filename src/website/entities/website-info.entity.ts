import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('website_info')
export class WebsiteInfo {
  @PrimaryColumn({ default: 1 })
  id: number;

  @ApiProperty({ example: 'contact@etr-initiative.org' })
  @Column({ nullable: true })
  contactEmail: string;

  @ApiProperty({ example: '+234 800 000 0000' })
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiProperty({ example: 'https://facebook.com/etr' })
  @Column({ nullable: true })
  facebook: string;

  @ApiProperty({ example: 'https://instagram.com/etr' })
  @Column({ nullable: true })
  instagram: string;

  @ApiProperty({ example: 'https://twitter.com/etr' })
  @Column({ nullable: true })
  twitter: string;

  @ApiProperty({ example: 'Our mission is to...' })
  @Column({ type: 'text', nullable: true })
  mission: string;

  @ApiProperty({ example: 'Our vision is to...' })
  @Column({ type: 'text', nullable: true })
  vision: string;
}
