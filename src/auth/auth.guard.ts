import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/types';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { Session } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService,
        private reflector: Reflector,
    ) {}

    private async getUserBySessionId(sessionId: Session['id']) {
        const session = await this.prisma.session.findUnique({
            select: { user: { select: { id: true } } },
            where: { id: sessionId, expirationDate: { gt: new Date(Date.now()) } },
        });
        return session?.user || null;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const allowUnauthorizedRequest = this.reflector.getAllAndOverride<boolean>('allowUnauthorizedRequest', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (allowUnauthorizedRequest) {
            return true;
        }
        const request: AuthenticatedRequest = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();

        const cookies = request.signedCookies as { [key: string]: string };
        const sessionId = cookies['__session'];

        if (!sessionId) throw new UnauthorizedException({ success: false, message: 'Unauthorized', status: 401, fields: null });
        const user = await this.getUserBySessionId(sessionId);

        if (!user) {
            response.clearCookie('__session');
            throw new UnauthorizedException({ success: false, message: 'Unauthorized', status: 401, fields: null });
        }

        request.user = user;

        return user.id ? true : false;
    }
}
