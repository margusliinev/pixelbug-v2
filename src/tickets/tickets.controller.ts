import { Controller, Post, Body, Req, Get, Patch, Delete, Put } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { DeleteTicketDto } from './dto/delete-ticket.dto';
import { AuthenticatedRequest } from 'src/types';

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

    @Put()
    async updateTicket(@Body() updateTicketDto: UpdateTicketDto, @Req() req: AuthenticatedRequest) {
        const { updatedTicket } = await this.ticketsService.updateTicket(updateTicketDto, req.user.id);
        return { success: true, message: 'Ticket updated', data: updatedTicket };
    }

    @Delete()
    async deleteTicket(@Body() deleteTicketDto: DeleteTicketDto, @Req() req: AuthenticatedRequest) {
        const { ticketId } = await this.ticketsService.deleteTicket(deleteTicketDto.ticketId, req.user.id);
        return { success: true, message: 'Ticket deleted', data: ticketId };
    }
}
