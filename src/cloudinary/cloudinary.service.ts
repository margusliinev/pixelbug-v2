import { Injectable, InternalServerErrorException } from '@nestjs/common';
import cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadPhoto(file: Express.Multer.File): Promise<string> {
        const response = await cloudinary.v2.uploader.upload(file.path, {
            transformation: [{ width: 100, height: 100, crop: 'fit', quality: 'auto' }],
        });
        if (!response.secure_url) {
            throw new InternalServerErrorException({ success: false, message: 'Error uploading image', fields: { photo: 'Error uploading image' } });
        }
        return response.secure_url;
    }
}
