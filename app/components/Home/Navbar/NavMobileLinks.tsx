import { Link } from '@remix-run/react';

type Props = {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export default function NavMobileLinks({ isMenuOpen, setIsMenuOpen }: Props) {
    return (
        <div className={isMenuOpen ? 'fixed mt-16 inset-0 bg-white z-50 w-full p-8 transition-all sm:hidden' : 'hidden'}>
            <ul className='grid gap-4'>
                <li className='py-6 border-b border-gray-300'>
                    <Link
                        to='/sign-up'
                        className='text-md font-semibold text-primary flex items-center gap-2'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        Get Started
                        <span aria-hidden='true' className='text-xl'>
                            &rarr;
                        </span>
                    </Link>
                </li>
                <li className='py-6 border-b border-gray-300'>
                    <Link to={'/sign-in'} className='text-md font-semibold' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        Sign In
                    </Link>
                </li>
                <li className='py-6 border-b border-gray-300'>
                    <Link to={'/pricing'} className='text-md font-semibold' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        Pricing
                    </Link>
                </li>
            </ul>
        </div>
    );
}
