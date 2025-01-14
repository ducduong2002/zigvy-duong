// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/user.schema';
import { LoginDto, SignupDto } from 'src/dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(newuser: SignupDto): Promise<User | null> {
    const { name, email, password } = newuser;
    const userId = uuidv4();
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) throw new Error('User already exists');
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.authRepository.create({
      email,
      password: hashedPassword,
      name,
      userId,
    });
  }
  async login(login: LoginDto): Promise<{ email: string; _id: unknown }> {
    const { email, password } = login;
    const user = await this.authRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credential   ');
    }
    // const token = this.jwtService.sign({ id: user._id, email: user.email });
    return { email: user.email, _id: user._id }; // Return the token as an object
  }
}
