import { Module } from '@nestjs/common';
import { GenreModule } from '../genres/genre.module';
import { SongRepository } from './song.repository';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { TypeOrmModule } from 'src/configs/typeorm/typeorm.module';
import { ArtistModule } from '../artists/artist.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { RedisModule } from 'src/modules/v1/redis/redis.module';

@Module({
  imports: [
    GenreModule,
    ArtistModule,
    TypeOrmModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY,
    }),
    RedisModule,
    UserModule,
  ],
  providers: [SongRepository, SongService],
  controllers: [SongController],
  exports: [SongRepository],
})
export class SongModule {}
