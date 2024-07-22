import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Genre } from './genre.schema';
import mongoose, { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema({ timestamps: true, collection: 'songs', autoCreate: true })
export class Song {
  @Prop()
  song_name: string;

  @Prop()
  song_image: string;

  @Prop()
  song_path: string;

  @Prop()
  song_duration: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' })
  genre: Genre;
}

export const SongSchema = SchemaFactory.createForClass(Song);
