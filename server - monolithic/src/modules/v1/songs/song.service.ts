import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SongRepository } from './song.repository';
import { CreateSongDto } from 'src/dtos/songs/create-song.dto';
import { GenreRepository } from '../genres/genre.repository';
import { UpdateSongDto } from 'src/dtos/songs/update-song.dto';
import { Song } from 'src/entities/song.entity';
import { UpdateResult } from 'typeorm';
import { ArtistSong } from 'src/entities/artist-song.entity';
import { ArtistRepository } from '../artists/artist.repository';
import { Artist } from 'src/entities/artist.entity';
import { RedisService } from '../redis/redis.service';

export interface ICreateSongResponse {
  message: string;
  data: Song;
}

export interface IUpdateSongResponse {
  message: string;
  data: UpdateResult;
}

@Injectable()
export class SongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly genreRepository: GenreRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly redisService: RedisService,
  ) {}

  async getAllSongsService(page: number, limit: number) {
    const songs = await this.songRepository.findAll(page, limit);
    return songs;
  }

  async getSongByIdService(song_id: string): Promise<Song> {
    const songCache = await this.redisService.get(`song-${song_id}`);
    if (!songCache) {
      const song = await this.songRepository.findById(song_id);
      if (!song) {
        throw new NotFoundException('Song not found');
      }
      await this.redisService.set(`song-${song_id}`, JSON.stringify(song), 600);
      return song;
    }
    return JSON.parse(songCache);
  }

  async getArtistBySongService(song_id: string) {
    return await this.songRepository.findArtistBySong(song_id);
  }

  async addSongService(
    createSongDto: CreateSongDto,
  ): Promise<ICreateSongResponse> {
    try {
      const song = new Song();
      song.song_name = createSongDto.song_name;
      song.song_image = createSongDto.song_image;
      song.song_path = createSongDto.song_path;
      song.song_duration = createSongDto.song_duration;
      const genre = await this.genreRepository.findById(createSongDto.genre);
      if (!genre) {
        throw new NotFoundException('Genre not found');
      }
      song.genre = genre;
      const songCreated = await this.songRepository.createOne(song);
      for (let artists of createSongDto.artist) {
        const artist = await this.artistRepository.findById(artists);
        const artistSong = new ArtistSong();
        artistSong.song = songCreated;
        artistSong.artist = artist;
        await this.songRepository.createArtistSong(artistSong);
      }
      return {
        message: 'Add song successfully',
        data: songCreated,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async updateSongService(
    song_id: string,
    updateSongDto: UpdateSongDto,
  ): Promise<IUpdateSongResponse> {
    try {
      const song = await this.songRepository.findById(song_id);
      if (!song) {
        throw new NotFoundException('Song not found');
      }
      const genre = await this.genreRepository.findById(updateSongDto.genre);
      if (!genre) {
        throw new NotFoundException('Genre not found');
      }
      song.song_name = updateSongDto.song_name;
      song.song_image = updateSongDto.song_image;
      song.song_path = updateSongDto.song_path;
      song.song_duration = updateSongDto.song_duration;
      song.genre = genre;
      const songUpdated = await this.songRepository.updateOne(song_id, song);
      const songCache = await this.redisService.get(`song-${song_id}`);
      if (songCache) {
        await this.redisService.set(
          `song-${song_id}`,
          JSON.stringify(songUpdated),
          600,
        );
      }
      return {
        message: 'Update song successfully',
        data: songUpdated,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async deleteSongService(song_id: string): Promise<string> {
    try {
      await this.songRepository.deleteOne(song_id);
      return 'Delete song successfully';
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
