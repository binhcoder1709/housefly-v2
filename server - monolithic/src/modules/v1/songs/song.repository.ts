import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSongDto } from 'src/dtos/songs/create-song.dto';
import { ArtistSong } from 'src/entities/artist-song.entity';
import { Song } from 'src/entities/song.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SongRepository {
  private readonly songRepos: Repository<Song>;
  private readonly artistSongRepos: Repository<ArtistSong>;
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.songRepos = this.dataSource.getRepository(Song);
    this.artistSongRepos = this.dataSource.getRepository(ArtistSong);
  }

  async findAll(page: number, limit: number) {
    let offset: number = 0;
    const totalSongs = await this.songRepos.count();
    const totalPage = Math.ceil(totalSongs / limit);
    if (page > 0) {
      offset = (page - 1) * limit;
      const songsLimit = await this.songRepos.find({
        take: limit,
        skip: offset,
        relations: ['genre'],
      });
      return {
        dataLimit: songsLimit.map((item) => ({
          song_name: item.song_name,
          song_id: item.song_id,
          song_path: item.song_path,
          song_duration: item.song_duration,
          genre: item.genre.genre_name,
        })),
        totalPage: totalPage,
      };
    }
  }

  async findById(song_id: string): Promise<Song> {
    const song = await this.songRepos.findOne({
      where: { song_id: song_id },
    });
    return song;
  }

  async createOne(data: Partial<Song>): Promise<Song> {
    return await this.songRepos.save(data);
  }

  async createArtistSong(data: Partial<ArtistSong>): Promise<ArtistSong> {
    return await this.artistSongRepos.save(data);
  }

  async updateOne(song_id: string, data: Partial<Song>): Promise<UpdateResult> {
    return await this.songRepos.update({ song_id: song_id }, data);
  }

  async deleteOne(song_id: string): Promise<DeleteResult> {
    return await this.songRepos.delete(song_id);
  }
}
