import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from './subcription.entity';
import { Order } from './order.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  plan_id: string;

  @Column()
  plan_name: string;

  @Column()
  price: number;

  @Column()
  time_active: number;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];

  @OneToMany(() => Order, (ord) => ord.plan)
  orders: Order[];
}
