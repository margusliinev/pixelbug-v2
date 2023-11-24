import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Comment } from '@prisma/client';

interface CommentWithUser extends Comment {
    user: User | null;
}

@Injectable()
export class CommentsService {
    constructor(private readonly prisma: PrismaService) {}

    private mapComment(comment: CommentWithUser) {
        return {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            ticketId: comment.ticketId,
            userId: comment.userId,
            user: {
                id: comment?.user?.id,
                username: comment?.user?.username,
                firstName: comment?.user?.firstName,
                lastName: comment?.user?.lastName,
                photo: comment?.user?.photo,
            },
        };
    }

    async getComments(ticketId: string) {
        const comments = await this.prisma.comment.findMany({
            where: {
                ticketId: ticketId,
            },
            include: {
                user: true,
            },
            orderBy: { updatedAt: 'desc' },
        });

        if (!comments) {
            throw new NotFoundException({ success: false, message: 'No comments found', status: 404, fields: null });
        }

        const allComments = comments.map((comment) => this.mapComment(comment));

        return { allComments };
    }

    async createComment(createCommentDto: CreateCommentDto, userId: string) {
        const { ticketId, content } = createCommentDto;

        const comment = await this.prisma.comment.create({
            data: {
                content: content,
                ticketId: ticketId,
                userId: userId,
            },
            include: {
                user: true,
            },
        });

        if (!comment) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create a comment', status: 500, fields: null });
        }

        const newComment = this.mapComment(comment);

        return { newComment };
    }

    async updateComment(updateCommentDto: UpdateCommentDto, userId: string) {
        const { commentId } = updateCommentDto;

        const comment = await this.prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!comment) {
            throw new NotFoundException({ success: false, message: 'Comment not found', status: 404, fields: null });
        }

        if (comment.userId !== userId) {
            throw new ForbiddenException({ success: false, message: 'You are not authorized to update this comment', status: 403, fields: null });
        }

        const updateComment = await this.prisma.comment.update({
            data: {
                content: updateCommentDto.content,
            },
            where: {
                id: commentId,
            },
            include: {
                user: true,
            },
        });

        if (!updateComment) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to update comment', status: 500, fields: null });
        }

        const updatedComment = this.mapComment(updateComment);

        return { updatedComment };
    }

    async deleteComment(deleteCommentDto: DeleteCommentDto, userId: string) {
        const { commentId } = deleteCommentDto;

        const comment = await this.prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!comment) {
            throw new NotFoundException({ success: false, message: 'Comment not found', status: 404, fields: null });
        }

        if (comment.userId !== userId) {
            throw new ForbiddenException({ success: false, message: 'You are not authorized to delete this comment', status: 403, fields: null });
        }

        try {
            await this.prisma.comment.delete({
                where: {
                    id: commentId,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to delete comment', status: 500, fields: null });
        }

        return { commentId };
    }
}
