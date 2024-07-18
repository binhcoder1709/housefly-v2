import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from './song.entity';
import { Playlist } from './playlist.entity';

@Entity('playlist_song')
export class PlaylistSong {
  @PrimaryGeneratedColumn('uuid')
  playlist_song_id: string;

  @ManyToOne(() => Song, (song) => song.playlist_songs)
  @JoinColumn({ name: 'song_id' })
  song: Song;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlist_songs)
  @JoinColumn({ name: 'playlist_id' })
  playlist: Playlist;
}
