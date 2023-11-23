import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCommentDto {
    @IsString({ message: 'Comment ID must be a string' })
    @IsNotEmpty({ message: 'Comment ID is required' })
    commentId: string;
}
