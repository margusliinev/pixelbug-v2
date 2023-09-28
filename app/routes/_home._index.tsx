import type { MetaFunction } from '@remix-run/node';
import Header from '~/components/Home/Header';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Project Management & Bug Tracking Software' }];
};

export default function Index() {
    return <Header />;
}
