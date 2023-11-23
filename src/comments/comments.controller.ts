import { Controller, Post, Body, Patch, Delete, Req, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { AuthenticatedRequest } from 'src/types';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get(':id')
    async getComments(@Param('id') id: string) {
        const { comments } = await this.commentsService.getComments(id);
        return { success: true, message: 'Comments retrieved', data: comments };
    }

    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto, @Req() req: AuthenticatedRequest) {
        const { newComment } = await this.commentsService.createComment(createCommentDto, req.user.id);
        return { success: true, message: 'Comment created', data: newComment };
    }

    @Patch()
    async updateComment(@Body() updateCommentDto: UpdateCommentDto, @Req() req: AuthenticatedRequest) {
        const { updatedComment } = await this.commentsService.updateComment(updateCommentDto, req.user.id);
        return { success: true, message: 'Ticket updated', data: updatedComment };
    }

    @Delete()
    async deleteComment(@Body() deleteCommentDto: DeleteCommentDto, @Req() req: AuthenticatedRequest) {
        const { commentId } = await this.commentsService.deleteComment(deleteCommentDto, req.user.id);
        return { success: true, message: 'Comment deleted', data: commentId };
    }
}
