import { Outlet } from '@remix-run/react';
import HomeNavbar from '~/components/Home/HomeNavbar';

export default function Home() {
    return (
        <main className='w-full h-full min-h-screen pattern grid place-items-center'>
            <div className='absolute inset-x-0 -top-40 z-10 transform-gpu overflow-hidden blur-3xl md:-top-80 opacity-40' aria-hidden='true'>
                <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%-30rem)] md:w-[72.1875rem]'></div>
            </div>
            <HomeNavbar />
            <Outlet />
            <div
                className='fixed inset-x-0 top-[calc(100%-13rem)] z-10 transform-gpu overflow-hidden blur-3xl md:top-[calc(100%-30rem)] opacity-40'
                aria-hidden='true'
            >
                <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%+36rem)] md:w-[72.1875rem]'></div>
            </div>
        </main>
    );
}
