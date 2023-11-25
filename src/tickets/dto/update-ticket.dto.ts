import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketType, Priority, TicketStatus } from '@prisma/client';

export class UpdateTicketDto {
    @IsString({ message: 'Title must be a string' })
    @IsOptional()
    title: string;

    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description: string;

    @IsEnum(TicketType, { message: 'Type must be a valid ticket type' })
    @IsOptional()
    type: TicketType;

    @IsEnum(Priority, { message: 'Priority must be a valid ticket priority' })
    @IsOptional()
    priority: Priority;

    @IsEnum(TicketStatus, { message: 'Status must be a valid ticket status' })
    @IsOptional()
    status: TicketStatus;

    @IsString({ message: 'Assignee must be a string' })
    @IsOptional()
    assigneeId: string;

    @IsString({ message: 'Ticket ID must be a string' })
    @IsNotEmpty({ message: 'Ticket ID is required' })
    ticketId: string;
}
