import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from 'src/configs/typeorm/typeorm.module';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/modules/v1/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY,
      signOptions: { expiresIn: '30m' },
    }),
    UserModule,
    RedisModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/v1/auth/register', method: RequestMethod.POST },
        { path: '/v1/auth/login', method: RequestMethod.POST }
      );
  }
}
