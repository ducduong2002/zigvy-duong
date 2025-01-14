// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto, SignupDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  register(@Body() user: SignupDto): Promise<CreateUserDto | null> {
    return this.authService.register(user);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ email: string; _id: unknown }> {
    return this.authService.login(loginDto);
  }
}
