import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    Label,
    Input,
    Button,
} from '~/components/ui';
import { redirect, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUserId } from '~/utils/auth.server';

export const meta: MetaFunction = () => {
    return [{ title: 'PixelBug | Account' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);

    if (!userId) {
        throw redirect('/sign-in');
    }

    return json({ userId });
}

export default function Account() {
    const { userId } = useLoaderData<typeof loader>();

    if (!userId) {
        throw redirect('/sign-in');
    }

    return (
        <section className='pattern min-h-screen-minus-nav px-6 py-6 xl:px-12 xl:py-10'>
            <Tabs defaultValue='profile'>
                <TabsList className='grid h-full w-full grid-cols-1 gap-4 p-0 xs:grid-cols-2 md:max-w-[800px] md:grid-cols-4'>
                    <TabsTrigger value='profile'>Profile</TabsTrigger>
                    <TabsTrigger value='password'>Password</TabsTrigger>
                    <TabsTrigger value='Security'>Security</TabsTrigger>
                    <TabsTrigger value='Danger'>Danger</TabsTrigger>
                </TabsList>
                <TabsContent value='profile'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Make changes to your profile here. Click save when you're done.</CardDescription>
                        </CardHeader>
                        <CardContent className='max-w-2xl space-y-2'>
                            <div className='flex w-full items-center gap-4'>
                                <fieldset className='w-full space-y-1'>
                                    <Label htmlFor='firstName'>First Name</Label>
                                    <Input id='firstName' />
                                </fieldset>
                                <fieldset className='w-full space-y-1'>
                                    <Label htmlFor='lastName'>Last Name</Label>
                                    <Input id='lastName' />
                                </fieldset>
                            </div>
                            <fieldset className='space-y-1'>
                                <Label htmlFor='username'>Username</Label>
                                <Input id='username' />
                            </fieldset>
                            <fieldset className='space-y-1'>
                                <Label htmlFor='email'>Email</Label>
                                <Input id='email' />
                            </fieldset>
                            <fieldset className='space-y-1'>
                                <Label htmlFor='job'>Job Title</Label>
                                <Input id='job' />
                            </fieldset>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value='password'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-2'>
                            <fieldset className='space-y-1'>
                                <Label htmlFor='current'>Current password</Label>
                                <Input id='current' type='password' />
                            </fieldset>
                            <fieldset className='space-y-1'>
                                <Label htmlFor='new'>New password</Label>
                                <Input id='new' type='password' />
                            </fieldset>
                            <fieldset className='space-y-1'>
                                <Label htmlFor='confirm'>Confirm New password</Label>
                                <Input id='confirm' type='password' />
                            </fieldset>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    );
}
