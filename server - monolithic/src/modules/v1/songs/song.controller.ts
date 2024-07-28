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
} from '@nestjs/common';
import {
  ICreateSongResponse,
  IUpdateSongResponse,
  SongService,
} from './song.service';
import { CreateSongDto } from 'src/dtos/songs/create-song.dto';
import { UpdateSongDto } from 'src/dtos/songs/update-song.dto';
import { Song } from 'src/entities/song.entity';

@Controller('/v1/songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  @HttpCode(200)
  async getAllSongsController(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.songService.getAllSongsService(page, limit);
  }

  @Get('/:id')
  @HttpCode(200)
  async getSongByIdController(@Param('id') song_id: string): Promise<Song> {
    return await this.songService.getSongByIdService(song_id);
  }

  @Post('/create')
  @HttpCode(201)
  async addSongController(
    @Body() createSongDto: CreateSongDto,
  ): Promise<ICreateSongResponse> {
    return await this.songService.addSongService(createSongDto);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateSongController(
    @Param('id') song_id: string,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<IUpdateSongResponse> {
    return await this.songService.updateSongService(song_id, updateSongDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteSongController(@Param('id') song_id: string): Promise<string> {
    return await this.songService.deleteSongService(song_id);
  }
}
