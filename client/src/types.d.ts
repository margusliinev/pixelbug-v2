import { ProjectStatus, TicketStatus, Priority, TicketType } from '@prisma/client';

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
    id: string;
    name: string;
    startDate: Date;
    dueDate: Date;
    status: ProjectStatus;
    isArchived: boolean;
    lead: {
        photo?: string;
        name: string;
    };
}

interface TicketWithProject extends Ticket {
    id: string;
    title: string;
    type: TicketType;
    priority: Priority;
    status: TicketStatus;
    createdAt: Date;
    projectTitle: string;
    reporter: {
        name: string;
        photo: string | null;
    };
    assignee: {
        name: string;
        photo: string | null;
    };
}
