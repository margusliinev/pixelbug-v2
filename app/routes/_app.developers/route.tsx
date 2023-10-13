import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUserId } from '@/utils/auth.server';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Developers' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);

    if (!userId) {
        throw redirect('/sign-in');
    }

    return json({ userId });
}

export default function Developers() {
    const { userId } = useLoaderData<typeof loader>();

    if (!userId) {
        throw redirect('/sign-in');
    }

    return <section className='pattern min-h-screen-minus-nav px-6 py-6 xl:px-12 xl:py-10'>Developers</section>;
}
