import { IsString, IsNotEmpty, Length, Matches, IsEmail, IsOptional } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

export class UpdateUserProfileDto {
    @IsOptional()
    @Matches(/^[a-zA-Z]+$/, { message: 'First name can only contain letters (A-Z)' })
    @Length(2, 16, { message: 'First name must be between 2 and 16 characters' })
    @IsString({ message: 'First name must be a string' })
    firstName: string;

    @IsOptional()
    @Matches(/^[a-zA-Z]+$/, { message: 'Last name can only contain letters (A-Z)' })
    @Length(2, 16, { message: 'Last name must be between 2 and 16 characters' })
    @IsString({ message: 'Last name must be a string' })
    lastName: string;

    @Matches(/^[a-zA-Z0-9-]+$/, { message: 'Username can only contain letters (A-Z), numbers (0-9), and hyphens (-)' })
    @Matches(/^[^-].*[^-]$/, { message: 'Username cannot start or end with a hyphen' })
    @Length(3, 39, { message: 'Username must be between 3 and 39 characters' })
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsEmail({}, { message: 'Email is invalid' })
    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsOptional()
    @Matches(/^[A-Za-z /-]+$/, { message: 'Job title can only contain letters (A-Z), hyphens (-) and forward slashes (/)' })
    @Length(3, 39, { message: 'Job Title must be between 3 and 39 characters' })
    @IsString({ message: 'Job title must be a string' })
    jobTitle: string;

    @IsOptional()
    @MaxFileSize(500000, { message: 'Photo should be less than 0.5MB.' })
    @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'], { message: 'Photo should be in jpeg, jpg or png format.' })
    @IsFile({ message: 'Image is invalid.' })
    photo: Express.Multer.File;
}
