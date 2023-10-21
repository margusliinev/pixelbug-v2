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

    private exclude(user: User, key: keyof User) {
        delete user[key];
        return user;
    }

    async signup(signupDto: SignupDto) {
        const exisitingUsername = await this.prisma.user.findUnique({ where: { username: signupDto.username.toLowerCase() } });
        if (exisitingUsername)
            throw new ConflictException({
                success: false,
                message: 'Validation failed',
                fields: { username: 'Username is already in use' },
            });

        const existingEmail = await this.prisma.user.findUnique({ where: { email: signupDto.email.toLowerCase() } });
        if (existingEmail)
            throw new ConflictException({
                success: false,
                message: 'Validation failed',
                fields: { email: 'Email is already in use' },
            });

        const hash = await bcrypt.hash(signupDto.password, 10);

        const user = await this.prisma.user.create({ data: { ...signupDto, password: hash } });
        if (!user) throw new InternalServerErrorException({ success: false, message: 'Internal Server Error', fields: null });

        this.exclude(user, 'password');

        const session = await this.createSession(user.id);

        return { user, session };
    }

    async signin(signinDto: SigninDto) {
        const user = await this.prisma.user.findUnique({ where: { email: signinDto.email.toLowerCase() } });
        if (!user) throw new UnauthorizedException({ success: false, message: 'Email or password is incorrect', fields: null });

        const passwordMatch = await bcrypt.compare(signinDto.password, user.password);
        if (!passwordMatch) throw new UnauthorizedException({ success: false, message: 'Email or password is incorrect', fields: null });

        this.exclude(user, 'password');

        const session = await this.createSession(user.id);

        return { user, session };
    }
}
