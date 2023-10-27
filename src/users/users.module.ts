import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
    imports: [CloudinaryModule, NestjsFormDataModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
