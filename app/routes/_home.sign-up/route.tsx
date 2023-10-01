import { type MetaFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { Label, Input, Button } from '~/components/ui';
import Logo from '../../../public/apple-touch-icon.png';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Sign Up' }];
};

export default function SignUpForm() {
    return (
        <div className='z-30 w-screen-90 max-w-md rounded-lg border bg-white px-6 py-8 shadow-sm'>
            <div className='place-items-cente grid place-items-center'>
                <img src={Logo} alt='logo' className='mb-3 w-12' />
                <h1 className='mb-1 text-2xl font-semibold'>Create an account</h1>
                <p className='mb-8 text-sm text-secondary-foreground'>And lets get you started with your free trial</p>
            </div>
            <Form className='grid gap-2' method='POST'>
                <fieldset className='grid gap-1'>
                    <Label htmlFor='username' className='mb-2'>
                        Username
                    </Label>
                    <Input id='username' name='username' type='text' />
                </fieldset>
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
                <Button type='submit' size={'sm'} className='mb-4'>
                    Sign Up
                </Button>
            </Form>
            <div className='flex justify-center gap-2'>
                <p>Already have an account?</p>
                <Link to='/sign-in' className='font-medium text-primary'>
                    Sign In
                </Link>
            </div>
        </div>
    );
}
