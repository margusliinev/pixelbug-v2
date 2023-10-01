import { useState, useEffect, useRef } from 'react';
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { Label, Input, Button } from '~/components/ui';
import Logo from '../../../public/apple-touch-icon.png';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Sign Up' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    return json({ success: true, message: 'Account created successfully', field: '' });
};

export default function SignUpForm() {
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const actionData = useActionData<typeof action>();
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (actionData?.field === 'username') {
            setIsUsernameError(true);
            usernameRef.current?.focus();
        } else if (actionData?.field === 'email') {
            setIsEmailError(true);
            emailRef.current?.focus();
        } else if (actionData?.field === 'password') {
            setIsPasswordError(true);
            passwordRef.current?.focus();
        }
    }, [actionData]);

    return (
        <div className='z-10 mb-32 mt-20 w-screen-90 max-w-md rounded-lg border bg-white px-6 py-8 shadow-sm'>
            <div className='place-items-cente grid place-items-center text-center'>
                <img src={Logo} alt='logo' className='mb-3 w-12' />
                <h1 className='mb-1 text-2xl font-semibold'>Create an account</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>And lets get you started with your free trial</p>
            </div>
            <Form className='grid gap-4' method='POST' noValidate>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='username' className='mb-2'>
                        Username
                    </Label>
                    <Input
                        id='username'
                        name='username'
                        type='text'
                        aria-invalid={actionData?.field === 'username' && isUsernameError ? true : undefined}
                        aria-describedby='username-error'
                        ref={usernameRef}
                        onChange={() => setIsUsernameError(false)}
                    />
                    {actionData?.field === 'username' && isUsernameError ? (
                        <p className='pt-1 text-sm text-destructive' id='username-error'>
                            Username must be at least 3 characters long
                        </p>
                    ) : null}
                </fieldset>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='email' className='mb-2'>
                        Email
                    </Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        aria-invalid={actionData?.field === 'email' && isEmailError ? true : undefined}
                        aria-describedby='email-error'
                        ref={emailRef}
                        onChange={() => setIsEmailError(false)}
                    />
                    {actionData?.field === 'email' && isEmailError ? (
                        <p className='pt-1 text-sm text-destructive' id='email-error'>
                            Email is already in use
                        </p>
                    ) : null}
                </fieldset>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='password' className='mb-2'>
                        Password
                    </Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        aria-invalid={actionData?.field === 'password' && isPasswordError ? true : undefined}
                        aria-describedby='password-error'
                        ref={passwordRef}
                        onChange={() => setIsPasswordError(false)}
                    />
                    {actionData?.field === 'password' && isPasswordError ? (
                        <p className='pt-1 text-sm text-destructive' id='password-error'>
                            Password must contain at least 1 number
                        </p>
                    ) : null}
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-4 mt-2'>
                    Sign Up
                </Button>
            </Form>
            <div className='flex justify-center gap-2 text-sm sm:text-base'>
                <p>Already have an account?</p>
                <Link to='/sign-in' className='font-medium text-primary'>
                    Sign In
                </Link>
            </div>
        </div>
    );
}
