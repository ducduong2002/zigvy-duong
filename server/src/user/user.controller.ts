// src/user/user.controller.ts
import { Controller, Put, Param, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Get user profile
  // @UseGuards(JwtAuthGuard)
  @Get('profile/:_id')
  async getUserProfile(@Param('_id') userId: string): Promise<User | null> {
    return this.userService.getUserProfile(userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profiles')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // @UseGuards(JwtAuthGuard)
  @Put('profile/:_id/update')
  async updateUserProfile(
    @Param('_id') userId: string,
    @Body() updateData: Partial<User>,
  ): Promise<User | null> {
    return this.userService.updateUserProfile(userId, updateData);
  }
}
