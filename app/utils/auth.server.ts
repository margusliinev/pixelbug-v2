import type { Session } from '@prisma/client';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getUserBySessionId } from '@/models/session.server';
import { getUserById } from '@/models/user.server';
import invariant from 'tiny-invariant';
import bcrypt from 'bcryptjs';

const SESSION_SECRET = process.env.SESSION_SECRET;
invariant(SESSION_SECRET, 'SESSION_SECRET environment variable must be set');

export const authSessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secrets: [SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production',
    },
});

export async function getUserId(request: Request) {
    const cookie = request.headers.get('cookie');
    const session = await authSessionStorage.getSession(cookie);

    const sessionId = session.get('sessionId');
    if (!sessionId) return null;

    const user = await getUserBySessionId(sessionId);

    if (!user) {
        throw redirect('/', {
            headers: {
                'set-cookie': await authSessionStorage.destroySession(session),
            },
        });
    }

    return user.id;
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

export async function setCookieSessionAndRedirect(request: Request, session: Session, redirectTo: string) {
    const cookie = request.headers.get('cookie');
    const authSession = await authSessionStorage.getSession(cookie);
    authSession.set('sessionId', session.id);

    return redirect(redirectTo, {
        headers: {
            'set-cookie': await authSessionStorage.commitSession(authSession, {
                expires: session.expirationDate,
            }),
        },
    });
}

export async function signout(request: Request) {
    const cookie = request.headers.get('cookie');
    const session = await authSessionStorage.getSession(cookie);

    return redirect('/', {
        headers: {
            'Set-Cookie': await authSessionStorage.destroySession(session),
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
