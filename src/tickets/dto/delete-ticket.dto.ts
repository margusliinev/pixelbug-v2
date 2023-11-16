import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTicketDto {
    @IsString({ message: 'Ticket ID must be a string' })
    @IsNotEmpty({ message: 'Ticket ID is required' })
    ticketId: string;
}
