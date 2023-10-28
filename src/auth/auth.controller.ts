import { Controller, Post, Body, Res, SetMetadata, Req, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';
import { AuthenticatedRequest } from 'src/types';
import { Response } from 'express';

const AllowUnauthorizedRequest = () => SetMetadata('allowUnauthorizedRequest', true);

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @AllowUnauthorizedRequest()
    async signup(@Body() signupDto: SignupDto, @Res({ passthrough: true }) res: Response) {
        const { session } = await this.authService.signup(signupDto);
        res.cookie('__session', session.id, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            signed: true,
        });
        return { success: true, message: 'User created successfully' };
    }

    @Post('signin')
    @AllowUnauthorizedRequest()
    async signin(@Body() signinDto: SigninDto, @Res({ passthrough: true }) res: Response) {
        const { session } = await this.authService.signin(signinDto);
        res.cookie('__session', session.id, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            signed: true,
        });
        return { success: true, message: 'User signed in successfully' };
    }

    @Post('signout')
    @AllowUnauthorizedRequest()
    signout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('__session');
    }

    @Delete('revoke')
    revoke(@Req() req: AuthenticatedRequest, @Res({ passthrough: true }) res: Response) {
        res.clearCookie('__session');
        return this.authService.revoke(req.user.id);
    }
}
