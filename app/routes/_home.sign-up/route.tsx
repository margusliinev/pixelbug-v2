import type { MetaFunction } from '@remix-run/node';
import SignUpForm from './SignUpForm';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Sign Up' }];
};

export default function SignUp() {
    return <SignUpForm />;
}
