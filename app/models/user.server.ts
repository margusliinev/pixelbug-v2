import type { User } from '@prisma/client';
import { prisma } from '~/utils/db.server';
import bcrypt from 'bcryptjs';

export async function getUserById(id: User['id']) {
    return prisma.user.findUnique({ where: { id } });
}

export async function deleteUserById(id: User['id']) {
    return prisma.user.delete({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(username: User['username'], email: User['email'], password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

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
