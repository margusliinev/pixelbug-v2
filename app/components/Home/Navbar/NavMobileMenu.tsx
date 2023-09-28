type Props = {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export default function NavMobileMenu({ isMenuOpen, setIsMenuOpen }: Props) {
    return (
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='block sm:hidden'>
            {isMenuOpen ? (
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-7 h-7'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
            ) : (
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-7 h-7'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                </svg>
            )}
        </button>
    );
}
