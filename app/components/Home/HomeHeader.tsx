import { Link } from '@remix-run/react';

export default function HomeHeader() {
    const currentDate = new Date(Date.now()).toDateString().split(' ').slice(1, 3).join(' ');
    return (
        <header className='mx-auto max-w-4xl pb-32 pt-20 z-20 text-center w-screen-90'>
            <div className='flex mb-6 justify-center'>
                <div className='relative rounded-full px-6 py-2 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 font-semibold bg-white'>
                    {currentDate}: We are now in open beta!
                </div>
            </div>
            <h1 className='text-4xl xs:text-5xl md:text-6xl font-bold tracking-tight lg:text-7xl mb-2'>
                Experiences Perfected
                <br />
                Bugs Rejected!
            </h1>
            <p className='text-md md:text-lg leading-8 text-gray-600 max-w-2xl mx-auto mt-6'>
                PixelBug is your ultimate companion for bug-free software development. With its robust tracking and comprehensive management tools,
                PixelBug helps you track and analyze bugs at every stage of your project.
            </p>
            <div className='mt-6 md:mt-10 flex items-center justify-center gap-x-6'>
                <Link
                    to='/register'
                    className='bg-primary text-primary-foreground text-sm md:text-base font-medium py-2.5 px-6 rounded-full hover:bg-primary-hover transition-colors'
                >
                    Get Started
                </Link>
                <Link to={'/login'} className='text-sm font-semibold group flex items-center gap-1'>
                    <span>Want to demo?</span>
                    <span aria-hidden='true' className='group-hover:text-primary transition-colors'>
                        →
                    </span>
                </Link>
            </div>
        </header>
    );
}
