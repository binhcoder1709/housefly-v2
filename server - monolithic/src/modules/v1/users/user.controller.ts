import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IUserResponse } from './user.repository';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/share/guards/jwt.guard';
import { RoleGuard } from 'src/share/guards/role.guard';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Get('/')
  @HttpCode(200)
  async getAllUsersController(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.userService.getAllUsersService(page, limit);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async getUserByIdController(@Param('id') id: string) {
    return await this.userService.getUserByIdService(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Put('/status')
  @HttpCode(200)
  async changeStatusController(
    @Query('user_id') user_id: string,
    @Query('status') status: number,
  ) {
    return await this.userService.changeStatusService(user_id, status);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteUserController(@Param('id') user_id: string) {
    return await this.userService.deleteUserService(user_id);
  }
}
