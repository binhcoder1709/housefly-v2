import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.entity';
import { Song } from './song.entity';

@Entity('artist_song')
export class ArtistSong {
  @PrimaryGeneratedColumn('uuid')
  artist_song_id: string;

  @ManyToOne(() => Artist, (artist) => artist.artist_songs)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @ManyToOne(() => Song, (song) => song.artist_songs)
  @JoinColumn({ name: 'song_id' })
  song: Song;
}
