import { sessionStorage } from './session.server';
import { prisma } from './db.server';
import { redirect } from '@remix-run/node';

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

export const getSessionExpirationDate = () => new Date(Date.now() + SESSION_EXPIRATION_TIME);

export async function getUserId(request: Request) {
    const authSession = await sessionStorage.getSession(request.headers.get('Cookie'));
    const sessionId = authSession.get('userId');
    if (!sessionId) return null;

    const session = await prisma.session.findUnique({
        select: { user: { select: { id: true } } },
        where: { id: sessionId, expirationDate: { gt: new Date() } },
    });

    if (!session?.user) {
        throw redirect('/', {
            headers: {
                'set-cookie': await sessionStorage.destroySession(authSession),
            },
        });
    }

    return session.user.id;
}

export async function requireUserId(request: Request) {
    const userId = await getUserId(request);
    if (!userId) {
        throw redirect('/login');
    }
    return userId;
}
