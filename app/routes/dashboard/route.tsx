import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUserId } from '~/utils/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    if (!userId) {
        throw redirect('/sign-in');
    }
    return json({ userId });
}

export default function Dashboard() {
    const { userId } = useLoaderData<typeof loader>();
    return <h1>User ID: {userId}</h1>;
}
