import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  subscription_id: string;

  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  plan: string;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column()
  is_active: boolean;
}
