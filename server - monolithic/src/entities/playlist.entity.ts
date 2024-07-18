import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaylistSong } from './playlist-song.entity';
import { User } from './user.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  playlist_id: string;

  @Column()
  playlist_name: string;

  @Column()
  cover_image: string;

  @Column()
  discription: string;

  @Column({ default: false })
  is_private: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.playlist)
  playlist_songs: PlaylistSong[];

  @ManyToOne(() => User, (user) => user.playlists)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
