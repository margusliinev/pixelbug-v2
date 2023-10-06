import { prisma } from '~/utils/db.server';
import type { User } from '@prisma/client';

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
