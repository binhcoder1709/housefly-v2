import { Module } from '@nestjs/common';
import { GenreModule } from '../genres/genre.module';
import { SuggestService } from './suggest.service';
import { SuggestController } from './suggest.controller';
import { SongModule } from '../songs/song.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [GenreModule, SongModule, RedisModule],
  providers: [SuggestService],
  controllers: [SuggestController],
})
export class SuggestModule {}
