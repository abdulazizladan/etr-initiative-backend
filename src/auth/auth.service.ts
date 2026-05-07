import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Seed the initial admin user if no users exist in the database.
   * This uses the credentials from the .env file for the first run.
   */
  async onModuleInit() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'admin@etr-initiative.org';
      const adminPassword = this.configService.get<string>('ADMIN_PASSWORD') || 'password';
      
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      const admin = this.userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      
      await this.userRepository.save(admin);
      console.log('✅ Initial admin user seeded in database');
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'password', 'role'], // Explicitly select password for comparison
    });

    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid current password');
    }

    user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.userRepository.save(user);

    return { message: 'Password successfully updated' };
  }
}
