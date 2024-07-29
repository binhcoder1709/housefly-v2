import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @HttpCode(200)
  async getAllUsersController(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.userService.getAllUsersService(page, limit);
  }

  @Get('/:id')
  @HttpCode(200)
  async getUserByEmailController(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserByIdService(id);
  }

  @Put('/status')
  @HttpCode(200)
  async changeStatusController(
    @Query('user_id') user_id: string,
    @Query('status') status: number,
  ) {
    return await this.userService.changeStatusService(user_id, status);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteUserController(@Param('id') user_id: string) {
    return await this.userService.deleteUserService(user_id);
  }
}
