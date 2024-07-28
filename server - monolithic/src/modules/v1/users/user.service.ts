import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsersService(page: number, limit: number) {
    const user = await this.userRepository.findAll(page, limit);
    return user;
  }

  async getUserByEmailService(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async changeStatusService(
    user_id: string,
    status: number,
  ): Promise<UpdateResult> {
    try {
      return await this.userRepository.changeStatus(user_id, status);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async deleteUserService(user_id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.deleteOne(user_id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
