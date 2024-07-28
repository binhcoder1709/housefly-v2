import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('/v1/artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(200)
  async getAllArtistsController() {
    return await this.artistService.getAllArtistsService();
  }

  @Get('/:id')
  @HttpCode(200)
  async getArtistByIdController(@Param('id') id: string) {
    return await this.artistService.getArtistByIdService(id);
  }
}
