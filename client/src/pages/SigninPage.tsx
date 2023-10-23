import { useState, useEffect, useRef } from 'react';
import { Button, Input, Label } from '@/components/ui';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { resetError, signin } from '@/features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import ButtonSpinner from '@/components/ButtonSpinner';

export default function SigninPage() {
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isAllError, setIsAllError] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { signinState } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        dispatch(signin({ email, password }))
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
        if (signinState.error?.fields?.all) {
            setIsAllError(true);
            emailRef.current?.focus();
        } else if (signinState.error?.fields?.email) {
            setIsEmailError(true);
            emailRef.current?.focus();
        } else if (signinState.error?.fields?.password) {
            setIsPasswordError(true);
            passwordRef.current?.focus();
        } else {
            setIsAllError(false);
        }
    }, [signinState.error?.fields?.all, signinState.error?.fields?.email, signinState.error?.fields?.password]);

    return (
        <div className='z-10 mb-36 mt-24 w-screen-90 max-w-md rounded-lg border bg-white px-6 py-8 shadow-sm'>
            <div className='place-items-cente grid place-items-center text-center'>
                <img src='apple-touch-icon.png' alt='logo' className='mb-3 w-12' />
                <h1 className='mb-1 text-2xl font-semibold'>Welcome back!</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>Please enter your credentials to sign in!</p>
            </div>
            <form className='grid gap-4' onSubmit={handleSubmit} noValidate>
                <fieldset className='grid gap-1' disabled={signinState.isLoading}>
                    <Label htmlFor='email' className='mb-2'>
                        Email
                    </Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        ref={emailRef}
                        aria-invalid={isEmailError ? true : isAllError ? true : undefined}
                        aria-describedby='email-error'
                        onChange={() => {
                            setIsEmailError(false);
                            setIsAllError(false);
                        }}
                    ></Input>
                    {isEmailError ? (
                        <p className='pt-1 text-sm text-destructive' id='email-error'>
                            {signinState.error?.fields?.email}
                        </p>
                    ) : null}
                    {isAllError ? (
                        <p className='pt-1 text-sm text-destructive' id='email-password-error'>
                            {signinState.error?.fields?.all}
                        </p>
                    ) : null}
                </fieldset>
                <fieldset className='grid gap-1' disabled={signinState.isLoading}>
                    <Label htmlFor='password' className='mb-2'>
                        Password
                    </Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        ref={passwordRef}
                        aria-invalid={isPasswordError ? true : isAllError ? true : undefined}
                        aria-describedby='password-error'
                        onChange={() => {
                            setIsPasswordError(false);
                            setIsAllError(false);
                        }}
                    ></Input>
                    {isPasswordError ? (
                        <p className='pt-1 text-sm text-destructive' id='password-error'>
                            {signinState.error?.fields?.password}
                        </p>
                    ) : null}
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-4 mt-2' aria-label='Sign in' disabled={signinState.isLoading}>
                    {signinState.isLoading ? <ButtonSpinner /> : 'Sign In'}
                </Button>
                <div className='flex justify-center gap-2 text-sm sm:text-base'>
                    <p>Don&apos;t have an account?</p>
                    <Link to='/sign-up' className='font-medium text-primary'>
                        Sign up
                    </Link>
                </div>
            </form>
            <form noValidate>
                <div className='mt-6 flex items-center justify-between gap-4 text-center'>
                    <div className='h-[2px] w-full bg-gray-200'></div>
                    <p className='whitespace-nowrap tracking-tight text-gray-500'>Want to try the app?</p>
                    <div className='h-[2px] w-full bg-gray-200'></div>
                </div>
                <div className='mt-4 grid place-items-center'>
                    <Button type='submit' size={'sm'} className='w-28 bg-neutral-500 hover:bg-neutral-600'>
                        Demo app
                    </Button>
                </div>
            </form>
        </div>
    );
}
