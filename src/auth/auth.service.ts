import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    private readonly SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

    private async createSession(userId: User['id']) {
        const session = await this.prisma.session.create({
            data: {
                expirationDate: new Date(Date.now() + this.SESSION_EXPIRATION_TIME),
                userId,
            },
        });
        return session;
    }

    async signup(signupDto: SignupDto) {
        const exisitingUsername = await this.prisma.user.findUnique({ where: { username: signupDto.username.toLowerCase() } });
        if (exisitingUsername) {
            throw new ConflictException({
                success: false,
                message: 'Conflict Error',
                status: 409,
                fields: { username: 'Username is already in use' },
            });
        }

        const existingEmail = await this.prisma.user.findUnique({ where: { email: signupDto.email.toLowerCase() } });
        if (existingEmail) {
            throw new ConflictException({
                success: false,
                message: 'Conflict Error',
                status: 409,
                fields: { email: 'Email is already in use' },
            });
        }

        const hash = await bcrypt.hash(signupDto.password, 10);

        const user = await this.prisma.user.create({
            data: { username: signupDto.username.toLowerCase(), email: signupDto.email.toLowerCase(), password: hash },
        });
        if (!user) {
            throw new InternalServerErrorException({ success: false, message: 'Internal Server Error', status: 500, fields: null });
        }

        const session = await this.createSession(user.id);

        return { session };
    }

    async signin(signinDto: SigninDto) {
        const user = await this.prisma.user.findUnique({ where: { email: signinDto.email.toLowerCase() } });
        if (!user) {
            throw new UnauthorizedException({
                success: false,
                message: 'Unauthenticated',
                status: 401,
                fields: { all: 'Email or password is incorrect' },
            });
        }

        const passwordMatch = await bcrypt.compare(signinDto.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException({
                success: false,
                message: 'Unauthenticated',
                status: 401,
                fields: { all: 'Email or password is incorrect' },
            });
        }

        const session = await this.createSession(user.id);

        return { session };
    }

    async revoke(userId: string) {
        try {
            await this.prisma.session.deleteMany({ where: { userId } });
        } catch (error) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to delete sessions', status: 500, fields: null });
        }
        return { success: true, message: 'Successfully deleted all user sessions' };
    }
}
