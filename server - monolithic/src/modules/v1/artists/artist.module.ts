import { Module } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from 'src/configs/typeorm/typeorm.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { RedisModule } from 'src/modules/v1/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY,
    }),
    RedisModule,UserModule
  ],
  providers: [ArtistRepository, ArtistService],
  controllers: [ArtistController],
  exports: [ArtistRepository],
})
export class ArtistModule {}
