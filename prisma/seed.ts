import { PrismaClient } from '@prisma/client';
import users from './users.json';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
    await prisma.user.deleteMany();
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
                phone: user.phone,
            },
        });
    }
}

seed()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
