import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from 'src/configs/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmModule],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
