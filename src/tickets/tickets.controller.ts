import { Controller, Post, Body, Req, Get, Patch, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AuthenticatedRequest } from 'src/types';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { DeleteTicketDto } from './dto/delete-ticket.dto';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Get()
    async getTickets() {
        const { allTickets } = await this.ticketsService.getTickets();
        return { success: true, message: 'Tickets retrieved', data: allTickets };
    }

    @Post()
    async createTicket(@Body() createTicketDto: CreateTicketDto, @Req() req: AuthenticatedRequest) {
        const { newTicket } = await this.ticketsService.createTicket(createTicketDto, req.user.id);
        return { success: true, message: 'Ticket created', data: newTicket };
    }

    @Patch()
    async assignTicket(@Body() assignTicketDto: AssignTicketDto, @Req() req: AuthenticatedRequest) {
        const { assignedTicket } = await this.ticketsService.assignTicket(assignTicketDto.ticketId, req.user.id);
        return { success: true, message: 'Ticket assigned', data: assignedTicket };
    }

    @Delete()
    async deleteTicket(@Body() deleteTicketDto: DeleteTicketDto, @Req() req: AuthenticatedRequest) {
        const { ticketId } = await this.ticketsService.deleteTicket(deleteTicketDto.ticketId, req.user.id);
        return { success: true, message: 'Ticket deleted', data: ticketId };
    }
}
