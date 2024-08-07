import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUserResponse, UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RedisService } from 'src/modules/v1/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {}

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

  async getUserByIdService(user_id: string): Promise<IUserResponse> {
    const userCache = await this.redisService.get(`user_${user_id}`);

    if (!userCache) {
      const user = await this.userRepository.findById(user_id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const response: IUserResponse = {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
      };

      await this.redisService.set(
        `user_${user_id}`,
        JSON.stringify(response),
        300,
      );
      return response;
    } else {
      if (typeof userCache === 'string') {
        console.log(`user-${user_id} is call in memory cache`);

        return JSON.parse(userCache);
      }
    }

    throw new InternalServerErrorException('Cache data is not valid');
  }

  async changeStatusService(
    user_id: string,
    status: number,
  ): Promise<UpdateResult> {
    try {
      const updateResult = await this.userRepository.changeStatus(
        user_id,
        status,
      );

      if (updateResult.affected > 0) {
        const updatedUser = await this.userRepository.findById(user_id);
        if (updatedUser) {
          const response: IUserResponse = {
            user_id: updatedUser.user_id,
            user_name: updatedUser.user_name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            status: updatedUser.status,
            role: updatedUser.role,
          };

          await this.redisService.set(
            `user_${user_id}`,
            JSON.stringify(response),
            300,
          );
        }
      }

      return updateResult;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async deleteUserService(user_id: string): Promise<DeleteResult> {
    try {
      const deleteResult = await this.userRepository.deleteOne(user_id);
      if (deleteResult.affected > 0) {
        await this.redisService.del(`user_${user_id}`);
        console.log(`user ${user_id} is deleted from database`);
        await this.redisService.del(`user-${user_id}`);
        console.log(`user-${user_id} is deleted from memory cache`);
      }

      return deleteResult;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getSubscriptionService(user_id: string) {
    const subscription = await this.userRepository.findSubscription(user_id);
    return subscription;
  }
}
