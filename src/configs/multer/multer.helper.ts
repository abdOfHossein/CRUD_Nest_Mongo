import { BadRequestException } from '@nestjs/common';
import { join } from 'path';

export class Helper {
  static async customFileName(req, file, cb) {
    try {
      console.log(file);
      let mimeType = file.mimetype.split('/')[1];
      console.log(mimeType);
      if (!mimeType.match(/png|PNG|JPG|jpg|JPEG|jpeg/g)) {
        console.log('here');
        throw new BadRequestException({
          message: 'file format must be png|PNG|JPG|jpg|JPEG|jpeg',
        });
      }
      cb(null, Date.now() + file.originalname);
    } catch (e) {
      console.log(e);
      cb(e, false);
    }
  }

  static destinationPath(req, file, cb) {
    cb(null, join(process.cwd(), `/upload`));
  }
}
