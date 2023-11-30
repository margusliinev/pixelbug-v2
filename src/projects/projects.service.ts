import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project, User } from '@prisma/client';

interface ProjectWithLead extends Project {
    lead: User | null;
}

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

    private mapProjectToResponse(project: ProjectWithLead) {
        return {
            id: project.id,
            title: project.title,
            avatar: project.avatar,
            startDate: project.startDate,
            dueDate: project.dueDate,
            status: project.status,
            isArchived: project.isArchived,
            lead: {
                id: project?.lead?.id ? project.lead.id : null,
                photo: project?.lead?.photo ? project.lead.photo : null,
                name: project?.lead
                    ? project?.lead?.firstName && project?.lead?.lastName
                        ? `${project.lead.firstName} ${project.lead.lastName}`
                        : project.lead.username
                    : 'Deleted User',
            },
        };
    }

    async getSingleProject(projectId: string) {
        const data = await this.prisma.project.findUnique({
            include: {
                lead: true,
                tickets: true,
            },
            where: { id: projectId },
        });

        if (!data) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to fetch project', status: 500, fields: null });
        }

        const project = {
            id: data.id,
            title: data.title,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            startDate: data.startDate,
            dueDate: data.dueDate,
            endDate: data.endDate,
            avatar: data.avatar,
            isArchived: data.isArchived,
            status: data.status,
            lead: {
                id: data?.lead?.id ? data.lead.id : null,
                photo: data?.lead?.photo ? data.lead.photo : null,
                name: data?.lead
                    ? data?.lead?.firstName && data?.lead?.lastName
                        ? `${data.lead.firstName} ${data.lead.lastName}`
                        : data.lead.username
                    : 'Deleted User',
            },
            tickets: data.tickets,
        };

        return { project };
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
            throw new ForbiddenException({ success: false, message: 'Forbidden', status: 403, fields: null });
        }

        try {
            await this.prisma.project.delete({ where: { id: projectId } });
        } catch (error) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to delete project', status: 500, fields: null });
        }

        return { projectId };
    }
}
