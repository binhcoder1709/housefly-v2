import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { CreateUserDto } from 'src/dtos/auth/create-user.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dtos/auth/login-request.dto';

interface IRegisterResponse {
  data: User;
  message: string;
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

  // async loginService(loginDto:LoginDto):Promise<>
  // {
  //       const user = await this.userRepos.findByEmail(loginDto.email);
        
  // }
}
