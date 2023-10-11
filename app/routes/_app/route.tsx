import type { LoaderFunctionArgs } from '@remix-run/node';
import type { User as UserType } from '@prisma/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Menu, Home, Folder, Ticket, User, Users, Search, Close, ChevronUp, ChevronDown } from '~/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Form, Link, NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { getUser } from '~/utils/auth.server';
import { useState } from 'react';
import Logo from '../../../public/apple-touch-icon.png';

type UserWithoutPassword = Omit<UserType, 'password'>;

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await getUser(request);

    if (!user) {
        throw redirect('/sign-in');
    }

    return json({ user });
}

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useLoaderData<typeof loader>();
    return (
        <main className='grid xl:grid-cols-sidebar-layout'>
            <SidebarDesktop isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <SidebarMobile isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user as unknown as UserWithoutPassword} />
                <div>
                    <Outlet context={user} />
                </div>
            </div>
        </main>
    );
}

export function Navbar({
    isSidebarOpen,
    setIsSidebarOpen,
    user,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserWithoutPassword;
}) {
    const [open, setOpen] = useState(false);

    return (
        <nav className='sticky top-0 z-40 grid h-16 w-full border-b bg-white px-6 shadow-sm xl:px-12'>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex w-full max-w-md items-center gap-4'>
                    <button className='block cursor-pointer text-gray-600 xl:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <Menu />
                    </button>
                    <div className='h-6 w-px bg-neutral-300 xl:hidden'></div>
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
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger className='flex max-w-fit items-center gap-2'>
                        <Avatar className='rounded-full'>
                            <AvatarImage src={user.photo ? user.photo : undefined} />
                            <AvatarFallback className='bg-neutral-200'>
                                {user.firstName ? user.firstName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className='hidden whitespace-nowrap text-sm font-medium xs:block'>
                            {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : `${user.username}`}
                        </span>
                        {open ? (
                            <span className='hidden xs:block'>
                                <ChevronUp />
                            </span>
                        ) : (
                            <span className='hidden xs:block'>
                                <ChevronDown />
                            </span>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-6 mt-2 xs:mr-0'>
                        <DropdownMenuItem onClick={() => setOpen(false)}>
                            <Link to={'/account'}>Your Account</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Form method='POST' action='/signout'>
                                <button className='' onClick={() => setOpen(false)}>
                                    Sign out
                                </button>
                            </Form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
        <aside className='shadow-sm-right sticky top-0 z-0 hidden h-screen w-64 border-r xl:block'>
            <div>
                <div className='flex h-16 items-center gap-2 px-6 py-4'>
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
                        ? 'fixed z-50 h-screen w-screen bg-gray-900/80 transition-opacity duration-700 xl:hidden'
                        : 'fixed -z-50 -ml-96 h-screen w-screen opacity-0 transition-opacity duration-700 xl:hidden'
                }
            ></div>
            <aside
                className={
                    isSidebarOpen
                        ? 'fixed inset-0 z-50 ml-0 min-h-screen w-64 bg-white transition-all duration-500 xl:hidden'
                        : 'fixed inset-0 z-50 -ml-96 min-h-screen w-64 bg-white transition-all duration-500 xl:hidden'
                }
            >
                <button
                    type='button'
                    onClick={() => setIsSidebarOpen(false)}
                    className={
                        isSidebarOpen
                            ? 'absolute -right-8 top-7 text-white opacity-100 transition-opacity duration-500'
                            : 'absolute -right-8 top-7 text-white opacity-0 transition-opacity duration-500'
                    }
                >
                    <Close />
                </button>
                <div>
                    <div className='flex h-16 items-center gap-2 px-6 py-4'>
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
                        prefetch='intent'
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
                        prefetch='intent'
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
                        prefetch='intent'
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
                        prefetch='intent'
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
                        prefetch='intent'
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