import { Link } from '@remix-run/react';

export default function NavLogo() {
    return (
        <Link to={'/'} className='text-2xl sm:text-3xl font-bold text-emerald-700'>
            PixelBug
        </Link>
    );
}
