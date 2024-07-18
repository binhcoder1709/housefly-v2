import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  album_id: string;

  @Column()
  album_name: string;

  @Column()
  album_image: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;
}
