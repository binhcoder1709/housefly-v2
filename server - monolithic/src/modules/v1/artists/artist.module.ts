import { Module } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from 'src/configs/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmModule],
  providers: [ArtistRepository, ArtistService],
  controllers: [ArtistController],
  exports: [ArtistRepository],
})
export class ArtistModule {}
