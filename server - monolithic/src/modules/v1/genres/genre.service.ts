import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GenreRepository } from './genre.repository';
import { CreateGenreDto } from 'src/dtos/genres/create-genre.dto';
import { SongRepository } from '../songs/song.repository';
import { Genre } from 'src/entities/genre.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async getAllGenresService(): Promise<Genre[]> {
    return await this.genreRepository.findAll();
  }

  async createGenreService(createGenreDto: CreateGenreDto): Promise<Genre> {
    try {
      const genre = new Genre();
      genre.genre_name = createGenreDto.genre_name;
      genre.description = createGenreDto.description;
      return await this.genreRepository.createOne(genre);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async deleteGenreService(genre_id: string): Promise<DeleteResult> {
    try {
      const genre = await this.genreRepository.findById(genre_id);
      if (!genre) {
        throw new NotFoundException('Genre not found');
      }

      return await this.genreRepository.deleteOne(genre_id);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
