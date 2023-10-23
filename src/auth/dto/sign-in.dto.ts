import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
    @IsString({ message: 'Email or password is incorrect' })
    @IsNotEmpty({ message: 'Please enter your email' })
    email: string;

    @IsString({ message: 'Email or password is incorrect' })
    @IsNotEmpty({ message: 'Please enter your password' })
    password: string;
}
