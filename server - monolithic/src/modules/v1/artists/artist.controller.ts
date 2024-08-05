import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { JwtAuthGuard } from 'src/share/guards/jwt.guard';
import { RoleGuard } from 'src/share/guards/role.guard';

@Controller('/v1/artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
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

  @Get('/:id/songs')
  @HttpCode(200)
  async getSongsByArtistController(@Param('id') artist_id: string) {
    return await this.artistService.getSongsByArtistService(artist_id);
  }
}
