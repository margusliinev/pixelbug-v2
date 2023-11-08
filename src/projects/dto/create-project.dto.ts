import { IsEnum, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @IsISO8601({ strict: true, strictSeparator: true }, { message: 'Start date must be a date' })
    @IsNotEmpty({ message: 'Start date is required' })
    startDate: Date;

    @IsISO8601({ strict: true, strictSeparator: true }, { message: 'Due date must be a date' })
    @IsNotEmpty({ message: 'Due date is required' })
    dueDate: Date;

    @IsString({ message: 'Avatar must be a string' })
    @IsNotEmpty({ message: 'Avatar is required' })
    avatar: string;

    @IsEnum(ProjectStatus, { message: 'Status must be a valid project status' })
    status: ProjectStatus;
}
