import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { ChevronUp, ChevronDown } from '@/assets/icons';
import { Link, useNavigate } from 'react-router-dom';
import { signout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/hooks';
import { useState } from 'react';
import { User } from '@prisma/client';
import UsersRole from '../users/UsersRole';

type UserWithoutPassword = Omit<User, 'password'>;

export default function UserButton({ user }: { user: UserWithoutPassword }) {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void dispatch(signout());
        setOpen(false);
        navigate('/');
    };
    return (
        <div className='flex items-center gap-4'>
            <span className='hidden md:block'>
                <UsersRole role={user.role} />
            </span>
            <div className='h-6 w-px bg-neutral-300 hidden md:block'></div>
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
    );
}
