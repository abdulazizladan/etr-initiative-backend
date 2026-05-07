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
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new program' })
  @ApiResponse({ status: 201, description: 'The program has been successfully created.', type: Program })
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({ status: 200, description: 'Return all programs.', type: [Program] })
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a program by id' })
  @ApiResponse({ status: 200, description: 'Return the program.', type: Program })
  @ApiResponse({ status: 404, description: 'Program not found.' })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a program' })
  @ApiResponse({ status: 200, description: 'The program has been successfully updated.', type: Program })
  @ApiResponse({ status: 404, description: 'Program not found.' })
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a program' })
  @ApiResponse({ status: 204, description: 'The program has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Program not found.' })
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}
