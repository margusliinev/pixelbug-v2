import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from '@remix-run/react';
import styles from './index.css';

export const meta: MetaFunction = () => {
    return [
        { title: 'PixelBug | Project Management & Bug Tracking Software' },
        {
            name: 'description',
            content:
                'PixelBug is your ultimate companion for bug-free software development. Track and analyze bugs at every stage of your project with robust tracking and comprehensive management tools. Deliver flawless experiences to your users.',
        },
        {
            name: 'keywords',
            content:
                'PixelBug, bug-free software development, bug tracking, bug analysis, software glitches, project management, flawless experiences',
        },
        { name: 'author', content: 'PixelBug' },
    ];
};

export const links: LinksFunction = () => [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'stylesheet', href: styles },
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
    const error = useRouteError();
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body>
                <h1>
                    {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : 'Unknown Error'}
                </h1>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <html>
            <head>
                <title>PixelBug | {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : '500 Internal Server Error'}</title>
                <Meta />
                <Links />
            </head>
            <body>
                <main className='grid place-items-center w-full h-full min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8 pattern'>
                    <div className='absolute inset-x-0 -top-40 z-10 transform-gpu overflow-hidden blur-3xl md:-top-80 opacity-40' aria-hidden='true'>
                        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%-30rem)] md:w-[72.1875rem]'></div>
                    </div>
                    <div className='text-center z-20'>
                        <p className='text-5xl font-bold text-primary'>{isRouteErrorResponse(error) ? `${error.status}` : '500'}</p>
                        <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
                            {isRouteErrorResponse(error) ? (error.status === 404 ? 'Page Not Found' : error.statusText) : 'Internal Server Error'}
                        </h1>
                        <p className='mt-6 text-base font-medium leading-7 text-neutral-600'>
                            {isRouteErrorResponse(error)
                                ? `${
                                      error.status === 404
                                          ? ' Sorry, the page you are looking for could not be found.'
                                          : error instanceof Error
                                          ? error.message
                                          : 'We encountered an error and cannot fulfill the request.'
                                  }`
                                : `We encountered an error and cannot fulfill the request.`}
                        </p>
                        <div className='mt-10 flex items-center justify-center gap-x-6'>
                            <Link
                                to={'/'}
                                className='rounded-full bg-primary px-3.5 py-2.5 text-sm font-semibold transition-colors text-white shadow-sm hover:bg-primary-hover'
                            >
                                Go back home
                            </Link>
                            <Link to='/sign-in' className='text-sm font-semibold'>
                                Sign In Page <span aria-hidden='true'>&rarr;</span>
                            </Link>
                        </div>
                    </div>
                    <div
                        className='fixed inset-x-0 top-[calc(100%-13rem)] z-10 transform-gpu overflow-hidden blur-3xl md:top-[calc(100%-30rem)] opacity-40'
                        aria-hidden='true'
                    >
                        <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%+36rem)] md:w-[72.1875rem]'></div>
                    </div>
                </main>
                <Scripts />
            </body>
        </html>
    );
}
