import type { MetaFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '~/components/ui';

export const meta: MetaFunction = () => {
    return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
    return (
        <main className='w-screen h-screen grid place-items-center'>
            <Form method='POST' className='grid gap-6 w-full max-w-sm p-6 shadow-md border border-border rounded-md'>
                <h1 className='text-center text-2xl font-semibold'>Remix Form</h1>
                <div className='grid gap-3'>
                    <Label htmlFor='username'>Username</Label>
                    <Input type='text' id='username' name='username' placeholder='Username' />
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' id='email' name='email' placeholder='email' />
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' id='password' name='password' placeholder='password' />
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='job-title'>Job Title</Label>
                    <Select name='job-title'>
                        <SelectTrigger>
                            <SelectValue placeholder='Job Title' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='Full-Stack-Developer'>Full Stack Developer</SelectItem>
                            <SelectItem value='Back-End-Developer'>Back End Developer</SelectItem>
                            <SelectItem value='Front-End-Developer'>Front End Developer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor='message'>Message</Label>
                    <Textarea id='message' name='message' placeholder='Message' />
                </div>
                <Button type='submit' size={'sm'}>
                    Submit
                </Button>
            </Form>
        </main>
    );
}
