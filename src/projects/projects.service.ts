import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project, User } from '@prisma/client';

interface ProjectData extends Project {
    lead: User | null;
}

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

    private mapProjectToResponse(project: ProjectData) {
        return {
            id: project.id,
            title: project.title,
            description: project.description,
            avatar: project.avatar,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            startDate: project.startDate,
            dueDate: project.dueDate,
            endDate: project.endDate,
            status: project.status,
            isArchived: project.isArchived,
            lead: {
                id: project?.lead?.id,
                photo: project?.lead?.photo,
                name: project?.lead
                    ? project?.lead?.firstName && project?.lead?.lastName
                        ? `${project.lead.firstName} ${project.lead.lastName}`
                        : project.lead.username
                    : 'Deleted User',
            },
        };
    }

    async getProjects() {
        const projects = await this.prisma.project.findMany({
            include: { lead: true },
        });

        if (!projects) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to fetch projects', status: 500, fields: null });
        }

        const allProjects = projects.map((project) => this.mapProjectToResponse(project));

        return { allProjects };
    }

    async createProject(createProjectDto: CreateProjectDto, userId: string) {
        const startDate = new Date(createProjectDto.startDate);
        const dueDate = new Date(createProjectDto.dueDate);

        const project = await this.prisma.project.create({
            data: { ...createProjectDto, startDate: startDate, dueDate: dueDate, leadId: userId },
            include: { lead: true },
        });

        if (!project) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create project', status: 500, fields: null });
        }

        const newProject = this.mapProjectToResponse(project);

        return { newProject };
    }

    async archiveProject(projectId: string, userId: string) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
            include: { lead: true },
        });

        if (!project) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to archive project', status: 500, fields: null });
        }

        if (project.leadId !== userId) {
            throw new ForbiddenException({ success: false, message: 'Forbidden', status: 403, fields: null });
        }

        const updatedProject = await this.prisma.project.update({
            where: { id: projectId },
            data: { isArchived: true },
            include: { lead: true },
        });

        if (!updatedProject) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to archive project', status: 500, fields: null });
        }

        const archivedProject = this.mapProjectToResponse(updatedProject);

        return { archivedProject };
    }
    async updateProject(updateProjectDto: UpdateProjectDto, userId: string) {
        const { projectId, title, description, status } = updateProjectDto;

        const project = await this.prisma.project.findUnique({ where: { id: projectId }, include: { lead: true } });
        if (!project) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Failed to update ticket, ticket not found',
                status: 500,
                fields: null,
            });
        }

        if (project.leadId !== userId) {
            throw new ForbiddenException({
                success: false,
                message: 'Only project lead can update the project',
                status: 403,
                fields: null,
            });
        }

        const updateProject = await this.prisma.project.update({
            where: { id: projectId },
            data: {
                title: title,
                description: description,
                status: status,
                endDate: status === 'COMPLETED' ? new Date() : null,
            },
            include: {
                lead: true,
            },
        });

        if (!updateProject) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to update ticket', status: 500, fields: null });
        }

        const updatedProject = this.mapProjectToResponse(updateProject);

        return { updatedProject };
    }

    async deleteProject(projectId: string, userId: string) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
            select: {
                id: true,
                leadId: true,
            },
        });

        if (!project) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to delete project', status: 500, fields: null });
        }

        if (project.leadId !== userId) {
            throw new ForbiddenException({ success: false, message: 'Only project lead can delete the project', status: 403, fields: null });
        }

        try {
            await this.prisma.project.delete({ where: { id: projectId } });
        } catch (error) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to delete project', status: 500, fields: null });
        }

        return { projectId };
    }
}
