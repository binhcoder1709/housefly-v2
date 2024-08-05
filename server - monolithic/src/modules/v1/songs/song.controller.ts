import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ICreateSongResponse,
  IUpdateSongResponse,
  SongService,
} from './song.service';
import { CreateSongDto } from 'src/dtos/songs/create-song.dto';
import { UpdateSongDto } from 'src/dtos/songs/update-song.dto';
import { Song } from 'src/entities/song.entity';
import { ArtistSong } from 'src/entities/artist-song.entity';
import { Artist } from 'src/entities/artist.entity';
import { RoleGuard } from 'src/share/guards/role.guard';
import { JwtAuthGuard } from 'src/share/guards/jwt.guard';

@Controller('/v1/songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Get()
  @HttpCode(200)
  async getAllSongsController(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.songService.getAllSongsService(page, limit);
  }
  
  // @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async getSongByIdController(@Param('id') song_id: string): Promise<Song> {
    return await this.songService.getSongByIdService(song_id);
  }

  @Get('/:id/artists')
  @HttpCode(200)
  async getArtistBySongController(
    @Param('id') song_id: string,
  ) {
    return await this.songService.getArtistBySongService(song_id);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Post('/create')
  @HttpCode(201)
  async addSongController(
    @Body() createSongDto: CreateSongDto,
  ): Promise<ICreateSongResponse> {
    return await this.songService.addSongService(createSongDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Put('/:id')
  @HttpCode(200)
  async updateSongController(
    @Param('id') song_id: string,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<IUpdateSongResponse> {
    return await this.songService.updateSongService(song_id, updateSongDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteSongController(@Param('id') song_id: string): Promise<string> {
    return await this.songService.deleteSongService(song_id);
  }
}
