import type { User } from '@prisma/client';
import { hashPassword } from '~/utils/auth.server';
import { prisma } from '~/utils/db.server';

export async function getUserById(id: User['id']) {
    return prisma.user.findUnique({ where: { id } });
}

export async function getUserByUsername(username: User['username']) {
    return prisma.user.findUnique({ where: { username } });
}

export async function getUserByEmail(email: User['email']) {
    return prisma.user.findUnique({ where: { email } });
}

export async function deleteUserById(id: User['id']) {
    return prisma.user.delete({ where: { id } });
}

export async function deleteUserByEmail(email: User['email']) {
    return prisma.user.delete({ where: { email } });
}

export async function createUser(username: User['username'], email: User['email'], password: string) {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
        },
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
}
