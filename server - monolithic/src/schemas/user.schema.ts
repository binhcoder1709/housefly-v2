import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
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
}

export const UserSchema = SchemaFactory.createForClass(User);
