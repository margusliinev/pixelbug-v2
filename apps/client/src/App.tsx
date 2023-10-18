import { useEffect, useState } from 'react';
import { Button, Input, Label } from './components/ui';

function App() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        fetch('/api/v1')
            .then((res) => res.text())
            .then(setGreeting)
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className='grid h-screen w-screen place-items-center'>
            <form className='grid w-full max-w-md gap-3 rounded-md border bg-white p-6 shadow-sm'>
                <h1 className='my-4 text-center text-lg font-medium tracking-tight'>{greeting}</h1>
                <fieldset>
                    <Label htmlFor='username'>Username</Label>
                    <Input type='text' name='username' id='username'></Input>
                </fieldset>
                <fieldset>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' id='email'></Input>
                </fieldset>
                <fieldset>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' name='password' id='password'></Input>
                </fieldset>
                <Button type='submit'>Submit</Button>
            </form>
        </main>
    );
}

export default App;
