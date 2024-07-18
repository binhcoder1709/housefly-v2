import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Subscription } from './subcription.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column({nullable: true})
  avatar: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  role: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @OneToOne(()=> Subscription, (subscription) => subscription.user)
  subscription: Subscription;
}
