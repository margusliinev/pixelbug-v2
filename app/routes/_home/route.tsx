import { useState } from 'react';
import { Link, Outlet } from '@remix-run/react';
import MenuOpen from '~/components/icons/MenuOpen';
import MenuClose from '~/components/icons/MenuClose';

type Props = {
    isMobileMenuOpen: boolean;
    setisMobileMenuOpen: (arg: boolean) => void;
};

export default function Home() {
    return (
        <main className='pattern grid h-full min-h-screen w-full place-items-center'>
            <div className='absolute inset-x-0 -top-40 z-10 transform-gpu overflow-hidden opacity-40 blur-3xl md:-top-80' aria-hidden='true'>
                <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%-30rem)] md:w-[72.1875rem]'></div>
            </div>
            <Navbar />
            <Outlet />
            <div
                className='fixed inset-x-0 top-[calc(100%-13rem)] z-10 transform-gpu overflow-hidden opacity-40 blur-3xl md:top-[calc(100%-30rem)]'
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
        <nav className='fixed top-0 z-30 grid h-16 w-full place-items-center border-b border-border bg-white'>
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
        <Link to={'/'} className='text-2xl font-bold text-emerald-700 sm:text-3xl' onClick={() => setisMobileMenuOpen(false)}>
            PixelBug
        </Link>
    );
}

export function DesktopLinks() {
    return (
        <ul className='hidden items-center gap-12 sm:flex'>
            <li>
                <Link to={'/pricing'} className='text-sm font-medium'>
                    Pricing
                </Link>
            </li>
            <li>
                <Link to={'/sign-in'} className='-mr-1 whitespace-nowrap text-sm font-medium'>
                    Sign In
                </Link>
            </li>
            <li>
                <Link
                    to='/sign-up'
                    className='flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover'
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
        <button onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)} className='block sm:hidden'>
            {isMobileMenuOpen ? <MenuOpen /> : <MenuClose />}
        </button>
    );
}

export function MobileLinks({ isMobileMenuOpen, setisMobileMenuOpen }: Props) {
    return (
        <div className={isMobileMenuOpen ? 'fixed inset-0 z-50 mt-16 w-full bg-white p-8 transition-all sm:hidden' : 'hidden'}>
            <ul className='grid gap-4'>
                <li className='border-b border-gray-300 py-6'>
                    <Link
                        to='/sign-up'
                        className='text-md flex items-center gap-2 font-semibold text-primary'
                        onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        Get Started
                        <span aria-hidden='true' className='text-xl'>
                            &rarr;
                        </span>
                    </Link>
                </li>
                <li className='border-b border-gray-300 py-6'>
                    <Link to={'/sign-in'} className='text-md font-semibold' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                        Sign In
                    </Link>
                </li>
                <li className='border-b border-gray-300 py-6'>
                    <Link to={'/pricing'} className='text-md font-semibold' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                        Pricing
                    </Link>
                </li>
            </ul>
        </div>
    );
}
