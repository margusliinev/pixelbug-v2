import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
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
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui';
import { TicketWithProject } from '@/types';

export default function ActionButton({ ticket }: { ticket: TicketWithProject }) {
    const [warning, setWarning] = useState(false);
    const [alert, setAlert] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    console.log(ticket);

    return (
        <DropdownMenu open={dropdown} onOpenChange={setDropdown} modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='p-0'>
                <AlertDialog open={warning} onOpenChange={setWarning}>
                    <AlertDialogTrigger className='text-sm pl-4 pr-0 py-2 w-full h-full text-left font-medium text-black hover:bg-gray-100'>
                        Archive
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will remove this project from your active workspace and will then be only visible in the archive.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDropdown(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className='bg-secondary-foreground hover:bg-secondary-hover'
                                onClick={() => {
                                    setDropdown(false);
                                }}
                            >
                                Archive
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog open={alert} onOpenChange={setAlert}>
                    <AlertDialogTrigger className='text-sm pl-4 pr-0 py-2 w-full h-full text-left font-medium text-destructive hover:bg-gray-100'>
                        Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the project and all the associated data (tickets, comments,
                                project details).
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDropdown(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className='bg-destructive hover:bg-destructive-hover'
                                onClick={() => {
                                    setDropdown(false);
                                }}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
