import { IsNotEmpty, IsString } from 'class-validator';

export class AssignTicketDto {
    @IsString({ message: 'Ticket must be a string' })
    @IsNotEmpty({ message: 'Ticket is required' })
    ticketId: string;
}
