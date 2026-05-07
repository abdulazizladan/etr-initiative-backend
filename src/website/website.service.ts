import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebsiteInfo } from './entities/website-info.entity';
import { TeamMember } from './entities/team-member.entity';
import { UpdateWebsiteInfoDto } from './dto/update-website-info.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(WebsiteInfo)
    private readonly infoRepository: Repository<WebsiteInfo>,
    @InjectRepository(TeamMember)
    private readonly teamRepository: Repository<TeamMember>,
  ) {}

  // ──────────────────────────────────────────────
  // Website Info (Singleton)
  // ──────────────────────────────────────────────

  async getInfo(): Promise<WebsiteInfo> {
    let info = await this.infoRepository.findOne({ where: { id: 1 } });
    if (!info) {
      // Create default if not exists
      info = this.infoRepository.create({ id: 1 });
      await this.infoRepository.save(info);
    }
    return info;
  }

  async updateInfo(dto: UpdateWebsiteInfoDto): Promise<WebsiteInfo> {
    const info = await this.getInfo();
    Object.assign(info, dto);
    return await this.infoRepository.save(info);
  }

  // ──────────────────────────────────────────────
  // Team Members
  // ──────────────────────────────────────────────

  async getTeam(): Promise<TeamMember[]> {
    return await this.teamRepository.find();
  }

  async addTeamMember(dto: CreateTeamMemberDto): Promise<TeamMember> {
    const member = this.teamRepository.create(dto);
    return await this.teamRepository.save(member);
  }

  async updateTeamMember(id: string, dto: UpdateTeamMemberDto): Promise<TeamMember> {
    const member = await this.teamRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }
    Object.assign(member, dto);
    return await this.teamRepository.save(member);
  }

  async removeTeamMember(id: string): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }
  }
}
