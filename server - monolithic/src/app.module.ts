import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './configs/typeorm/typeorm.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/v1/auth/auth.module';
import { UserModule } from './modules/v1/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGOOSEURI),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
