import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) {}

    async getDashboardData() {
        const projects = await this.prisma.project.findMany({
            select: {
                title: true,
                tickets: {
                    select: {
                        priority: true,
                    },
                },
            },
        });
        const usersCount = await this.prisma.user.count();

        const barChartData = projects
            .map((project) => {
                return {
                    title: project.title,
                    tickets: project.tickets.length,
                };
            })
            .sort((a, b) => b.tickets - a.tickets);

        const tickets = projects.map((project) => project.tickets).flat();
        const donutChartData = tickets.reduce(
            (acc, cur) => {
                switch (cur.priority) {
                    case 'LOW':
                        acc.low += 1;
                        break;
                    case 'MEDIUM':
                        acc.medium += 1;
                        break;
                    case 'HIGH':
                        acc.high += 1;
                        break;
                    case 'CRITICAL':
                        acc.critical += 1;
                        break;
                    default:
                        break;
                }
                return acc;
            },
            {
                low: 0,
                medium: 0,
                high: 0,
                critical: 0,
            },
        );

        const dashboardData = {
            barChartData: barChartData,
            donutChartData: donutChartData,
            projects: projects.length,
            tickets: projects.map((project) => project.tickets).flat().length,
            users: usersCount,
        };

        return { dashboardData };
    }
}
