import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
    @IsString({ message: 'Ticket ID must be a string' })
    @IsNotEmpty({ message: 'Ticket ID is required' })
    ticketId: string;

    @MaxLength(100, { message: 'Comment must be less than 100 characters' })
    @IsString({ message: 'Comment must be a string' })
    @IsNotEmpty({ message: 'Comment is required' })
    content: string;
}
