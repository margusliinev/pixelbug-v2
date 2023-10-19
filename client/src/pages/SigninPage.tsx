import { Button, Input, Label } from '@/components/ui';
import { Link } from 'react-router-dom';

export default function SigninPage() {
    return (
        <div className='z-10 mb-36 mt-24 w-screen-90 max-w-md rounded-lg border bg-white px-6 py-8 shadow-sm'>
            <div className='place-items-cente grid place-items-center text-center'>
                <img src='apple-touch-icon.png' alt='logo' className='mb-3 w-12' />
                <h1 className='mb-1 text-2xl font-semibold'>Welcome back!</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>Please enter your credentials to sign in!</p>
            </div>
            <form className='grid gap-4' noValidate>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='email' className='mb-2'>
                        Email
                    </Label>
                    <Input id='email' name='email' type='email' />
                </fieldset>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='password' className='mb-2'>
                        Password
                    </Label>
                    <Input id='password' name='password' type='password' />
                </fieldset>
                <Button type='submit' size={'sm'} className='mt-2'>
                    Sign In
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
