import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Song } from './song.schema';
import mongoose, { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ timestamps: true, collection: 'genres', autoCreate: true })
export class Genre {
  @Prop()
  genre_name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] })
  songs: Song[];
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
