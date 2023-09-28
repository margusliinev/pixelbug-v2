import { Link } from '@remix-run/react';

type Props = {
    isMenuOpen: boolean;
    setIsMenuOpen: (arg: boolean) => void;
};

export default function NavLogo({ isMenuOpen, setIsMenuOpen }: Props) {
    return (
        <Link to={'/'} className='text-2xl sm:text-3xl font-bold text-emerald-700' onClick={() => setIsMenuOpen(false)}>
            PixelBug
        </Link>
    );
}
