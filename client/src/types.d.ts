import { Comment, Project, Ticket } from '@prisma/client';

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

interface ProjectData extends Project {
    lead: {
        id?: string;
        photo?: string;
        name: string;
    };
}

interface TicketData extends Ticket {
    projectTitle: string;
    reporter: {
        id?: string;
        photo?: string;
        name: string;
    };
    assignee: {
        id?: string;
        photo?: string;
        name: string;
    };
}

interface CommentData extends Comment {
    user: {
        id?: string;
        photo?: string;
        name: string;
    };
}
