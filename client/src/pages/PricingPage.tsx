import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import MissingFeature from '@/components/pricing/MissingFeature';
import AddedFeature from '@/components/pricing/AddedFeature';

export default function PricingPage() {
    return (
        <>
            <header className='z-10 mx-auto mb-10 mt-32 w-screen-90 text-center sm:max-w-lg'>
                <h1 className='text-6xl font-bold tracking-tight sm:text-7xl'>Pricing</h1>
                <p className='mt-5 text-secondary-foreground sm:text-lg'>We have you covered, no matter the size of your team.</p>
            </header>
            <section className='z-10 mx-auto mb-8 w-screen-90 max-w-screen-xl px-2.5 text-center md:px-20 '>
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
                                className='inline-flex w-full items-center justify-center gap-1 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-gray-300'
                                to='/sign-up'
                            >
                                Sign up
                                <span aria-hidden='true' className='font-semibold'>
                                    &rarr;
                                </span>
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
                                className='inline-flex w-full items-center justify-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover'
                            >
                                Get Started
                                <span aria-hidden='true' className='font-semibold'>
                                    &rarr;
                                </span>
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
                                className='inline-flex w-full items-center justify-center gap-1 rounded-full bg-zinc-200 px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-gray-300'
                            >
                                Available soon
                                <span aria-hidden='true' className='font-semibold'>
                                    &rarr;
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='z-10 mx-auto w-screen-90 max-w-screen-xl px-2.5 py-12 md:px-20'>
                <div className='px-6sm:rounded-3xl relative isolate overflow-hidden rounded-2xl border bg-background bg-slate-50 shadow-sm sm:px-10 xl:px-24'>
                    <div className='mx-auto max-w-7xl px-6 py-24 sm:py-20 lg:px-8 lg:py-24'>
                        <div className='mx-auto max-w-4xl divide-y divide-white/10'>
                            <h2 className='mb-16 text-4xl font-semibold lg:text-5xl'>Frequently asked questions</h2>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1' className='py-2'>
                                    <AccordionTrigger className='text-lg'>Can I use PixelBug for free?</AccordionTrigger>
                                    <AccordionContent className='text-base text-secondary-foreground'>
                                        Yes, you can use PixelBug for free. We offer a free plan for up to 6 person teams. If you have a bigger team
                                        or need extra features, you can upgrade to a paid plan.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-2' className='py-2'>
                                    <AccordionTrigger className='text-lg'>What if I need help?</AccordionTrigger>
                                    <AccordionContent className='text-base text-secondary-foreground'>
                                        If you&apos;re stuck with anything, don&apos;t hesitate to get in touch with us. You can always reach us at
                                        support@pixelbug.com, we&apos;ll glady help you out!
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-3' className='py-2'>
                                    <AccordionTrigger className='text-lg'>How do you handle payments?</AccordionTrigger>
                                    <AccordionContent className='text-base text-secondary-foreground'>
                                        We use Stripe to handle our payments, which means you can use any credit or debit card to pay for your
                                        subscription.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-4' className='py-2'>
                                    <AccordionTrigger className='text-lg'>Can I cancel my subscription at any time?</AccordionTrigger>
                                    <AccordionContent className='text-base text-secondary-foreground'>
                                        Yes, you can cancel your subscription at any time. If you cancel your subscription, you will still be able to
                                        use PixelBugs pro features until the end of your billing period.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
