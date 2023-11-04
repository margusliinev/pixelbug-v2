import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { getUsers } from '@/features/users/usersSlice';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { useEffect } from 'react';
import { Email, Phone, Users } from '@/assets/icons';

export default function UsersPage() {
    const { users } = useAppSelector((store) => store.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getUsers());
    }, [dispatch]);

    if (!users || users.length < 1) {
        return (
            <div className='grid place-items-center w-full'>
                <div className='flex flex-col items-center gap-2'>
                    <Users height={10} width={10} />
                    <h1 className='font-semibold text-lg mb-1'>No Users Found</h1>
                    <h2 className='text-secondary-foreground text-md'>If you see this message, please take a screenshot and submit a ticket</h2>
                </div>
            </div>
        );
    }

    return (
        <section>
            <div className='grid xs:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-4 place-items-center'>
                {users.map((user) => {
                    return (
                        <article
                            key={user?.id}
                            className='pt-8 border bg-white rounded-lg flex flex-col items-center text-center min-w-[250px] w-full shadow-sm'
                        >
                            <Avatar className='w-32 h-32 mb-4 rounded-full'>
                                <AvatarImage src={user?.photo ? user?.photo : undefined} />
                                <AvatarFallback className='text-2xl bg-neutral-200'>
                                    {user?.firstName && user?.lastName
                                        ? user?.firstName.charAt(0).toUpperCase()
                                        : user?.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <h1 className='capitalize text-sm font-medium mb-2'>
                                {user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : user?.username}
                            </h1>
                            <h2 className='capitalize text-sm text-secondary-foreground mb-3'>{user?.jobTitle ? user?.jobTitle : 'developer'}</h2>
                            <h3
                                className={
                                    user?.role === 'ADMIN'
                                        ? 'capitalize text-xs mb-8 border-orange-300 border w-fit justify-self-center bg-orange-50 text-orange-600 font-medium py-1 px-2 rounded-xl'
                                        : user?.role === 'DEVELOPER'
                                        ? 'capitalize text-xs mb-8 border-emerald-300 border w-fit justify-self-center bg-emerald-50 text-emerald-600 font-medium py-1 px-2 rounded-xl'
                                        : user?.role === 'USER'
                                        ? 'capitalize text-xs mb-8 border-blue-300 border w-fit justify-self-center bg-blue-50 text-blue-600 font-medium py-1 px-2 rounded-xl'
                                        : 'capitalize text-xs mb-8 border-gray-300 border w-fit justify-self-center bg-gray-50 text-gray-600 font-medium py-1 px-2 rounded-xl'
                                }
                            >
                                {user?.role}
                            </h3>
                            <div className='grid grid-cols-2 border-t border-neutral-200 w-full justify-self-end'>
                                <div className='grid place-items-center border-r border-neutral-200'>
                                    <a href={`mailto:${user?.email}`} className='flex items-center p-4 text-sm gap-2 font-semibold'>
                                        <Email />
                                        Email
                                    </a>
                                </div>
                                <div className='grid place-items-center'>
                                    <a href={`tel:${user?.phone}`} className='flex items-center p-4 text-sm gap-2 font-semibold'>
                                        <Phone />
                                        Call
                                    </a>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
