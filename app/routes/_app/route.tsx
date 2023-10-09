import { NavLink, Outlet } from '@remix-run/react';
import { useState } from 'react';
import { Menu, Home, Folder, Ticket, User, Users, Search } from '~/components/icons';
import Logo from '../../../public/apple-touch-icon.png';

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <main className='grid lg:grid-cols-sidebar-layout'>
            <SidebarDesktop isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <SidebarMobile isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export function Navbar({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <nav className='sticky top-0 z-40 grid h-16 w-full border-b bg-white shadow-sm'>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex w-full max-w-md items-center gap-4'>
                    <button className='block cursor-pointer text-gray-600 lg:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <Menu />
                    </button>
                    <div className='h-6 w-px bg-neutral-300 lg:hidden'></div>
                    <div className='relative flex w-full gap-2 rounded-full px-3 py-2 ring-1 ring-border sm:px-2 sm:py-2'>
                        <label htmlFor='search' className='ml-1 hidden text-gray-500 xs:flex xs:items-center'>
                            <div className='grid w-4 place-items-center'>
                                <Search />
                            </div>
                        </label>
                        <div className='w-full'>
                            <input type='text' name='search' id='search' placeholder='Search' className='w-full text-sm focus:outline-none' />
                        </div>
                    </div>
                </div>
                <button className='whitespace-nowrap'>User Button</button>
            </div>
        </nav>
    );
}

export function SidebarDesktop({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <aside className='sticky top-0 z-0 hidden h-screen w-72 border-r lg:block'>
            <div className=''>
                <div className='flex h-20 items-center gap-2 px-8 py-4'>
                    <img src={Logo} alt='logo' className='h-10 w-10' />
                    <h1 className='text-xl font-semibold text-emerald-800'>PixelBug</h1>
                </div>
                <SidebarLinks isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
        </aside>
    );
}

export function SidebarMobile({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <>
            <div
                className={
                    isSidebarOpen
                        ? 'fixed z-50 h-screen w-screen bg-gray-900/80 transition-opacity duration-700 lg:hidden'
                        : 'fixed -z-50 -ml-96 h-screen w-screen opacity-0 transition-opacity duration-700 lg:hidden'
                }
            ></div>
            <aside
                className={
                    isSidebarOpen
                        ? 'fixed inset-0 z-50 ml-0 min-h-screen w-64 bg-white transition-all duration-300 sm:w-72 lg:hidden'
                        : 'fixed inset-0 z-50 -ml-96 min-h-screen w-64 bg-white transition-all duration-300 sm:w-72 lg:hidden'
                }
            >
                <button
                    type='button'
                    onClick={() => setIsSidebarOpen(false)}
                    className={
                        isSidebarOpen
                            ? 'absolute -right-8 top-7 text-white opacity-100 transition-opacity duration-300'
                            : 'absolute -right-8 top-7 text-white opacity-0 transition-opacity duration-300'
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </button>
                <div>
                    <div className='flex h-20 items-center gap-2 px-8 py-4'>
                        <img src={Logo} alt='logo' className='h-10 w-10' />
                        <h1 className='text-xl font-semibold text-emerald-800'>PixelBug</h1>
                    </div>
                    <SidebarLinks isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
            </aside>
        </>
    );
}

const SidebarLinks = ({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <div className='h-full px-4 py-8'>
            <ul className='grid gap-4'>
                <li>
                    <NavLink
                        to='/dashboard'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Home />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/projects'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Folder />
                        Projects
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/tickets'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Ticket />
                        Tickets
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/account'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <User />
                        Account
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/developers'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Users />
                        Developers
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
