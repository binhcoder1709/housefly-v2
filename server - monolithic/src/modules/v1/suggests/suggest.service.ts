import { Injectable } from '@nestjs/common';
import { GenreRepository } from '../genres/genre.repository';
import { SongRepository } from '../songs/song.repository';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class SuggestService {
  constructor(
    private readonly genreRepository: GenreRepository,
    private readonly songRepository: SongRepository,
    private readonly redisService: RedisService,
  ) {}
  async getVinahouseSongsService() {
    const vinahouseCache = await this.redisService.get('guest-vinahouse');
    if (!vinahouseCache) {
      const genre = await this.genreRepository.findByName('vinahouse');
      const songOfGenre = genre.songs;

      let result = [];
      for (const song of songOfGenre) {
        const artists = await this.songRepository.findArtistBySong(
          song.song_id,
        );
        const songWithArtist = {
          ...song,
          artists: artists,
        };
        result.push(songWithArtist);
      }
      await this.redisService.set('guest-vinahouse', JSON.stringify(result));
      return result;
    } else {
      return JSON.parse(vinahouseCache);
    }
  }
}
