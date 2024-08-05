import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './configs/typeorm/typeorm.module';
import { AuthModule } from './modules/v1/auth/auth.module';
import { UserModule } from './modules/v1/users/user.module';
import { SongModule } from './modules/v1/songs/song.module';
import { GenreModule } from './modules/v1/genres/genre.module';
import { UploadModule } from './modules/v1/upload/upload.module';
import { ArtistModule } from './modules/v1/artists/artist.module';
import { SuggestModule } from './modules/v1/suggests/suggest.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from './modules/v1/redis/redis.module';
import { MailModule } from './modules/v1/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule,
    AuthModule,
    UserModule,
    SongModule,
    GenreModule,
    UploadModule,
    ArtistModule,
    SuggestModule,
    RedisModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
