import { Link } from 'react-router-dom';

export default function HomePage() {
    const currentDate = new Date(Date.now()).toDateString().split(' ').slice(1, 3).join(' ');
    return (
        <header className='z-10 mx-auto mb-32 mt-20 w-screen-90 max-w-4xl text-center'>
            <div className='mb-6 flex justify-center'>
                <div className='relative rounded-full bg-white px-6 py-2 text-sm font-semibold leading-6 text-secondary-foreground ring-1 ring-gray-900/10'>
                    {currentDate}: We are now in open beta!
                </div>
            </div>
            <h1 className='mb-2 flex flex-col text-4xl font-bold tracking-tight xs:text-5xl md:text-6xl lg:text-7xl'>
                <span className='xs:mb-2'>Experiences Perfected</span>
                <span>Bugs Rejected!</span>
            </h1>
            <p className='text-md mx-auto mt-6 max-w-2xl leading-8 text-secondary-foreground md:text-lg'>
                PixelBug is your ultimate companion for bug-free software development. With its robust tracking and comprehensive management tools,
                PixelBug helps you track and analyze bugs at every stage of your project.
            </p>
            <div className='mt-6 flex items-center justify-center gap-x-6 md:mt-10'>
                <Link
                    to='/sign-up'
                    className='rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover'
                >
                    Get Started
                </Link>
                <Link to={'/sign-in'} className='group flex items-center gap-1 text-sm font-semibold'>
                    <span>Want to demo?</span>
                    <span aria-hidden='true' className='transition-colors group-hover:text-primary'>
                        &rarr;
                    </span>
                </Link>
            </div>
        </header>
    );
}
