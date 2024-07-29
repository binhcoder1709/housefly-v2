import { Controller, Get, HttpCode } from '@nestjs/common';
import { SuggestService } from './suggest.service';

@Controller('/v1/suggests')
export class SuggestController {
  constructor(private readonly suggestService: SuggestService) {}

  @Get('/vinahouse')
  @HttpCode(200)
  async getVinahouseSongs() {
    return await this.suggestService.getVinahouseSongsService();
  }
}
