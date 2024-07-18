import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user-request.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  async registerController(@Body() createUserDto: CreateUserDto) {
    return await this.authService.loginService(createUserDto);
  }
}
