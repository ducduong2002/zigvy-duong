import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserProfile(userId: string): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;
    return this.userRepository.findById(userId);
  }

  async updateUserProfile(
    userId: string,
    updateData: Partial<User>,
  ): Promise<User | null> {
    return this.userRepository.updateProfile(userId, updateData);
  }
}
