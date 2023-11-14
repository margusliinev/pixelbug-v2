import { Controller, Post, Body, Req, Get, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthenticatedRequest } from 'src/types';
import { DeleteProjectDto } from './dto/delete-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    async getProjects() {
        const { projects } = await this.projectsService.getProjects();
        return { success: true, message: 'Projects successfully retrieved', data: projects };
    }

    @Post()
    async createProject(@Req() req: AuthenticatedRequest, @Body() createProjectDto: CreateProjectDto) {
        const { project } = await this.projectsService.createProject(req.user.id, createProjectDto);
        return { success: true, message: 'Project successfully created', data: project };
    }

    @Delete()
    deleteProject(@Body() deleteProjectDto: DeleteProjectDto, @Req() req: AuthenticatedRequest) {
        return this.projectsService.deleteProject(deleteProjectDto.projectId, req.user.id);
    }
}
