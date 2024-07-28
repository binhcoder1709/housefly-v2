import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { Artist } from 'src/entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async getAllArtistsService(): Promise<Artist[]> {
    return await this.artistRepository.findAll();
  }

  async getArtistByIdService(artist_id: string): Promise<Artist> {
    return await this.artistRepository.findById(artist_id);
  }
}
