import { ProjectStatus } from '@prisma/client';
import { IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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

    @IsISO8601({ strict: true, strictSeparator: true }, { message: 'Start date must be a date' })
    @IsOptional()
    startDate: Date;

    @IsISO8601({ strict: true, strictSeparator: true }, { message: 'Due date must be a date' })
    @IsOptional()
    dueDate: Date;

    @IsString({ message: 'Project ID must be a string' })
    @IsNotEmpty({ message: 'Project ID is required' })
    projectId: string;
}
