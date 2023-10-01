import AddedFeature from './AddedFeature';
import MissingFeature from './MissingFeature';
import ArrowRight from '~/components/icons/ArrowRight';
import { Button } from '~/components/ui';
import { Link } from '@remix-run/react';

export default function PricingOptions() {
    return (
        <section className='z-20 mx-auto mb-8 w-screen-90 max-w-screen-xl px-2.5 text-center md:px-20 '>
            <div className='grid grid-cols-1 gap-10 pt-12 lg:grid-cols-3 '>
                <div className='relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white shadow-lg'>
                    <div className='p-5'>
                        <h3 className='font-display my-3 text-center text-3xl font-bold'>Free</h3>
                        <p className='text-secondary-foreground'>For individuals and small teams.</p>
                        <p className='font-display my-5 text-6xl font-semibold'>$0</p>
                        <p className='text-secondary-foreground'>per user</p>
                    </div>
                    <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                        <p className='text-secondary-foreground'>Maximum of 6 active users</p>
                    </div>
                    <ul className='my-10 space-y-5 px-8 text-left'>
                        <AddedFeature text='Up to 10 project boards' />
                        <AddedFeature text='Reporting and insights' />
                        <AddedFeature text='5 GB of storage' />
                        <AddedFeature text='User roles & permissions' />
                        <AddedFeature text='Community support' />
                        <MissingFeature text='Audit logs' />
                        <MissingFeature text='Project archiving' />
                        <MissingFeature text='Admin Insights' />
                        <MissingFeature text='Capacity management' />
                    </ul>
                    <div className='border-t border-gray-200'></div>
                    <div className='align-self-end p-5'>
                        <Link
                            className='inline-flex w-full items-center justify-center rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-gray-300'
                            to='/sign-up'
                        >
                            Sign up <ArrowRight />
                        </Link>
                    </div>
                </div>
                <div className='relative flex flex-col justify-between rounded-2xl border-2 border-green-600 bg-white shadow-lg shadow-green-200'>
                    <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-sm font-medium text-white'>
                        Popular
                    </div>
                    <div className='p-5'>
                        <h3 className='font-display my-3 text-center text-3xl font-bold'>Pro</h3>
                        <p className='text-secondary-foreground'>For larger teams with higher needs.</p>
                        <p className='font-display my-5 text-6xl font-semibold'>$7</p>
                        <p className='text-secondary-foreground'>per user</p>
                    </div>
                    <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                        <p className='text-secondary-foreground'>Maximum of 30 active users</p>
                    </div>
                    <ul className='my-10 space-y-5 px-8 text-left'>
                        <AddedFeature text='Unlimited project boards' />
                        <AddedFeature text='Reporting and insights' />
                        <AddedFeature text='250 GB of storage' />
                        <AddedFeature text='User roles & permissions' />
                        <AddedFeature text='Business hour support' />
                        <AddedFeature text='Audit logs' />
                        <AddedFeature text='Project archiving' />
                        <MissingFeature text='Admin Insights' />
                        <MissingFeature text='Capacity management' />
                    </ul>
                    <div className='border-t border-gray-200'></div>
                    <div className='align-self-end p-5'>
                        <Link
                            to={'/sign-up'}
                            className='inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover'
                        >
                            Get Started <ArrowRight />
                        </Link>
                    </div>
                </div>
                <div className='relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white shadow-lg'>
                    <div className='p-5'>
                        <h3 className='font-display my-3 text-center text-3xl font-bold'>Business</h3>
                        <p className='text-secondary-foreground'>For businesses and organizations.</p>
                        <p className='font-display my-5 text-6xl font-semibold'>$19</p>
                        <p className='text-secondary-foreground'>per user</p>
                    </div>
                    <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                        <p className='text-secondary-foreground'>Unlimited active users</p>
                    </div>
                    <ul className='my-10 space-y-5 px-8 text-left'>
                        <AddedFeature text='Unlimited project boards' />
                        <AddedFeature text='Reporting and insights' />
                        <AddedFeature text='Unlimited storage' />
                        <AddedFeature text='User roles & permissions' />
                        <AddedFeature text='Priority support' />
                        <AddedFeature text='Audit logs' />
                        <AddedFeature text='Project archiving' />
                        <AddedFeature text='Admin Insights' />
                        <AddedFeature text='Capacity management' />
                    </ul>
                    <div className='border-t border-gray-200'></div>
                    <div className='p-5'>
                        <Button
                            disabled={true}
                            aria-disabled={true}
                            className='inline-flex w-full items-center justify-center rounded-full bg-zinc-200 px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-gray-300'
                        >
                            Available soon <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
