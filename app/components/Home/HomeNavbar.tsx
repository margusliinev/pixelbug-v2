import { Link } from '@remix-run/react';

export default function HomeNavbar() {
    return (
        <nav className='fixed top-0 h-16 w-full bg-white border-b border-border grid place-items-center z-30'>
            <div className='w-screen-90 max-w-7xl flex items-center justify-between'>
                <Link to={'/'} className='text-3xl font-bold text-emerald-700'>
                    PixelBug
                </Link>
                <div className='flex items-center gap-10'>
                    <Link to={'/pricing'} className='text-sm font-medium'>
                        Pricing
                    </Link>
                    <Link to={'/login'} className='text-sm font-medium -mr-1'>
                        Login
                    </Link>
                    <Link
                        to='/register'
                        className='flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary-hover transition-colors'
                    >
                        Register
                        <span aria-hidden='true' className='font-semibold'>
                            &rarr;
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
