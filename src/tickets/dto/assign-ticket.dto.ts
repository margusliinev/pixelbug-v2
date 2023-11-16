import { IsNotEmpty, IsString } from 'class-validator';

export class AssignTicketDto {
    @IsString({ message: 'Ticket ID must be a string' })
    @IsNotEmpty({ message: 'Ticket ID is required' })
    ticketId: string;
}
