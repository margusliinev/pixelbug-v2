import { useEffect, useRef, useState } from 'react';
import { Button, Input, Label } from '@/components/ui';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { resetError, signup } from '@/features/auth/authSlice';
import ButtonSpinner from '@/components/ButtonSpinner';

export default function SignupPage() {
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { signupState } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        dispatch(signup({ username, email, password }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    navigate('/app/dashboard');
                }
            })
            .catch(() => {
                return;
            });
    };

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    useEffect(() => {
        if (signupState.error?.fields?.password) {
            setIsPasswordError(true);
            passwordRef.current?.focus();
        } else {
            setIsPasswordError(false);
        }
        if (signupState.error?.fields?.email) {
            setIsEmailError(true);
            emailRef.current?.focus();
        } else {
            setIsEmailError(false);
        }
        if (signupState.error?.fields?.username) {
            setIsUsernameError(true);
            usernameRef.current?.focus();
        } else {
            setIsUsernameError(false);
        }
    }, [dispatch, signupState.error?.fields?.email, signupState.error?.fields?.password, signupState.error?.fields?.username, navigate]);

    return (
        <div className='z-10 mb-36 mt-24 w-screen-90 max-w-md rounded-lg border bg-white px-6 py-8 shadow-sm'>
            <div className='place-items-cente grid place-items-center text-center'>
                <img src='apple-touch-icon.png' alt='logo' className='mb-3 w-12' />
                <h1 className='mb-1 text-2xl font-semibold'>Create an account</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>And lets get you started with your free trial</p>
            </div>
            <form className='grid gap-4' onSubmit={handleSubmit} noValidate>
                <fieldset className='grid gap-1' disabled={signupState.isLoading}>
                    <Label htmlFor='username' className='mb-2'>
                        Username
                    </Label>
                    <Input
                        id='username'
                        name='username'
                        type='text'
                        ref={usernameRef}
                        aria-invalid={isUsernameError ? true : undefined}
                        aria-describedby='username-error'
                        onChange={() => setIsUsernameError(false)}
                    ></Input>
                    {isUsernameError ? (
                        <p className='pt-1 text-sm text-destructive' id='username-error'>
                            {signupState.error?.fields?.username}
                        </p>
                    ) : null}
                </fieldset>
                <fieldset className='grid gap-1' disabled={signupState.isLoading}>
                    <Label htmlFor='email' className='mb-2'>
                        Email
                    </Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        ref={emailRef}
                        aria-invalid={isEmailError ? true : undefined}
                        aria-describedby='email-error'
                        onChange={() => setIsEmailError(false)}
                    ></Input>
                    {isEmailError ? (
                        <p className='pt-1 text-sm text-destructive' id='email-error'>
                            {signupState.error?.fields?.email}
                        </p>
                    ) : null}
                </fieldset>
                <fieldset className='grid gap-1' disabled={signupState.isLoading}>
                    <Label htmlFor='password' className='mb-2'>
                        Password
                    </Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        ref={passwordRef}
                        aria-invalid={isPasswordError ? true : undefined}
                        aria-describedby='password-error'
                        onChange={() => setIsPasswordError(false)}
                    ></Input>
                    {isPasswordError ? (
                        <p className='pt-1 text-sm text-destructive' id='password-error'>
                            {signupState.error?.fields?.password}
                        </p>
                    ) : null}
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-4 mt-2' aria-label='Sign up' disabled={signupState.isLoading}>
                    {signupState.isLoading ? <ButtonSpinner /> : 'Sign up'}
                </Button>
            </form>
            <div className='flex justify-center gap-2 text-sm sm:text-base'>
                <p>Already have an account?</p>
                <Link to='/sign-in' className='font-medium text-primary'>
                    Sign In
                </Link>
            </div>
        </div>
    );
}
