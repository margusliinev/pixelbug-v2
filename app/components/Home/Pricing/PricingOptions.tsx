import AddedFeature from '~/components/Home/Pricing/AddedFeature';
import MissingFeature from '~/components/Home/Pricing/MissingFeature';
import ArrowRight from '~/components/icons/ArrowRight';
import { Button } from '~/components/ui';
import { Link } from '@remix-run/react';

export default function PricingOptions() {
    return (
        <section className='mx-auto w-screen-90 max-w-screen-xl px-2.5 md:px-20 mb-8 text-center z-20 '>
            <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-3 '>
                <div className='relative rounded-2xl bg-white border border-gray-200 shadow-lg flex flex-col justify-between'>
                    <div className='p-5'>
                        <h3 className='my-3 text-center font-display text-3xl font-bold'>Free</h3>
                        <p className='text-gray-500'>For individuals and small teams.</p>
                        <p className='my-5 font-display text-6xl font-semibold'>$0</p>
                        <p className='text-gray-500'>per user</p>
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
                    <div className='p-5 align-self-end'>
                        <Link
                            className='inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-gray-200 hover:bg-gray-300 text-secondary-foreground py-2 px-4 w-full'
                            to='/sign-up'
                        >
                            Sign up <ArrowRight />
                        </Link>
                    </div>
                </div>
                <div className='relative rounded-2xl bg-white border-2 border-green-600 shadow-green-200 shadow-lg flex flex-col justify-between'>
                    <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-sm font-medium text-white'>
                        Popular
                    </div>
                    <div className='p-5'>
                        <h3 className='my-3 text-center font-display text-3xl font-bold'>Pro</h3>
                        <p className='text-gray-500'>For larger teams with higher needs.</p>
                        <p className='my-5 font-display text-6xl font-semibold'>$7</p>
                        <p className='text-gray-500'>per user</p>
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
                    <div className='p-5 align-self-end'>
                        <Link
                            to={'/sign-up'}
                            className='inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary-hover py-2 px-4 w-full'
                        >
                            Get Started <ArrowRight />
                        </Link>
                    </div>
                </div>
                <div className='relative rounded-2xl bg-white border border-gray-200 shadow-lg flex flex-col justify-between'>
                    <div className='p-5'>
                        <h3 className='my-3 text-center font-display text-3xl font-bold'>Business</h3>
                        <p className='text-gray-500'>For businesses and organizations.</p>
                        <p className='my-5 font-display text-6xl font-semibold'>$19</p>
                        <p className='text-gray-500'>per user</p>
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
                            className='inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-zinc-200 text-secondary-foreground hover:bg-gray-300 py-2 px-4 w-full'
                        >
                            Available soon <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
