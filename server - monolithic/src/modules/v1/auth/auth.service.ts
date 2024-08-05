import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { CreateUserDto } from 'src/dtos/auth/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dtos/auth/login-request.dto';
import { User } from 'src/entities/user.entity';
import { Cache } from 'cache-manager';
import { timeAsJwtExpireFormat } from 'src/utils/formatTime';
import { RedisService } from 'src/modules/v1/redis/redis.service';

export interface IRegisterResponse {
  data: User;
  message: string;
}

interface PayloadToken {
  user_id: string;
  user_name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepos: UserRepository,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  // register function
  async registerService(
    createUserDto: CreateUserDto,
  ): Promise<IRegisterResponse> {
    try {
      // hash password
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

  // login function
  async loginService(loginDto: LoginDto) {
    try {
      // check email
      const userWithEmail = await this.userRepos.findByEmail(loginDto.email);

      // check password
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        userWithEmail.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email or password is incorrect');
      }

      // create payload for token
      const dataPayload: PayloadToken = {
        user_id: userWithEmail.user_id,
        user_name: userWithEmail.user_name,
        email: userWithEmail.email,
      };
      const accessToken = this.jwtService.sign(dataPayload);
      const refreshToken = this.jwtService.sign(dataPayload, {
        secret: process.env.REFRESH_SECRET_KEY,
        expiresIn: '7d',
      });
      return {
        AT: accessToken,
        RT: refreshToken,
        role: userWithEmail.role,
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Internal server error');
    }
  }

  // logout service
  async logoutService(
    user_id: string,
    accessToken: string,
    refreshToken: string,
  ) {
    try {
      const payloadAccessToken = this.jwtService.decode(accessToken);
      const payloadRefreshToken = this.jwtService.decode(refreshToken);
      await this.redisService.set(
        `at-${user_id}`,
        accessToken,
        payloadAccessToken.exp - timeAsJwtExpireFormat(),
      );
      await this.redisService.set(
        `rt-${user_id}`,
        `${refreshToken}`,
        payloadRefreshToken.exp - timeAsJwtExpireFormat(),
      );
      return 'Logout successfully';
    } catch (error) { 
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async confirmEmailService(email: string, code: number): Promise<boolean> {
    const otpCache = await this.redisService.get(`emailOTP-${email}`);
    if (Number(otpCache) === code) {
      return true;
    } else {
      throw new UnauthorizedException('OTP is invalid');
    }
  }
}
