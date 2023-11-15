import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketType, TicketStatus, Priority } from '@prisma/client';

export class CreateTicketDto {
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @IsEnum(TicketType, { message: 'Type must be a valid ticket type' })
    @IsNotEmpty({ message: 'Ticket type is required' })
    type: TicketType;

    @IsEnum(Priority, { message: 'Priority must be a valid ticket priority' })
    @IsNotEmpty({ message: 'Ticket priority is required' })
    priority: Priority;

    @IsEnum(TicketStatus, { message: 'Status must be a valid ticket status' })
    @IsNotEmpty({ message: 'Ticket status is required' })
    status: TicketStatus;

    @IsString({ message: 'Project ID must be a string' })
    @IsNotEmpty({ message: 'Project ID is required' })
    projectId: string;
}
