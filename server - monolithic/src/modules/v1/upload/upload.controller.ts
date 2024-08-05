import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/v1/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/music')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMusicFileController(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadService.uploadMusicFileService(file);
    return { url };
  }

  @Post('/music-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMusicImageFileController(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadService.uploadMusicImageFileService(file);
    return { url };
  }
}
