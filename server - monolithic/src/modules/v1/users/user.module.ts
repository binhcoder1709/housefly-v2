import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from 'src/configs/typeorm/typeorm.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'src/modules/v1/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY,
    }),
    RedisModule
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
