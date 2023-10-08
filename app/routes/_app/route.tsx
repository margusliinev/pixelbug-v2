import type { LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { requireUserId } from '~/utils/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    if (!userId) {
        throw redirect('/sign-in');
    }
    return json({ userId });
}

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { userId } = useLoaderData<typeof loader>();

    if (!userId) {
        throw redirect('/sign-in');
    }

    return (
        <main className='lg:grid-cols-sidebar-layout grid'>
            <SidebarDesktop />
            <SidebarMobile />
            <div>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export function Navbar({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <nav className='sticky top-0 z-20 grid h-16 w-full border-b bg-white shadow-sm'>
            <div className='flex items-center justify-between gap-4 px-6 xs:px-8 lg:px-12 xl:px-16'>
                <div className='flex w-full max-w-md items-center gap-4'>
                    <NavbarMobileMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    <div className='h-6 w-px bg-neutral-300 lg:hidden'></div>
                    <input type='text' />
                </div>
                <button>User Button</button>
            </div>
        </nav>
    );
}

export function NavbarMobileMenu({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <button className='block cursor-pointer text-gray-600 lg:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='h-6 w-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
        </button>
    );
}

export function SidebarDesktop() {
    return <aside></aside>;
}

export function SidebarMobile() {
    return <aside></aside>;
}
