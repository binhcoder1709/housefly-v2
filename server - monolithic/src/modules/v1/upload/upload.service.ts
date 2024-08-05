import { Injectable } from '@nestjs/common';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadMetadata,
} from 'firebase/storage';
import { storage } from 'src/configs/firebase/firbase.config';

@Injectable()
export class UploadService {
  async uploadMusicFileService(file: Express.Multer.File): Promise<string> {
    const storageRef = ref(storage, `musics/${file.originalname}`);
    const metadata: UploadMetadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  async uploadMusicImageFileService(
    file: Express.Multer.File,
  ): Promise<string> {
    const storageRef = ref(storage, `music_images/${file.originalname}`);
    const metadata: UploadMetadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
}
