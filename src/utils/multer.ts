import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as sharp from 'sharp';
import { Multer } from 'multer';
import { ConfigService } from '@nestjs/config';
import { NotAcceptableException } from '@nestjs/common';
import * as dotenv from "dotenv"
dotenv.config()

const configService = new ConfigService();
cloudinary.config({
  cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
  api_key: configService.get('CLOUDINARY_API_KEY'),
  api_secret: configService.get('CLOUDINARY_API_SECRET'),
});

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folderName: string,
): Promise<UploadApiResponse | undefined> => {
  const nameWithoutExt = file.originalname.split('.')[0];
  const sanitizedName = nameWithoutExt
    .replace(/[^a-zA-Z0-9\-_]/g, '_') // Replace special chars with underscore
    .replace(/\s+/g, '_') // Replace spaces with underscore
    .substring(0, 50);
  const uniqueId = `${Date.now()}_${sanitizedName}`;

  // Check if the file is an image or PDF
  const isImage = file.mimetype.startsWith('image/');
  const isPDF = file.mimetype === 'application/pdf';
  const isDocx =
    file.mimetype ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const isDoc = file.mimetype === 'application/msword'; // Check for .doc files
  const isExcel =
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // Check for .xlsx files
    file.mimetype === 'application/vnd.ms-excel'; // Check for .xls files

  let fileBuffer;

  if (isImage) {
    // Compress image using sharp
    fileBuffer = await sharp(file.buffer).jpeg({ quality: 60 }).toBuffer();
  } else if (isPDF || isDocx || isDoc || isExcel) {
    // For PDF, DOCX, DOC, and Excel files, use the original buffer
    fileBuffer = file.buffer;
  } else {
    throw new NotAcceptableException('Unsupported file type');
  }

  return new Promise<UploadApiResponse | undefined>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
          public_id: `${folderName.replace(/[^a-zA-Z0-9\-_\/]/g, '')}/${uniqueId}`,
          type: 'upload',
          folder: folderName,
        },
        (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(result);
          }
        },
      )
      .end(fileBuffer);
  });
};
