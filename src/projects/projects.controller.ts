import { Controller, Post, Body, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthenticatedRequest } from 'src/types';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    async createProject(@Req() req: AuthenticatedRequest, @Body() createProjectDto: CreateProjectDto) {
        const { project } = await this.projectsService.createProject(req.user.id, createProjectDto);
        return { success: true, message: 'Project successfully created', data: project };
    }
}
