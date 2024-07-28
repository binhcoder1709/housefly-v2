import { Inject, Injectable } from '@nestjs/common';
import { Artist } from 'src/entities/artist.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArtistRepository {
  private readonly artistRepos: Repository<Artist>;

  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.artistRepos = this.dataSource.getRepository(Artist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepos.find();
  }

  async findById(artist_id: string): Promise<Artist> {
    return await this.artistRepos.findOneBy({ artist_id: artist_id });
  }
}
