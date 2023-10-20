import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
    @IsEmail({}, { message: 'Email or password is incorrect' })
    @IsString({ message: 'Email or password is incorrect' })
    @IsNotEmpty({ message: 'Missing email or password' })
    email: string;

    @IsString({ message: 'Email or password is incorrect' })
    @IsNotEmpty({ message: 'Missing email or password' })
    password: string;
}
