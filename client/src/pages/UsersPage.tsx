import { getUsers } from '@/features/users/usersSlice';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { useEffect } from 'react';
import { Users } from '@/assets/icons';
import PageSpinner from '@/components/spinners/PageSpinner';
import UserCard from '@/components/users/UserCard';

export default function UsersPage() {
    const { isLoading, users } = useAppSelector((store) => store.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (users.length > 0) return;
        void dispatch(getUsers());
    }, [dispatch, users.length]);

    if (isLoading && users.length < 1) {
        return <PageSpinner />;
    }

    if (users.length < 1) {
        return (
            <div className='grid place-items-center w-full text-center'>
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
                    return <UserCard key={user.id} user={user} />;
                })}
            </div>
        </section>
    );
}
