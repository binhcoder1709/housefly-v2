import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from 'src/dtos/genres/create-genre.dto';
import { DeleteResult } from 'typeorm';
import { Genre } from 'src/entities/genre.entity';

@Controller('/v1/genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @HttpCode(200)
  async getAllGenresController(): Promise<Genre[]> {
    return await this.genreService.getAllGenresService();
  }

  @Post('/create')
  @HttpCode(201)
  async createGenreController(@Body() createGenreDto: CreateGenreDto) {
    return await this.genreService.createGenreService(createGenreDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteGenreController(
    @Param('id') genre_id: string,
  ): Promise<DeleteResult> {
    return await this.genreService.deleteGenreService(genre_id);
  }
}
