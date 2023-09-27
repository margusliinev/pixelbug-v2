import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
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
