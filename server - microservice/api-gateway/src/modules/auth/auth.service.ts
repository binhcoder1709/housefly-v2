import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dtos/create-user-request.dto';
import { RegisterEvent } from 'src/events/register.event';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async loginService(createUserDto: CreateUserDto) {
    this.authClient.emit(
      'registered',
      new RegisterEvent(
        createUserDto.user_name,
        createUserDto.email,
        createUserDto.password,
      ),
    );
  }
}
