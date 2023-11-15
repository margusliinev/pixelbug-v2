import { Controller, Post, Body, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AuthenticatedRequest } from 'src/types';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    async createTicket(@Body() createTicketDto: CreateTicketDto, @Req() req: AuthenticatedRequest) {
        const { ticket } = await this.ticketsService.createTicket(createTicketDto, req.user.id);
        return { success: true, message: 'Ticket created', data: ticket };
    }
}
