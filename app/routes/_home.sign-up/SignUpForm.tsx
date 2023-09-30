import { Form, Link } from '@remix-run/react';
import { Label, Input, Button } from '~/components/ui';
import Logo from '../../../public/apple-touch-icon.png';

export default function SignUpForm() {
    return (
        <Form className='z-30 grid w-full max-w-md gap-4 rounded-lg border bg-white p-6 shadow-sm'>
            <div className='place-items-cente grid place-items-center'>
                <img src={Logo} alt='logo' className='mb-4 w-12' />
                <h1 className='mb-1 text-2xl font-semibold'>Create an account</h1>
                <p className='mb-4 text-sm text-gray-600'>And lets get you started with your free trial</p>
            </div>
            <fieldset className='grid gap-3'>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' name='username' type='text' />
            </fieldset>
            <fieldset className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' type='email' />
            </fieldset>
            <fieldset className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' />
            </fieldset>
            <Button type='submit' size={'sm'} className='mt-1'>
                Sign Up
            </Button>
            <div className='flex justify-center gap-2'>
                <p>Already have an account?</p>
                <Link to='/sign-in' className='font-medium text-primary'>
                    Sign In
                </Link>
            </div>
        </Form>
    );
}
