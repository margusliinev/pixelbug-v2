import { useState } from 'react';
import NavMobileMenu from './NavMobileMenu';
import NavLinks from './NavLinks';
import NavLogo from './NavLogo';
import NavMobileLinks from './NavMobileLinks';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className='fixed top-0 h-16 w-full bg-white border-b border-border grid place-items-center z-30'>
            <div className='w-screen-90 max-w-6xl flex items-center justify-between'>
                <NavLogo />
                <NavLinks />
                <NavMobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <NavMobileLinks isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </div>
        </nav>
    );
}
