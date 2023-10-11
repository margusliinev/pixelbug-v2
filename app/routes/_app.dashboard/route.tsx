import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import type { User } from '@prisma/client';
import { redirect, json } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { requireUserId } from '~/utils/auth.server';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Dashboard' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);

    if (!userId) {
        throw redirect('/sign-in');
    }

    return json({ userId });
}

export default function Dashboard() {
    const { userId } = useLoaderData<typeof loader>();
    const user = useOutletContext() as User;

    if (!userId) {
        throw redirect('/sign-in');
    }

    return (
        <section className='pattern min-h-screen-minus-nav px-6 py-6 xl:px-12 xl:py-10'>
            <h1 className='mb-4 text-xl font-semibold'>User Details</h1>
            <ul>
                <li>ID: {user.id}</li>
                <li>Username: {user.username}</li>
                <li>Email: {user.email}</li>
                <li>First Name: {user.firstName ? user.firstName : 'Not set'}</li>
                <li>Last Name: {user.lastName ? user.lastName : 'Not set'}</li>
                <li>Job Title: {user.jobTitle ? user.jobTitle : 'Not set'}</li>
                <li>Photo: {user.photo ? <img src={user.photo} alt='' /> : 'No photo'}</li>
                <li>Role: {user.role}</li>
                <li>Verified: {user.isVerified ? 'Verified' : 'Not Verified'}</li>
                <li>Created At: {new Date(user.createdAt).toLocaleDateString()}</li>
                <li>Updated At: {new Date(user.updatedAt).toLocaleDateString()}</li>
            </ul>
        </section>
    );
}
