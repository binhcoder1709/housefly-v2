import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { AuthService, IRegisterResponse } from './auth.service';
import { CreateUserDto } from 'src/dtos/auth/create-user.dto';
import { LoginDto } from 'src/dtos/auth/login-request.dto';

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

  @Post('/login')
  @HttpCode(200)
  async loginController(@Body() loginDto: LoginDto) {
    return await this.authService.loginService(loginDto);
  }

  @Post('/logout/:id')
  @HttpCode(200)
  async logoutController(
    @Body('accessToken') accessToken: string,
    @Body('refreshToken') refreshToken: string,
    @Param('id') user_id: string,
  ) {
    return await this.authService.logoutService(
      user_id,
      accessToken,
      refreshToken,
    );
  }

  @Post('/confirm')
  @HttpCode(200)
  async confirmEmailController(
    @Body('code') code: number,
    @Body('email') email: string,
  ) {
    return await this.authService.confirmEmailService(email, code);
  }
}
