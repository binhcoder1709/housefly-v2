import { Module } from '@nestjs/common';
import { GenreModule } from '../genres/genre.module';
import { SuggestService } from './suggest.service';
import { SuggestController } from './suggest.controller';

@Module({
  imports: [GenreModule],
  providers: [SuggestService],
  controllers: [SuggestController],
})
export class SuggestModule {}
