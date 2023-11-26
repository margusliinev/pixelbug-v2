import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TicketType, Priority } from '@prisma/client';

export class CreateTicketDto {
    @IsString({ message: 'Title must be a string' })
    @MaxLength(100, { message: 'Title must be less than 100 characters' })
    @MinLength(1, { message: 'Description is required' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsString({ message: 'Description must be a string' })
    @MaxLength(300, { message: 'Description must be less than 300 characters' })
    @MinLength(1, { message: 'Description is required' })
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @IsEnum(TicketType, { message: 'Type must be a valid ticket type' })
    @IsNotEmpty({ message: 'Ticket type is required' })
    type: TicketType;

    @IsEnum(Priority, { message: 'Priority must be a valid ticket priority' })
    @IsNotEmpty({ message: 'Ticket priority is required' })
    priority: Priority;

    @IsString({ message: 'Project must be a string' })
    @IsNotEmpty({ message: 'Project is required' })
    projectId: string;
}
