import type { Session } from '@prisma/client';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getUserById } from '~/models/user.server';
import { prisma } from './db.server';
import invariant from 'tiny-invariant';
import bcrypt from 'bcryptjs';

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET environment variable must be set');

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production',
    },
});

export async function getSession(request: Request) {
    const cookie = request.headers.get('Cookie');
    return sessionStorage.getSession(cookie);
}

export async function getUserId(request: Request) {
    const authSession = await getSession(request);
    const sessionId = authSession.get('sessionId');
    if (!sessionId) return null;

    const session = await prisma.session.findUnique({
        select: { user: { select: { id: true } } },
        where: { id: sessionId, expirationDate: { gt: new Date(Date.now()) } },
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

export async function getUser(request: Request) {
    const userId = await getUserId(request);
    if (userId === null) return null;

    const user = await getUserById(userId);

    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    throw await signout(request);
}

export async function requireUserId(request: Request) {
    const userId = await getUserId(request);
    if (!userId) {
        throw redirect('/sign-in');
    }
    return userId;
}

export async function handleSessionAndRedirect(request: Request, session: Session, redirectTo: string) {
    try {
        const authSession = await sessionStorage.getSession(request.headers.get('Cookie'));
        authSession.set('sessionId', session.id);

        return redirect(redirectTo, {
            headers: {
                'set-cookie': await sessionStorage.commitSession(authSession, {
                    expires: session.expirationDate,
                }),
            },
        });
    } catch (error) {
        throw new Error('Failed to handle the session and redirect');
    }
}

export async function signout(request: Request) {
    const session = await getSession(request);
    return redirect('/', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session),
        },
    });
}

export async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}
