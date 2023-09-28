import PricingFAQ from '~/components/Home/Pricing/PricingFAQ';
import PricingHeader from '~/components/Home/Pricing/PricingHeader';
import PricingOptions from '~/components/Home/Pricing/PricingOptions';

export default function Pricing() {
    return (
        <>
            <PricingHeader />
            <PricingOptions />
            <PricingFAQ />
        </>
    );
}
