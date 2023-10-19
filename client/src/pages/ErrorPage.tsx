import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <main className='pattern grid h-full min-h-screen w-full place-items-center'>
            <div className='absolute inset-x-0 -top-40 z-0 transform-gpu overflow-hidden opacity-40 blur-3xl md:-top-80' aria-hidden='true'>
                <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#d4d4d4] opacity-30 md:left-[calc(50%-30rem)] md:w-[72.1875rem]'></div>
            </div>
            <div className='z-10 w-screen-90 text-center'>
                <p className='text-5xl font-bold text-primary'>404</p>
                <h1 className='mt-4 text-4xl font-bold tracking-tight xxs:text-5xl'>Page Not Found</h1>
                <p className='mt-6 text-lg font-medium leading-7 text-secondary-foreground'>Sorry, the page you are looking for could not be found</p>
                <div className='mt-8 flex items-center justify-center gap-x-6'>
                    <Link
                        to={'/'}
                        className='rounded-full bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover'
                    >
                        Go Back Home
                    </Link>
                    <Link to='/sign-in' className='group flex items-center gap-1 text-sm font-semibold'>
                        Sign In Page
                        <span aria-hidden='true' className='transition-colors group-hover:text-primary'>
                            &rarr;
                        </span>
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
    );
}
