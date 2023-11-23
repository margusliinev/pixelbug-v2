import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
    constructor(private readonly prisma: PrismaService) {}

    async getComments(ticketId: string) {
        const comments = await this.prisma.comment.findMany({
            where: {
                ticketId: ticketId,
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        username: true,
                        photo: true,
                    },
                },
            },
        });

        if (!comments) {
            throw new NotFoundException({ success: false, message: 'No comments found', status: 404, fields: null });
        }

        return { comments };
    }

    async createComment(createCommentDto: CreateCommentDto, userId: string) {
        const { ticketId, content } = createCommentDto;

        const newComment = await this.prisma.comment.create({
            data: {
                content: content,
                ticketId: ticketId,
                userId: userId,
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        username: true,
                        photo: true,
                    },
                },
            },
        });

        if (!newComment) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create a comment', status: 500, fields: null });
        }

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

        const updatedComment = await this.prisma.comment.update({
            data: {
                content: updateCommentDto.content,
            },
            where: {
                id: commentId,
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        username: true,
                        photo: true,
                    },
                },
            },
        });

        if (!updatedComment) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to update comment', status: 500, fields: null });
        }

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
