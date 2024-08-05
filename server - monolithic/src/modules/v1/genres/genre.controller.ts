import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from 'src/dtos/genres/create-genre.dto';
import { DeleteResult } from 'typeorm';
import { Genre } from 'src/entities/genre.entity';
import { RoleGuard } from 'src/share/guards/role.guard';
import { JwtAuthGuard } from 'src/share/guards/jwt.guard';

@Controller('/v1/genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard)
  @Get()
  @HttpCode(200)
  async getAllGenresController(): Promise<Genre[]> {
    return await this.genreService.getAllGenresService();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Post('/create')
  @HttpCode(201)
  async createGenreController(@Body() createGenreDto: CreateGenreDto) {
    return await this.genreService.createGenreService(createGenreDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteGenreController(
    @Param('id') genre_id: string,
  ): Promise<DeleteResult> {
    return await this.genreService.deleteGenreService(genre_id);
  }
}
