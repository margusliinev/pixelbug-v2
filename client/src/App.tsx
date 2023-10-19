import { useEffect, useState } from 'react';
import { Button, Input, Label, Textarea } from './components/ui';

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
            <div className='grid place-items-center w-screen-90'>
                <h1 className='text-2xl tracking-tight font-medium text-center mb-16'>{greeting}</h1>
                <form className='grid w-full max-w-md gap-3 rounded-md border bg-white p-6 shadow-sm'>
                    <h2 className='text-3xl font-medium text-center mb-2'>PixelBug</h2>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='username'>Username</Label>
                        <Input type='text' name='username' id='username'></Input>
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='email' name='email' id='email'></Input>
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='password'>Password</Label>
                        <Input type='password' name='password' id='password'></Input>
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='message'>Message</Label>
                        <Textarea name='message' id='message'></Textarea>
                    </fieldset>
                    <Button type='button' className='mt-2'>
                        Submit
                    </Button>
                </form>
            </div>
        </main>
    );
}

export default App;
