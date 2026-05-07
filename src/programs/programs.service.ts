import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const program = this.programRepository.create(createProgramDto);
    return await this.programRepository.save(program);
  }

  async findAll(): Promise<Program[]> {
    return await this.programRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programRepository.findOne({ where: { id } });
    if (!program) {
      throw new NotFoundException(`Program with ID "${id}" not found`);
    }
    return program;
  }

  async update(id: string, updateProgramDto: UpdateProgramDto): Promise<Program> {
    const program = await this.findOne(id);
    Object.assign(program, updateProgramDto);
    return await this.programRepository.save(program);
  }

  async remove(id: string): Promise<void> {
    const result = await this.programRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Program with ID "${id}" not found`);
    }
  }
}
