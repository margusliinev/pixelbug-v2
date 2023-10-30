import { useState, useEffect, useRef } from 'react';
import { Button, Input, Label, useToast } from '@/components/ui';
import { useAppDispatch } from '@/hooks';
import { signin } from '@/features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { DefaultAPIError } from '@/types';
import ButtonSpinner from '@/components/ButtonSpinner';

export default function SigninPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isDemoLoading, setIsDemoLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [allError, setAllError] = useState('');
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isAllError, setIsAllError] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        setIsLoading(true);
        setIsAllError(false);
        setIsEmailError(false);
        setIsPasswordError(false);
        dispatch(signin({ email, password }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    navigate('/app/dashboard');
                    toast({
                        title: 'Welcome back!',
                        variant: 'default',
                    });
                }
            })
            .catch((error: DefaultAPIError) => {
                if (error.fields?.all) {
                    setIsAllError(true);
                    setAllError(error.fields.all);
                } else if (error.fields?.email) {
                    setIsEmailError(true);
                    setEmailError(error.fields.email);
                } else if (error.fields?.password) {
                    setIsPasswordError(true);
                    setPasswordError(error.fields.password);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleTestUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDemoLoading(true);
        dispatch(signin({ email: 'johndoe@gmail.com', password: 'johndoe123' }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    navigate('/app/dashboard');
                    toast({
                        title: 'Welcome to PixelBug!',
                        variant: 'default',
                    });
                }
            })
            .catch(() => {
                toast({
                    title: 'Demo user login failed',
                    variant: 'destructive',
                });
            })
            .finally(() => {
                setIsDemoLoading(false);
            });
    };

    useEffect(() => {
        if (isAllError) {
            emailRef.current?.focus();
        } else if (isEmailError) {
            emailRef.current?.focus();
        } else if (isPasswordError) {
            passwordRef.current?.focus();
        }
    }, [isEmailError, isPasswordError, isAllError]);

    return (
        <div className='z-10 mb-36 mt-24 w-screen-90 max-w-md rounded-lg border bg-white px-6 py-8 shadow-sm'>
            <div className='place-items-cente grid place-items-center text-center'>
                <img src='apple-touch-icon.png' alt='logo' className='mb-3 w-12' />
                <h1 className='mb-1 text-2xl font-semibold'>Welcome back!</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>Please enter your credentials to sign in!</p>
            </div>
            <form className='grid gap-4' onSubmit={handleSubmit} noValidate>
                <fieldset className='space-y-1' disabled={isLoading}>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        ref={emailRef}
                        aria-invalid={emailError ? true : allError ? true : undefined}
                        aria-describedby='email-error'
                        onChange={() => {
                            setEmailError('');
                            setAllError('');
                        }}
                    ></Input>
                    {emailError ? (
                        <p className='pt-1 text-sm text-destructive' id='email-error'>
                            {emailError}
                        </p>
                    ) : null}
                    {allError ? (
                        <p className='pt-1 text-sm text-destructive' id='email-password-error'>
                            {allError}
                        </p>
                    ) : null}
                </fieldset>
                <fieldset className='space-y-1' disabled={isLoading}>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        ref={passwordRef}
                        aria-invalid={passwordError ? true : allError ? true : undefined}
                        aria-describedby='password-error'
                        onChange={() => {
                            setPasswordError('');
                            setAllError('');
                        }}
                    ></Input>
                    {passwordError ? (
                        <p className='pt-1 text-sm text-destructive' id='password-error'>
                            {passwordError}
                        </p>
                    ) : null}
                </fieldset>
                <Button type='submit' size={'sm'} className='mt-2' aria-label='Sign in' disabled={isLoading}>
                    {isLoading ? <ButtonSpinner /> : 'Sign In'}
                </Button>
                <div className='flex justify-center gap-2 text-sm sm:text-base'>
                    <p>Don&apos;t have an account?</p>
                    <Link to='/sign-up' className='font-medium text-primary'>
                        Sign up
                    </Link>
                </div>
            </form>
            <form onSubmit={handleTestUserSubmit} noValidate>
                <div className='mt-6 flex items-center justify-between gap-4 text-center'>
                    <div className='h-[2px] w-full bg-gray-200'></div>
                    <p className='whitespace-nowrap tracking-tight text-gray-500'>Want to try the app?</p>
                    <div className='h-[2px] w-full bg-gray-200'></div>
                </div>
                <div className='mt-4 grid place-items-center'>
                    <Button
                        type='submit'
                        size={'sm'}
                        className='w-28 bg-neutral-500 hover:bg-neutral-600'
                        aria-label='Demo app'
                        disabled={isDemoLoading}
                    >
                        {isDemoLoading ? <ButtonSpinner /> : 'Demo app'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
