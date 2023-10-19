import { Button, Input, Label } from '@/components/ui';
import { Link } from 'react-router-dom';

export default function SignupPage() {
    return (
        <div className='z-10 mb-36 mt-24 w-screen-90 max-w-md rounded-lg border bg-white px-6 py-8 shadow-sm'>
            <div className='place-items-cente grid place-items-center text-center'>
                <img src='apple-touch-icon.png' alt='logo' className='mb-3 w-12' />
                <h1 className='mb-1 text-2xl font-semibold'>Create an account</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>And lets get you started with your free trial</p>
            </div>
            <form className='grid gap-4' noValidate>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='username' className='mb-2'>
                        Username
                    </Label>
                    <Input id='username' name='username' type='text'></Input>
                </fieldset>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='email' className='mb-2'>
                        Email
                    </Label>
                    <Input id='email' name='email' type='email'></Input>
                </fieldset>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='password' className='mb-2'>
                        Password
                    </Label>
                    <Input id='password' name='password' type='password'></Input>
                </fieldset>
                <Button type='submit' size={'sm'} className='mb-4 mt-2'>
                    Sign up
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
