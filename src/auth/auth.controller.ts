import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        const { user } = await this.authService.signup(signupDto);
        return { success: true, data: user };
    }

    @Post('signin')
    async signin(@Body() signinDto: SigninDto) {
        const { user } = await this.authService.signin(signinDto);
        return { success: true, data: user };
    }

    @Post('signout')
    signout() {
        return 'This action signs out the user';
    }
}
