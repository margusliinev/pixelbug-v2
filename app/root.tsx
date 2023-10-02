import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from '@remix-run/react';
import styles from './index.css';

export const meta: MetaFunction = () => {
    return [
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
    { rel: 'preload', href: styles, as: 'style' },
    { rel: 'stylesheet', href: styles },
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body>
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
            <head lang='en'>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <title>PixelBug | {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : '500 Internal Server Error'}</title>
                <Meta />
                <Links />
            </head>
            <body>
                <main className='pattern grid h-full min-h-screen w-full place-items-center bg-white'>
                    <div className='absolute inset-x-0 -top-40 z-0 transform-gpu overflow-hidden opacity-40 blur-3xl md:-top-80' aria-hidden='true'>
                        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%-30rem)] md:w-[72.1875rem]'></div>
                    </div>
                    <div className='z-10 w-screen-90 text-center'>
                        <p className='text-5xl font-bold text-primary'>{isRouteErrorResponse(error) ? `${error.status}` : '500'}</p>
                        <h1 className='mt-4 text-4xl font-bold tracking-tight xxs:text-5xl'>
                            {isRouteErrorResponse(error) ? (error.status === 404 ? 'Page Not Found' : error.statusText) : 'Internal Server Error'}
                        </h1>
                        <p className='mt-6 text-lg font-medium leading-7 text-neutral-600'>
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
                        <div className='mt-8 flex items-center justify-center gap-x-6'>
                            <Link
                                to={'/'}
                                className='rounded-full bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover'
                            >
                                Go back home
                            </Link>
                            <Link to='/sign-in' className='text-sm font-semibold'>
                                Sign In Page <span aria-hidden='true'>&rarr;</span>
                            </Link>
                        </div>
                    </div>
                    <div
                        className='fixed inset-x-0 top-[calc(100%-13rem)] z-0 transform-gpu overflow-hidden opacity-40 blur-3xl md:top-[calc(100%-30rem)]'
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
