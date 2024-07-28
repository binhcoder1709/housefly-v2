import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistSong } from './artist-song.entity';
import { Album } from './album.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  artist_id: string;

  @Column()
  artist_name: string;

  @Column()
  artist_image: string;

  @Column()
  bio: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => ArtistSong, (artistSong) => artistSong.artist)
  artist_songs: ArtistSong[];

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
