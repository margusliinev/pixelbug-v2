import { revokeSessions } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    TabsContent,
    useToast,
} from '../ui';

export default function Security() {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleRevokeSessions = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpen(false);
        navigate('/');
        dispatch(revokeSessions())
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast({
                        title: 'Logged out from all devices',
                        variant: 'default',
                    });
                }
            })
            .catch(() => {
                toast({
                    title: 'Failed to revoke sessions',
                    variant: 'destructive',
                });
            });
    };

    return (
        <TabsContent value='security' className='mt-4'>
            <Card>
                <CardHeader>
                    <CardTitle className='mb-2'>Security</CardTitle>
                    <CardDescription className='max-w-md'>
                        Control your privacy by managing your active sessions and choosing the right security settings for you.
                    </CardDescription>
                </CardHeader>
                <CardContent className='max-w-2xl'>
                    <form className='grid gap-4 mt-2 rounded-md bg-white'>
                        <AlertDialog open={open} onOpenChange={setOpen}>
                            <AlertDialogTrigger className='bg-sky-600 hover:bg-sky-700 text-white max-w-fit text-sm py-3 px-4 rounded-md'>
                                Revoke all sessions
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will revoke all sessions and log you out of all devices (including current device). You will have to log
                                        in again on each device.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='bg-sky-600 hover:bg-sky-700' onClick={handleRevokeSessions}>
                                        Revoke sessions
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
