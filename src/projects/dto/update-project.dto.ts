import { ProjectStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProjectDto {
    @IsString({ message: 'Title must be a string' })
    @MaxLength(100, { message: 'Title must be less than 100 characters' })
    @MinLength(1, { message: 'Title is required' })
    @IsOptional()
    title: string;

    @IsString({ message: 'Description must be a string' })
    @MaxLength(300, { message: 'Description must be less than 300 characters' })
    @MinLength(1, { message: 'Description is required' })
    @IsOptional()
    description: string;

    @IsEnum(ProjectStatus, { message: 'Status must be a valid project status' })
    @IsOptional()
    status: ProjectStatus;

    @IsString({ message: 'Project ID must be a string' })
    @IsNotEmpty({ message: 'Project ID is required' })
    projectId: string;
}
