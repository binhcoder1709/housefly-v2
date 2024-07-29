import { Injectable } from '@nestjs/common';
import { GenreRepository } from '../genres/genre.repository';

@Injectable()
export class SuggestService {
  constructor(private readonly genreRepository: GenreRepository) {}
  async getVinahouseSongsService() {
    const genre = await this.genreRepository.findByName('vinahouse');
    const songOfGenre = genre.songs;
    return songOfGenre;
  }
}
