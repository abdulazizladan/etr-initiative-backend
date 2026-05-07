import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { ProgramsModule } from './programs/programs.module';
import { Program } from './programs/entities/program.entity';
import { User } from './auth/entities/user.entity';
import { WebsiteModule } from './website/website.module';
import { WebsiteInfo } from './website/entities/website-info.entity';
import { TeamMember } from './website/entities/team-member.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigService available everywhere
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/etr_blog.sqlite',
      entities: [Post, Program, User, WebsiteInfo, TeamMember],
      synchronize: true, // auto-creates tables in development
    }),
    AuthModule,
    PostsModule,
    ProgramsModule,
    WebsiteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
