import { Inject, Injectable } from '@nestjs/common';
import { ArtistSong } from 'src/entities/artist-song.entity';
import { Artist } from 'src/entities/artist.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArtistRepository {
  private readonly artistRepos: Repository<Artist>;
  private readonly artistSongRepos: Repository<ArtistSong>;
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.artistRepos = this.dataSource.getRepository(Artist);
    this.artistSongRepos = this.dataSource.getRepository(ArtistSong);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepos.find();
  }

  async findById(artist_id: string): Promise<Artist> {
    return await this.artistRepos.findOneBy({ artist_id: artist_id });
  }

  async findSongsByArtist(artist_id: string) {
    const artist = await this.findById(artist_id);
    const songsOfArtist = await this.artistSongRepos.find({
      where: { artist: artist },
      relations: ['song'],
    });
    return songsOfArtist.map((item) => item.song);
  }
}
