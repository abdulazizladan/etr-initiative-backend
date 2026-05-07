import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WebsiteService } from './website.service';
import { UpdateWebsiteInfoDto } from './dto/update-website-info.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { WebsiteInfo } from './entities/website-info.entity';
import { TeamMember } from './entities/team-member.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Website')
@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  // ──────────────────────────────────────────────
  // Website Info
  // ──────────────────────────────────────────────

  @Get('info')
  @ApiOperation({ summary: 'Get global website information' })
  @ApiResponse({ status: 200, type: WebsiteInfo })
  getInfo() {
    return this.websiteService.getInfo();
  }

  @Put('info')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update global website information' })
  @ApiResponse({ status: 200, type: WebsiteInfo })
  updateInfo(@Body() dto: UpdateWebsiteInfoDto) {
    return this.websiteService.updateInfo(dto);
  }

  // ──────────────────────────────────────────────
  // Team Members
  // ──────────────────────────────────────────────

  @Get('team')
  @ApiOperation({ summary: 'Get all team members' })
  @ApiResponse({ status: 200, type: [TeamMember] })
  getTeam() {
    return this.websiteService.getTeam();
  }

  @Post('team')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new team member' })
  @ApiResponse({ status: 201, type: TeamMember })
  addTeamMember(@Body() dto: CreateTeamMemberDto) {
    return this.websiteService.addTeamMember(dto);
  }

  @Put('team/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a team member' })
  @ApiResponse({ status: 200, type: TeamMember })
  updateTeamMember(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.websiteService.updateTeamMember(id, dto);
  }

  @Delete('team/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a team member' })
  @ApiResponse({ status: 204 })
  removeTeamMember(@Param('id') id: string) {
    return this.websiteService.removeTeamMember(id);
  }
}
