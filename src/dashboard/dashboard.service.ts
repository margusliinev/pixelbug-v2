import { Injectable, NotFoundException } from '@nestjs/common';
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

        if (!projects) {
            throw new NotFoundException({ success: false, message: 'Projects not found', status: 404, fields: null });
        }

        const usersCount = await this.prisma.user.count();

        if (!usersCount || usersCount === 0) {
            throw new NotFoundException({ success: false, message: 'Users not found', status: 404, fields: null });
        }

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
                        if (acc[0]) {
                            acc[0].tickets += 1;
                        }
                        break;
                    case 'MEDIUM':
                        if (acc[1]) {
                            acc[1].tickets += 1;
                        }
                        break;
                    case 'HIGH':
                        if (acc[2]) {
                            acc[2].tickets += 1;
                        }
                        break;
                    case 'CRITICAL':
                        if (acc[3]) {
                            acc[3].tickets += 1;
                        }
                        break;
                    default:
                        break;
                }
                return acc;
            },
            [
                { title: 'Low', tickets: 0 },
                { title: 'Medium', tickets: 0 },
                { title: 'High', tickets: 0 },
                { title: 'Critical', tickets: 0 },
            ],
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
