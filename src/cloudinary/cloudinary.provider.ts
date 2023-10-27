import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: (): void => {
        const cloudinary = v2 as { config: (config: { cloud_name: string; api_key: string; api_secret: string }) => void };
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME as string,
            api_key: process.env.CLOUD_API_KEY as string,
            api_secret: process.env.CLOUD_API_SECRET as string,
        });
    },
};
