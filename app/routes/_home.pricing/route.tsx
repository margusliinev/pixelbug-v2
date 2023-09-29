import type { MetaFunction } from '@remix-run/node';
import PricingFAQ from './PricingFAQ';
import PricingHeader from './PricingHeader';
import PricingOptions from './PricingOptions';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Pricing' }];
};

export default function Pricing() {
    return (
        <>
            <PricingHeader />
            <PricingOptions />
            <PricingFAQ />
        </>
    );
}
