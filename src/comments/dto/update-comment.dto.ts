import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
    @IsString({ message: 'Comment ID must be a string' })
    @IsNotEmpty({ message: 'Comment ID is required' })
    commentId: string;

    @MaxLength(100, { message: 'Comment must be less than 100 characters' })
    @IsString({ message: 'Comment must be a string' })
    @IsNotEmpty({ message: 'Comment is required' })
    content: string;
}
