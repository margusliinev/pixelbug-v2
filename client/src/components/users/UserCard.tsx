import { User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui';
import { Email, Phone } from '@/assets/icons';
import UsersRole from './UsersRole';

type UserWithoutPassword = Omit<User, 'password'>;

export default function UserCard({ user }: { user: UserWithoutPassword }) {
    return (
        <article className='pt-8 border bg-white rounded-lg flex flex-col items-center text-center min-w-[250px] w-full shadow-sm'>
            <Avatar className='w-32 h-32 mb-4 rounded-full'>
                <AvatarImage src={user.photo ? user.photo : undefined} />
                <AvatarFallback className='text-2xl bg-neutral-200'>
                    {user.firstName && user.lastName ? user.firstName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <h1 className='capitalize text-sm font-medium mb-2'>
                {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
            </h1>
            <h2 className='capitalize text-sm text-secondary-foreground mb-3'>{user.jobTitle ? user.jobTitle : 'developer'}</h2>
            <h3 className='mb-8'>
                <UsersRole role={user.role} />
            </h3>
            <div className='grid grid-cols-2 border-t border-neutral-200 w-full justify-self-end'>
                <div className='grid place-items-center border-r border-neutral-200'>
                    <a href={`mailto:${user.email}`} className='flex items-center p-4 text-sm gap-2 font-semibold'>
                        <Email />
                        Email
                    </a>
                </div>
                <div className='grid place-items-center'>
                    <a href={`tel:${user.phone}`} className='flex items-center p-4 text-sm gap-2 font-semibold'>
                        <Phone />
                        Call
                    </a>
                </div>
            </div>
        </article>
    );
}
