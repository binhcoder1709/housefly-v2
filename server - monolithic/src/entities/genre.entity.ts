import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from './song.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  genre_id: string;

  @Column()
  genre_name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Song, (song) => song.genre, { cascade: true })
  songs: Song[];
}
