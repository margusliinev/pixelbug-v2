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
        <main className='w-full h-full min-h-screen pattern grid place-items-center'>
            <div className='absolute inset-x-0 -top-40 z-10 transform-gpu overflow-hidden blur-3xl md:-top-80 opacity-40' aria-hidden='true'>
                <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%-30rem)] md:w-[72.1875rem]'></div>
            </div>
            <Navbar />
            <Outlet />
            <div
                className='fixed inset-x-0 top-[calc(100%-13rem)] z-10 transform-gpu overflow-hidden blur-3xl md:top-[calc(100%-30rem)] opacity-40'
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
        <nav className='fixed top-0 h-16 w-full bg-white border-b border-border grid place-items-center z-30'>
            <div className='w-screen-90 max-w-6xl flex items-center justify-between'>
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
        <Link to={'/'} className='text-2xl sm:text-3xl font-bold text-emerald-700' onClick={() => setisMobileMenuOpen(false)}>
            PixelBug
        </Link>
    );
}

export function DesktopLinks() {
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

export function MobileMenu({ isMobileMenuOpen, setisMobileMenuOpen }: Props) {
    return (
        <button onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)} className='block sm:hidden'>
            {isMobileMenuOpen ? <MenuOpen /> : <MenuClose />}
        </button>
    );
}

export function MobileLinks({ isMobileMenuOpen, setisMobileMenuOpen }: Props) {
    return (
        <div className={isMobileMenuOpen ? 'fixed mt-16 inset-0 bg-white z-50 w-full p-8 transition-all sm:hidden' : 'hidden'}>
            <ul className='grid gap-4'>
                <li className='py-6 border-b border-gray-300'>
                    <Link
                        to='/sign-up'
                        className='text-md font-semibold text-primary flex items-center gap-2'
                        onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        Get Started
                        <span aria-hidden='true' className='text-xl'>
                            &rarr;
                        </span>
                    </Link>
                </li>
                <li className='py-6 border-b border-gray-300'>
                    <Link to={'/sign-in'} className='text-md font-semibold' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                        Sign In
                    </Link>
                </li>
                <li className='py-6 border-b border-gray-300'>
                    <Link to={'/pricing'} className='text-md font-semibold' onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
                        Pricing
                    </Link>
                </li>
            </ul>
        </div>
    );
}
