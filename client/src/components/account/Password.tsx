import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, TabsContent } from '../ui';

export default function Password() {
    return (
        <TabsContent value='password' className='mt-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
                </CardHeader>
                <CardContent className='max-w-2xl'>
                    <form className='grid gap-4'>
                        <fieldset className='space-y-1'>
                            <Label htmlFor='current'>Current password</Label>
                            <Input type='password' id='current' name='current' />
                        </fieldset>
                        <fieldset className='space-y-1'>
                            <Label htmlFor='new'>New password</Label>
                            <Input type='password' id='new' name='new' />
                        </fieldset>
                        <fieldset className='space-y-1'>
                            <Label htmlFor='confirm'>Confirm new password</Label>
                            <Input type='password' id='confirm' name='confirm' />
                        </fieldset>
                        <Button type='submit' className='mt-2 w-36'>
                            Save password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
