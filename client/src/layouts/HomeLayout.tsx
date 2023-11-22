import { Link, Outlet } from 'react-router-dom';
import { Close, Menu } from '@/assets/icons';
import { useState } from 'react';

type Props = {
    isMobileMenuOpen: boolean;
    setisMobileMenuOpen: (arg: boolean) => void;
};

export default function HomeLayout() {
    return (
        <main className='pattern grid h-full min-h-screen w-full place-items-center'>
            <div className='absolute inset-x-0 -top-40 transform-gpu overflow-hidden opacity-40 blur-3xl md:-top-80' aria-hidden='true'>
                <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%-30rem)] md:w-[72.1875rem]'></div>
            </div>
            <Navbar />
            <Outlet />
            <div
                className='fixed inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden opacity-40 blur-3xl md:top-[calc(100%-30rem)]'
                aria-hidden='true'
            >
                <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%+36rem)] md:w-[72.1875rem]'></div>
            </div>
        </main>
    );
}

export function Navbar() {
    const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
    return (
        <nav className='fixed top-0 z-50 grid h-16 w-full place-items-center border-b border-border bg-white'>
            <div className='flex w-screen-90 max-w-6xl items-center justify-between'>
                <Logo isMobileMenuOpen={isMobileMenuOpen} setisMobileMenuOpen={setisMobileMenuOpen} />
                <DesktopLinks />
                <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setisMobileMenuOpen={setisMobileMenuOpen} />
                <MobileLinks isMobileMenuOpen={isMobileMenuOpen} setisMobileMenuOpen={setisMobileMenuOpen} />
            </div>
        </nav>
    );
}

export function Logo({ setisMobileMenuOpen }: Props) {
    return (
        <Link to={'/'} className='flex items-center gap-2' onClick={() => setisMobileMenuOpen(false)}>
            <img src='/apple-touch-icon.png' alt='logo' className='w-8 h-8 sm:hidden' />
            <span className='text-2xl font-bold text-emerald-700 sm:text-3xl'>PixelBug</span>
        </Link>
    );
}

export function DesktopLinks() {
    return (
        <ul className='hidden items-center sm:flex'>
            <li>
                <Link to={'/pricing'} className='px-6 py-3 text-sm font-medium'>
                    Pricing
                </Link>
            </li>
            <li>
                <Link to={'/sign-in'} className='py-3 pl-6 pr-10 text-sm font-medium'>
                    Sign In
                </Link>
            </li>
            <li>
                <Link
                    to='/sign-up'
                    className='flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover'
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

export function MobileMenu({ isMobileMenuOpen, setisMobileMenuOpen }: Props) {
    return (
        <button onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)} className='block sm:hidden' aria-label='menu'>
            {isMobileMenuOpen ? <Close /> : <Menu />}
        </button>
    );
}

export function MobileLinks({ isMobileMenuOpen, setisMobileMenuOpen }: Props) {
    return (
        <div className={isMobileMenuOpen ? 'fixed inset-0 z-50 mt-16 w-full bg-white p-8 transition-all sm:hidden' : 'hidden'}>
            <ul className='grid gap-4'>
                <li className='border-b border-gray-300'>
                    <Link
                        to='/sign-up'
                        className='text-md flex items-center gap-2 py-6 font-semibold text-primary'
                        onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        Get Started
                        <span aria-hidden='true' className='text-xl'>
                            &rarr;
                        </span>
                    </Link>
                </li>
                <li className='border-b border-gray-300'>
                    <Link to={'/sign-in'} className='text-md block py-6 font-semibold' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                        Sign In
                    </Link>
                </li>
                <li className='border-b border-gray-300'>
                    <Link to={'/pricing'} className='text-md block py-6 font-semibold' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                        Pricing
                    </Link>
                </li>
            </ul>
        </div>
    );
}
