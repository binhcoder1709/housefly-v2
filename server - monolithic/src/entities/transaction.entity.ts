import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    transaction_id: string;

    @ManyToOne(()=> User, user => user.transactions)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column()
    amount: number;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}