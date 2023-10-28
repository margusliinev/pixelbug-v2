import { Profile, Password, Security, Privacy } from '@/components/account';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui';

export default function AccountPage() {
    return (
        <section>
            <Tabs defaultValue='profile'>
                <TabsList className='grid h-full w-full max-w-[800px] grid-cols-2 gap-4 bg-transparent p-0 xs:grid-cols-4'>
                    <TabsTrigger value='profile'>Profile</TabsTrigger>
                    <TabsTrigger value='password'>Password</TabsTrigger>
                    <TabsTrigger value='security'>Security</TabsTrigger>
                    <TabsTrigger value='privacy'>Data & Privacy</TabsTrigger>
                </TabsList>
                <Profile />
                <Password />
                <Security />
                <Privacy />
            </Tabs>
        </section>
    );
}
