import type { User as UserType } from '@prisma/client';
import { Menu, Home, Folder, Ticket, User, Users, Search, Close, ChevronUp, ChevronDown, ErrorTriangle } from '@/assets/icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { signout } from '@/features/auth/authSlice';
import { getUser } from '@/features/user/userSlice';
import { useEffect, useState } from 'react';

type UserWithoutPassword = Omit<UserType, 'password'>;

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
    const { user } = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser())
            .unwrap()
            .then((res) => {
                if (res.success) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            })
            .catch(() => {
                setIsAuth(false);
            });
    }, [dispatch]);

    if (isAuth === undefined) return null;

    if (isAuth === false) return <Navigate to='/' />;

    return (
        <main className='grid xl:grid-cols-sidebar-layout bg-[#059669] bg-opacity-5'>
            <SidebarDesktop isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <SidebarMobile isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user} />
                <div className='min-h-screen-minus-nav grid px-6 py-6 xl:px-12 xl:py-10 relative'>
                    <Outlet />
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
    user: UserWithoutPassword | null;
}) {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(false);
        navigate('/');
        void dispatch(signout());
    };

    return (
        <nav className='sticky top-0 z-40 grid h-16 w-full border-b bg-white px-6 shadow-sm xl:px-12'>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex w-full max-w-md items-center gap-4'>
                    <button
                        className='block cursor-pointer text-secondary-foreground xl:hidden'
                        aria-label='menu'
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
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
                <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
                    <DropdownMenuTrigger className='flex max-w-fit items-center gap-2 p-2'>
                        <Avatar className='rounded-full'>
                            <AvatarImage src={user?.photo ? user?.photo : undefined} />
                            <AvatarFallback className='bg-neutral-200'>
                                {user?.firstName ? user?.firstName.charAt(0).toUpperCase() : user?.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className='hidden whitespace-nowrap text-sm font-medium xs:block'>
                            {user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : `${user?.username}`}
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
                    <DropdownMenuContent className='mr-6 p-0 xs:-mr-6'>
                        <DropdownMenuItem className='m-0 block p-0' onClick={() => setOpen(false)}>
                            <Link to={'/app/account'} className='block w-full px-3 py-2 text-left font-medium hover:bg-gray-100'>
                                Your Account
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='m-0 block p-0'>
                            <form onSubmit={handleLogout}>
                                <button type='submit' className='block w-full px-3 py-2 text-left font-medium hover:bg-gray-100'>
                                    Sign out
                                </button>
                            </form>
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
        <aside className='sticky top-0 z-0 hidden h-screen w-64 border-r bg-white shadow-sm-right xl:block'>
            <div>
                <div className='flex h-16 items-center gap-2 px-6 py-4'>
                    <img src='/apple-touch-icon.png' alt='logo' className='h-10 w-10' />
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
                    aria-label='close menu'
                    className={
                        isSidebarOpen
                            ? 'absolute -right-8 top-5 text-white opacity-100 transition-opacity duration-500'
                            : 'absolute -right-8 top-5 text-white opacity-0 transition-opacity duration-500'
                    }
                >
                    <Close />
                </button>
                <div>
                    <div className='flex h-16 items-center gap-2 px-6 py-4'>
                        <img src='/apple-touch-icon.png' alt='logo' className='h-10 w-10' />
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
    const { user } = useAppSelector((store) => store.user);
    return (
        <div className='h-full px-4 py-6 xl:py-10'>
            <ul className='grid gap-4'>
                <li>
                    <NavLink
                        to='/app/dashboard'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-emerald-50 px-4 py-2 text-sm font-semibold text-primary transition-colors'
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
                        to='/app/projects'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-emerald-50 px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Folder height={6} width={6} />
                        Projects
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/app/tickets'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-emerald-50 px-4 py-2 text-sm font-semibold text-primary transition-colors'
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
                        to='/app/account'
                        className={({ isActive }) =>
                            isActive
                                ? 'relative flex cursor-pointer items-center gap-3 rounded-md bg-emerald-50 px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'relative flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <User />
                        Account
                        {user?.createdAt === user?.updatedAt && (
                            <span className='absolute right-14 bottom-2 animate-bounce'>
                                <ErrorTriangle />
                            </span>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/app/users'
                        className={({ isActive }) =>
                            isActive
                                ? 'flex cursor-pointer items-center gap-3 rounded-md bg-emerald-50 px-4 py-2 text-sm font-semibold text-primary transition-colors'
                                : 'flex cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition-colors'
                        }
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Users height={6} width={6} />
                        Users
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
