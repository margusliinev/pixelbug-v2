import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    async getDashboardData() {
        const { dashboardData } = await this.dashboardService.getDashboardData();
        return { success: true, message: 'Dashboard data retrieved', data: dashboardData };
    }
}
