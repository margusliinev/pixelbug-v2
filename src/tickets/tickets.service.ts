import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
    constructor(private readonly prisma: PrismaService) {}

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
        });

        if (!ticket) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create ticket', status: 500, fields: null });
        }

        return { ticket };
    }
}
