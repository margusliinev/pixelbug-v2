import type { DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { signout } from '~/utils/auth.server';

export async function loader() {
    return redirect('/');
}

export async function action({ request }: DataFunctionArgs) {
    return signout(request);
}
