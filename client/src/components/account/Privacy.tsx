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
} from '../ui';

export default function Privacy() {
    return (
        <TabsContent value='privacy' className='mt-4'>
            <Card>
                <CardHeader>
                    <CardTitle className='mb-2'>Data & Privacy</CardTitle>
                    <CardDescription className='max-w-md'>
                        No longer want to use our service? You can delete your account here. This action is not reversible. All information related to
                        this account will be deleted permanently.
                    </CardDescription>
                </CardHeader>
                <CardContent className='max-w-2xl'>
                    <form className='grid gap-4 mt-2 rounded-md bg-white'>
                        <AlertDialog>
                            <AlertDialogTrigger className='bg-destructive transition-colors hover:bg-destructive-hover text-white max-w-fit text-sm py-3 px-4 rounded-md'>
                                Delete my account
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='bg-destructive hover:bg-destructive-hover'>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
