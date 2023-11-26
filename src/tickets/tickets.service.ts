import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Ticket, Project, User } from '@prisma/client';

interface TicketWithProject extends Ticket {
    project: Project;
    reporter: User | null;
    assignee: User | null;
}

@Injectable()
export class TicketsService {
    constructor(private readonly prisma: PrismaService) {}

    private mapTicketToResponse(ticket: TicketWithProject) {
        return {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            type: ticket.type,
            priority: ticket.priority,
            status: ticket.status,
            createdAt: ticket.createdAt,
            projectTitle: ticket.project.title,
            reporter: {
                id: ticket?.reporter?.id ? ticket.reporter.id : null,
                name: ticket?.reporter
                    ? ticket?.reporter?.firstName && ticket?.reporter?.lastName
                        ? `${ticket.reporter.firstName} ${ticket.reporter.lastName}`
                        : ticket.reporter.username
                    : 'Deleted User',
                photo: ticket?.reporter?.photo ? ticket.reporter.photo : null,
            },
            assignee: {
                id: ticket?.assignee?.id ? ticket.assignee.id : null,
                name: ticket?.assignee
                    ? ticket?.assignee?.firstName && ticket?.assignee?.lastName
                        ? `${ticket.assignee.firstName} ${ticket.assignee.lastName}`
                        : ticket.assignee.username
                    : 'Unassigned',
                photo: ticket?.assignee?.photo ? ticket.assignee.photo : null,
            },
        };
    }

    async getTickets() {
        const tickets = await this.prisma.ticket.findMany({
            include: {
                project: true,
                reporter: true,
                assignee: true,
            },
        });

        if (!tickets) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to retrieve tickets', status: 500, fields: null });
        }

        const allTickets = tickets.map((ticket) => this.mapTicketToResponse(ticket));

        return { allTickets };
    }

    async createTicket(createTicketDto: CreateTicketDto, userId: string) {
        const { projectId } = createTicketDto;

        const project = await this.prisma.project.findUnique({ where: { id: projectId } });
        if (!project) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Failed to create ticket, project not found',
                status: 500,
                fields: null,
            });
        }

        const ticket = await this.prisma.ticket.create({
            data: { ...createTicketDto, reporterId: userId },
            include: {
                project: true,
                reporter: true,
                assignee: true,
            },
        });

        if (!ticket) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create ticket', status: 500, fields: null });
        }

        const newTicket = this.mapTicketToResponse(ticket);

        return { newTicket };
    }

    async assignTicket(ticketId: string, userId: string) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId }, include: { project: true } });
        if (!ticket) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Failed to assign ticket, ticket not found',
                status: 500,
                fields: null,
            });
        }

        if (ticket.assigneeId === userId) {
            throw new ForbiddenException({ success: false, message: 'Ticket is already assigned to you', status: 403, fields: null });
        }

        if (ticket.assigneeId !== null && ticket.project.leadId !== userId) {
            throw new ForbiddenException({ success: false, message: 'Ticket is already taken', status: 403, fields: null });
        }

        const updatedTicket = await this.prisma.ticket.update({
            where: { id: ticketId },
            data: { assigneeId: userId, status: ticket.status === 'UNASSIGNED' ? 'ASSIGNED' : ticket.status },
            include: {
                project: true,
                reporter: true,
                assignee: true,
            },
        });

        if (!updatedTicket) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to assign ticket', status: 500, fields: null });
        }

        const assignedTicket = this.mapTicketToResponse(updatedTicket);

        return { assignedTicket };
    }

    async updateTicket(updateTicketDto: UpdateTicketDto, userId: string) {
        const { ticketId, assigneeId, status, title, description, priority, type } = updateTicketDto;

        const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId }, include: { project: true } });
        if (!ticket) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Failed to update ticket, ticket not found',
                status: 500,
                fields: null,
            });
        }

        if (assigneeId && ticket.project.leadId !== userId) {
            throw new ForbiddenException({
                success: false,
                message: 'Only project lead can assign tickets',
                status: 403,
                fields: {
                    assigneeId: 'Only project lead can assign tickets',
                },
            });
        }

        if (status && status === 'RESOLVED' && ticket.assigneeId !== userId && ticket.project.leadId !== userId) {
            throw new ForbiddenException({
                success: false,
                message: 'Only ticket owner or lead can resolve this ticket',
                status: 403,
                fields: {
                    status: 'Not authorized to resolve this ticket',
                },
            });
        }

        if (status && status !== 'UNASSIGNED' && ticket.assigneeId === null && !assigneeId) {
            throw new ConflictException({
                success: false,
                message: 'Ticket must be assigned before changing status',
                status: 409,
                fields: {
                    status: 'Ticket must be assigned before changing status',
                },
            });
        }

        const updatedTicket = await this.prisma.ticket.update({
            where: { id: ticketId },
            data: {
                title: title,
                description: description,
                priority: priority,
                type: type,
                status: assigneeId ? 'ASSIGNED' : status,
                assigneeId: assigneeId,
                resolvedAt: status === 'RESOLVED' ? new Date() : null,
            },
            include: {
                project: true,
                reporter: true,
                assignee: true,
            },
        });

        if (!updatedTicket) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to update ticket', status: 500, fields: null });
        }

        const newTicket = this.mapTicketToResponse(updatedTicket);

        return { updatedTicket: newTicket };
    }

    async deleteTicket(ticketId: string, userId: string) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId }, include: { project: true } });
        if (!ticket) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Failed to delete ticket, ticket not found',
                status: 500,
                fields: null,
            });
        }

        if (ticket.project.leadId !== userId) {
            throw new ForbiddenException({ success: false, message: 'Forbidden', status: 403, fields: null });
        }

        try {
            await this.prisma.ticket.delete({ where: { id: ticketId } });
        } catch (error) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to delete project', status: 500, fields: null });
        }

        return { ticketId };
    }
}
