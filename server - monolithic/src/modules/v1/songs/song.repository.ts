import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSongDto } from "src/dtos/songs/create-song.dto";
import { Song } from "src/schemas/song.schema";

@Injectable()
export class SongRepoitory {
    constructor(@InjectModel(Song.name) private readonly songModel: Model<Song>) {}

    async createOne(createSongDto:CreateSongDto):Promise<Song>
    {
        
    }
}