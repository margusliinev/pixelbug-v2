import type { MetaFunction } from '@remix-run/node';
import SignInForm from './SignInForm';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Sign In' }];
};

export default function SignIn() {
    return <SignInForm />;
}
