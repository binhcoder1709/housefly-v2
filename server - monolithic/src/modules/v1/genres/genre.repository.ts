import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from 'src/entities/genre.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class GenreRepository {
  private readonly genreRepos: Repository<Genre>;
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.genreRepos = this.dataSource.getRepository(Genre);
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreRepos.find();
  }

  async findById(genre_id: string): Promise<Genre> {
    return this.genreRepos.findOneBy({ genre_id: genre_id });
  }

  async createOne(data: Partial<Genre>): Promise<Genre> {
    return await this.genreRepos.save(data);
  }

  async deleteOne(genre_id: string): Promise<DeleteResult> {
    return await this.genreRepos.delete(genre_id);
  }
}
