import { IsNumber, IsString, IsUrl } from "class-validator";

export class UpdateSongDto
{
    @IsString()
    song_name: string;
  
    @IsUrl()
    song_image: string;
  
    @IsUrl()
    song_path: string;
  
    @IsNumber()
    song_duration: number;
  
    @IsString()
    genre: string;
}