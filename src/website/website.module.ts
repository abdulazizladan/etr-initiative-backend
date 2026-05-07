import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteService } from './website.service';
import { WebsiteController } from './website.controller';
import { WebsiteInfo } from './entities/website-info.entity';
import { TeamMember } from './entities/team-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteInfo, TeamMember])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
  exports: [WebsiteService],
})
export class WebsiteModule {}
