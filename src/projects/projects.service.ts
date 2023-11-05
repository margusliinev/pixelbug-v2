import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

    async createProject(userId: string, createProjectDto: CreateProjectDto) {
        const project = await this.prisma.project.create({
            data: { ...createProjectDto, leadId: userId },
        });
        if (!project) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to create project', status: 500, fields: null });
        }

        return { project };
    }
}
