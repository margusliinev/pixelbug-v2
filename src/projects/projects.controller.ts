import { Controller, Post, Body, Req, Get, Delete, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';
import { ArchiveProjectDto } from './dto/archive-project.dto';
import { AuthenticatedRequest } from 'src/types';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    async getProjects() {
        const { allProjects } = await this.projectsService.getProjects();
        return { success: true, message: 'Projects retrieved', data: allProjects };
    }

    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto, @Req() req: AuthenticatedRequest) {
        const { newProject } = await this.projectsService.createProject(createProjectDto, req.user.id);
        return { success: true, message: 'Project created', data: newProject };
    }

    @Patch()
    async archiveProject(@Body() archiveProjectDto: ArchiveProjectDto, @Req() req: AuthenticatedRequest) {
        const { archivedProject } = await this.projectsService.archiveProject(archiveProjectDto.projectId, req.user.id);
        return { success: true, message: 'Project updated', data: archivedProject };
    }

    @Delete()
    deleteProject(@Body() deleteProjectDto: DeleteProjectDto, @Req() req: AuthenticatedRequest) {
        return this.projectsService.deleteProject(deleteProjectDto.projectId, req.user.id);
    }
}
