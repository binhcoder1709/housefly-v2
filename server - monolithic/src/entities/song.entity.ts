import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from './genre.entity';
import { PlaylistSong } from './playlist-song.entity';
import { ArtistSong } from './artist-song.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  song_id: string;

  @Column()
  song_name: string;

  @Column()
  song_image: string;

  @Column()
  song_path: string;

  @Column()
  song_duration: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Genre, (genre) => genre.songs)
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.song)
  playlist_songs: PlaylistSong[];

  @OneToMany(() => ArtistSong, (artistSong) => artistSong.song)
  artist_songs: ArtistSong[];
}
