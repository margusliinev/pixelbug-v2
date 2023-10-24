import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Label,
    Input,
    Button,
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui';
import { useAppSelector } from '@/hooks';

export default function AccountPage() {
    const { user } = useAppSelector((store) => store.user);

    return (
        <section className='pattern min-h-screen-minus-nav px-6 py-6 xl:px-12 xl:py-10'>
            <Tabs defaultValue='profile'>
                <TabsList className='grid h-full w-full max-w-[800px] grid-cols-2 gap-4 bg-transparent p-0 xs:grid-cols-4'>
                    <TabsTrigger value='profile'>Profile</TabsTrigger>
                    <TabsTrigger value='password'>Password</TabsTrigger>
                    <TabsTrigger value='security'>Security</TabsTrigger>
                    <TabsTrigger value='privacy'>Data & Privacy</TabsTrigger>
                </TabsList>
                <TabsContent value='profile' className='mt-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Make changes to your profile here. Click save when you&apos;re done.</CardDescription>
                        </CardHeader>
                        <CardContent className='max-w-2xl'>
                            <form className='grid gap-3'>
                                <div className='mb-2 grid w-full items-center gap-4 xxs:flex'>
                                    <Avatar className='h-24 w-24 rounded-md'>
                                        <AvatarImage src={user?.photo ? user?.photo : undefined} className='rounded-md' />
                                        <AvatarFallback className='rounded-md bg-neutral-200 text-2xl'>
                                            {user?.firstName ? user?.firstName.charAt(0).toUpperCase() : user?.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <fieldset className='w-full space-y-1'>
                                        <Label htmlFor='photo' className='mb-4 text-sm tracking-tight text-secondary-foreground'>
                                            JPG or PNG. 0.5 MB max.
                                        </Label>
                                        <Input type='file' name='photo' id='photo' accept='image/*' className='w-full max-w-xxs' />
                                    </fieldset>
                                </div>
                                <div className='grid gap-3 xxs:flex w-full items-center xxs:gap-4'>
                                    <fieldset className='w-full space-y-1'>
                                        <Label htmlFor='firstName'>First Name</Label>
                                        <Input id='firstName' name='firstName' defaultValue={user?.firstName ? user?.firstName : ''} />
                                    </fieldset>
                                    <fieldset className='w-full space-y-1'>
                                        <Label htmlFor='lastName'>Last Name</Label>
                                        <Input id='lastName' name='lastName' defaultValue={user?.lastName ? user?.lastName : ''} />
                                    </fieldset>
                                </div>
                                <fieldset className='space-y-1'>
                                    <Label htmlFor='username'>Username</Label>
                                    <Input id='username' name='username' defaultValue={user?.username} />
                                </fieldset>
                                <fieldset className='space-y-1'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input id='email' name='email' defaultValue={user?.email} />
                                </fieldset>
                                <fieldset className='space-y-1'>
                                    <Label htmlFor='jobTitle'>Job Title</Label>
                                    <Input id='jobTitle' name='jobTitle' defaultValue={user?.jobTitle ? user?.jobTitle : ''} />
                                </fieldset>
                                <Button type='submit' className='mt-6 w-32'>
                                    Save changes
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value='password' className='mt-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
                        </CardHeader>
                        <CardContent className='max-w-2xl'>
                            <form className='grid gap-3'>
                                <fieldset className='space-y-1'>
                                    <Label htmlFor='current'>Current password</Label>
                                    <Input type='password' id='current' name='current' />
                                </fieldset>
                                <fieldset className='space-y-1'>
                                    <Label htmlFor='new'>New password</Label>
                                    <Input type='password' id='new' name='new' />
                                </fieldset>
                                <fieldset className='space-y-1'>
                                    <Label htmlFor='confirm'>Confirm New password</Label>
                                    <Input type='password' id='confirm' name='confirm' />
                                </fieldset>
                                <Button type='submit' className='mt-6 w-36'>
                                    Save password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    );
}
