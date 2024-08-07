import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZalopayService } from './zalopay.service';
import { ZalopayController } from './zalopay.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ZalopayService],
  controllers: [ZalopayController],
})
export class ZalopayModule {}
