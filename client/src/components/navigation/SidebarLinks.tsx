import { Home, Folder, Ticket, User, Users, ErrorTriangle } from '@/assets/icons';
import { useAppSelector } from '@/hooks';
import { NavLink } from 'react-router-dom';

export default function SidebarLinks({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
                        <Ticket height={6} width={6} />
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
                        {user && user?.createdAt === user?.updatedAt && (
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
}
