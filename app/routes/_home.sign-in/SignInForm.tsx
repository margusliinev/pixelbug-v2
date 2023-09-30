import { Form } from '@remix-run/react';
import { Input, Label } from '~/components/ui';

export default function SignInForm() {
    return (
        <Form>
            <fieldset>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' type='email' />
            </fieldset>
            <fieldset>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' />
            </fieldset>
        </Form>
    );
}
