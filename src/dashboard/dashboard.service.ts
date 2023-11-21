import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) {}

    async getDashboardData() {
        const userCount = await this.prisma.user.count();
        const projectCount = await this.prisma.project.count();
        const ticketCount = await this.prisma.ticket.count();

        const dashboardData = {
            projects: projectCount,
            tickets: ticketCount,
            users: userCount,
        };

        return { dashboardData };
    }
}
