import { Link } from '@remix-run/react';

export default function NavLinks() {
    return (
        <ul className='hidden sm:flex items-center gap-12'>
            <li>
                <Link to={'/pricing'} className='text-sm font-medium'>
                    Pricing
                </Link>
            </li>
            <li>
                <Link to={'/sign-in'} className='text-sm font-medium -mr-1 whitespace-nowrap'>
                    Sign In
                </Link>
            </li>
            <li>
                <Link
                    to='/sign-up'
                    className='flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary-hover transition-colors'
                >
                    Get Started
                    <span aria-hidden='true' className='font-semibold'>
                        &rarr;
                    </span>
                </Link>
            </li>
        </ul>
    );
}
