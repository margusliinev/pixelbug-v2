import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTicketDto {
    @IsString({ message: 'Ticket must be a string' })
    @IsNotEmpty({ message: 'Ticket is required' })
    ticketId: string;
}
