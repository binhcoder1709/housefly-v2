import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreRepository } from './genre.repository';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { SongModule } from '../songs/song.module';
import { TypeOrmModule } from 'src/configs/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmModule],
  providers: [GenreRepository, GenreService],
  controllers: [GenreController],
  exports: [GenreRepository],
})
export class GenreModule {}
