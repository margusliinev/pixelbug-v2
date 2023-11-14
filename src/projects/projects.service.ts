import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

    async getProjects() {
        const data = await this.prisma.project.findMany({
            select: {
                id: true,
                avatar: true,
                title: true,
                startDate: true,
                dueDate: true,
                status: true,
                lead: {
                    select: {
                        username: true,
                        firstName: true,
                        lastName: true,
                        photo: true,
                    },
                },
            },
        });

        if (!data) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to fetch projects', status: 500, fields: null });
        }

        const projects = data.map((project) => {
            return {
                title: {
                    text: project.title,
                    avatar: project.avatar,
                },
                id: project.id,
                name: project.title,
                startDate: project.startDate,
                dueDate: project.dueDate,
                status: project.status,
                lead: {
                    photo: project?.lead?.photo ? project.lead.photo : undefined,
                    name: project?.lead
                        ? project.lead?.firstName && project.lead?.lastName
                            ? `${project.lead.firstName} ${project.lead.lastName}`
                            : project.lead.username
                        : 'Deleted User',
                },
            };
        });

        if (!projects) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to fetch projects', status: 500, fields: null });
        }

        return { projects };
    }

    async createProject(userId: string, createProjectDto: CreateProjectDto) {
        const startDate = new Date(createProjectDto.startDate);
        const dueDate = new Date(createProjectDto.dueDate);

        const newProject = await this.prisma.project.create({
            data: { ...createProjectDto, startDate: startDate, dueDate: dueDate, leadId: userId },
            select: {
                id: true,
                avatar: true,
                title: true,
                startDate: true,
                dueDate: true,
                status: true,
                lead: {
                    select: {
                        username: true,
                        firstName: true,
                        lastName: true,
                        photo: true,
                    },
                },
            },
        });

        if (!newProject) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create project', status: 500, fields: null });
        }

        const project = {
            title: {
                text: newProject.title,
                avatar: newProject.avatar,
            },
            id: newProject.id,
            name: newProject.title,
            startDate: newProject.startDate,
            dueDate: newProject.dueDate,
            status: newProject.status,
            lead: {
                photo: newProject?.lead?.photo ? newProject.lead.photo : undefined,
                name: newProject?.lead
                    ? newProject.lead?.firstName && newProject.lead?.lastName
                        ? `${newProject.lead.firstName} ${newProject.lead.lastName}`
                        : newProject.lead.username
                    : 'Deleted User',
            },
        };

        return { project };
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

        return { success: true, message: 'Project successfully deleted', data: projectId };
    }
}
