import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreRepository } from './genre.repository';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { SongModule } from '../songs/song.module';
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
    RedisModule,
    UserModule,
  ],
  providers: [GenreRepository, GenreService],
  controllers: [GenreController],
  exports: [GenreRepository],
})
export class GenreModule {}
