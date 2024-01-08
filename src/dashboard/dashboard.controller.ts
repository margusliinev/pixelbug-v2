import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    async getDashboardData() {
        const { dashboardData } = await this.dashboardService.getDashboardData();
        return { success: true, message: 'Dashboard data retrieved', data: dashboardData };
    }
}
