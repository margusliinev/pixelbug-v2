import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';

export default function PricingFAQ() {
    return (
        <section className='z-10 mx-auto w-screen-90 max-w-screen-xl px-2.5 py-12 md:px-20'>
            <div className='px-6sm:rounded-3xl relative isolate overflow-hidden rounded-2xl border bg-background bg-slate-50 shadow-sm sm:px-10 xl:px-24'>
                <div className='mx-auto max-w-7xl px-6 py-24 sm:py-20 lg:px-8 lg:py-24'>
                    <div className='mx-auto max-w-4xl divide-y divide-white/10'>
                        <h2 className='mb-16 text-4xl font-semibold lg:text-5xl'>Frequently asked questions</h2>
                        <Accordion type='single' collapsible>
                            <AccordionItem value='item-1' className='py-2'>
                                <AccordionTrigger className='text-lg'>Can I use PixelBug for free?</AccordionTrigger>
                                <AccordionContent className='text-base text-secondary-foreground'>
                                    Yes, you can use PixelBug for free. We offer a free plan for up to 6 person teams. If you have a bigger team or
                                    need extra features, you can upgrade to a paid plan.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value='item-2' className='py-2'>
                                <AccordionTrigger className='text-lg'>What if I need help?</AccordionTrigger>
                                <AccordionContent className='text-base text-secondary-foreground'>
                                    If you're stuck with anything, don't hesitate to get in touch with us. You can always reach us at
                                    support@pixelbug.com, we'll glady help you out!
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
                                    Yes, you can cancel your subscription at any time. If you cancel your subscription, you will still be able to use
                                    PixelBugs pro features until the end of your billing period.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
