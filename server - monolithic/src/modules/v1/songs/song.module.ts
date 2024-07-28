import { Module } from '@nestjs/common';
import { GenreModule } from '../genres/genre.module';
import { SongRepository } from './song.repository';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { TypeOrmModule } from 'src/configs/typeorm/typeorm.module';
import { ArtistModule } from '../artists/artist.module';

@Module({
  imports: [GenreModule,ArtistModule, TypeOrmModule],
  providers: [SongRepository, SongService],
  controllers: [SongController],
})
export class SongModule {}
