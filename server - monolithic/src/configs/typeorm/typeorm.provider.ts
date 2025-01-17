import { Album } from 'src/entities/album.entity';
import { ArtistSong } from 'src/entities/artist-song.entity';
import { Artist } from 'src/entities/artist.entity';
import { Genre } from 'src/entities/genre.entity';
import { Order } from 'src/entities/order.entity';
import { Plan } from 'src/entities/plan.entity';
import { PlaylistSong } from 'src/entities/playlist-song.entity';
import { Playlist } from 'src/entities/playlist.entity';
import { Song } from 'src/entities/song.entity';
import { Subscription } from 'src/entities/subcription.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          User,
          Playlist,
          PlaylistSong,
          Artist,
          ArtistSong,
          Genre,
          Album,
          Song,
          Subscription,
          Transaction,
          Order,
          Plan
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
