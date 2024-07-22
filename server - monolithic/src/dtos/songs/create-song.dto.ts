import { IsString, IsUrl } from 'class-validator';

export class CreateSongDto {
  @IsString()
  song_name: string;

  @IsUrl()
  song_path: string;

  @IsString()
  genre: string;
}
