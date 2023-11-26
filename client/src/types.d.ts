import { ProjectStatus, TicketStatus, Priority, TicketType, Comment } from '@prisma/client';

type DefaultAPIResponse = {
    success: boolean;
    message: string;
};

type DefaultAPIError = {
    success: boolean;
    message: string;
    status: number;
    fields: {
        [key: string]: string;
    } | null;
};

interface ProjectWithLead {
    id: string;
    title: string;
    avatar: string;
    name: string;
    startDate: Date;
    dueDate: Date;
    status: ProjectStatus;
    isArchived: boolean;
    lead: {
        id: string;
        photo?: string;
        name: string;
    };
}

interface TicketWithProject extends Ticket {
    id: string;
    title: string;
    description: string;
    type: TicketType;
    priority: Priority;
    status: TicketStatus;
    createdAt: Date;
    resolvedAt: Date | null;
    projectTitle: string;
    reporter: {
        id: string;
        name: string;
        photo: string | null;
    };
    assignee: {
        id: string;
        name: string;
        photo: string | null;
    };
}

interface CommentWithUser extends Comment {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        photo: string;
    };
}
