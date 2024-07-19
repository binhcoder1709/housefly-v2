import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService, IRegisterResponse } from './auth.service';
import { CreateUserDto } from 'src/dtos/auth/create-user.dto';
import { User } from 'src/schemas/user.schema';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  async registerController(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IRegisterResponse> {
    return await this.authService.registerService(createUserDto);
  }
}
