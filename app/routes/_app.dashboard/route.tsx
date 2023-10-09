import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
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

    if (!userId) {
        throw redirect('/sign-in');
    }

    return <section className='pattern min-h-screen-minus-nav'>Dashboard</section>;
}
