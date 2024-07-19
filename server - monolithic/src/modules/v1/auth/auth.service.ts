import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { CreateUserDto } from 'src/dtos/auth/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dtos/auth/login-request.dto';
import { User } from 'src/schemas/user.schema';

export interface IRegisterResponse {
  data: User;
  message: string;
}

interface PayloadToken {
  // user_id: string;
  user_name: string;
  email: string;
  avatar: string;
  role: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly userRepos: UserRepository, private readonly jwtService:JwtService) {}

  async registerService(
    createUserDto: CreateUserDto,
  ): Promise<IRegisterResponse> {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      const userCreate = {
        ...createUserDto,
        password: hashPassword,
      };
      const userCreated = await this.userRepos.createOne(userCreate);
      return {
        message: 'Register successfully',
        data: userCreated,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async loginService(loginDto:LoginDto)
  {
    try {
      const userWithEmail = await this.userRepos.findByEmail(loginDto.email);
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        userWithEmail.password
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email or password is incorrect');
      }
      const dataPayload: PayloadToken = {
        // user_id: userWithEmail,
        user_name: userWithEmail.user_name,
        email: userWithEmail.email,
        avatar: userWithEmail.avatar,
        role: userWithEmail.role,
      };
      const accessToken = this.jwtService.sign(dataPayload);
      const refreshToken = this.jwtService.sign(dataPayload, {
        secret: process.env.REFRESH_SECRET_KEY,
        expiresIn: '7d',
      });
      return {
        AT: accessToken,
        RT: refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
