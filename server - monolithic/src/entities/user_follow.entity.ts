// import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./user.entity";

// @Entity('user_follow')
// export class UserFollow {
//     @PrimaryGeneratedColumn('uuid')
//     user_follow_id: string

//     @ManyToOne(()=> User, user => user.user_followings)
//     user_following: User

//     @ManyToOne(()=> User, user => user.user_followers)
// }