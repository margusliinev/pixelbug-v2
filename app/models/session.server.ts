import type { User, Session } from '@prisma/client';
import { prisma } from '@/utils/db.server';

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

export async function createSession(userId: User['id']) {
    const session = await prisma.session.create({
        data: {
            expirationDate: new Date(Date.now() + SESSION_EXPIRATION_TIME),
            userId,
        },
    });

    return session;
}

export async function getUserBySessionId(sessionId: Session['id']) {
    const session = await prisma.session.findUnique({
        select: { user: { select: { id: true } } },
        where: { id: sessionId, expirationDate: { gt: new Date(Date.now()) } },
    });

    return session?.user || null;
}
