import { ProjectStatus } from '@prisma/client';

export type DefaultAPIResponse = {
    success: boolean;
    message: string;
};

export type DefaultAPIError = {
    success: boolean;
    message: string;
    status: number;
    fields: {
        [key: string]: string;
    } | null;
};

interface ProjectWithLead {
    title: {
        text: string;
        avatar: string;
    };
    name: string;
    startDate: Date;
    dueDate: Date;
    status: ProjectStatus;
    lead: {
        photo?: string;
        name: string;
    };
}
