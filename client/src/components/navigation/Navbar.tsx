import GlobalSearch from '@/components/navigation/GlobalSearch';
import UserButton from '@/components/navigation/UserButton';
import type { User } from '@prisma/client';
import { Menu } from '@/assets/icons';

type UserWithoutPassword = Omit<User, 'password'>;

export default function Navbar({
    isSidebarOpen,
    setIsSidebarOpen,
    user,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserWithoutPassword;
}) {
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
                    <GlobalSearch />
                </div>
                <UserButton user={user} />
            </div>
        </nav>
    );
}
