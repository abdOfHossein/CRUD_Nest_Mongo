import { join } from 'path';

export class Helper {
  static customFileName(req, file, cb) {
    console.log(file);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = 'jpeg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = 'png';
    } else if (file.mimetype.indexOf('jpg') > -1) {
      fileExtension = 'jpg';
    }
    cb(null, Date.now() + file.originalname);
  }

  static destinationPath(req, file, cb) {
    cb(null, join(process.cwd(), `/upload`));
  }
}
