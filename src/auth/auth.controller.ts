import { Controller, Post, Body, Res, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';
import { Response } from 'express';

const AllowUnauthorizedRequest = () => SetMetadata('allowUnauthorizedRequest', true);

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @AllowUnauthorizedRequest()
    async signup(@Body() signupDto: SignupDto, @Res({ passthrough: true }) res: Response) {
        const { user, session } = await this.authService.signup(signupDto);
        res.cookie('__session', session.id, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            signed: true,
        });
        return { success: true, data: user };
    }

    @Post('signin')
    @AllowUnauthorizedRequest()
    async signin(@Body() signinDto: SigninDto, @Res({ passthrough: true }) res: Response) {
        const { user, session } = await this.authService.signin(signinDto);
        res.cookie('__session', session.id, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            signed: true,
        });
        return { success: true, data: user };
    }

    @Post('signout')
    @AllowUnauthorizedRequest()
    signout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('__session');
    }
}
