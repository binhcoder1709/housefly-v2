import { Body, Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/email')
  @HttpCode(200)
  async getUserByEmailController(@Body('email') email: string): Promise<User> {
    return await this.userService.getUserByEmailService(email);
  }
}
