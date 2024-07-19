import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  user_name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 1 })
  role: number;

  @Prop({ default: 1 })
  status: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

