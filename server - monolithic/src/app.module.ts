import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './configs/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmModule, ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
