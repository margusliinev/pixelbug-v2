import { prisma } from '@/utils/db.server';
import users from './users.json';
import bcrypt from 'bcryptjs';

async function seed() {
    await prisma.user.deleteMany({ where: {} });
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: hashedPassword,
                firstName: user.firstName,
                lastName: user.lastName,
                jobTitle: user.jobTitle,
                photo: user.photo,
            },
        });
    }
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
