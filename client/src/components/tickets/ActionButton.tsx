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
    useToast,
} from '../ui';
import { DefaultAPIError, TicketData } from '@/types';
import { useAppDispatch } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { assignTicket, deleteTicket } from '@/features/tickets/ticketsSlice';

export default function ActionButton({ ticket }: { ticket: TicketData }) {
    const [warning, setWarning] = useState(false);
    const [alert, setAlert] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleAssignTicket = () => {
        dispatch(assignTicket(ticket.id))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast({
                        title: 'Ticket was assigned to you',
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                } else if (err.status === 403) {
                    toast({
                        title: `${err.message}`,
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: `Failed to assign the ticket`,
                        variant: 'destructive',
                    });
                }
            });
    };

    const handleDeleteTicket = () => {
        dispatch(deleteTicket(ticket.id))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast({
                        title: 'Ticket was deleted',
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                } else if (err.status === 403) {
                    toast({
                        title: 'Only project lead can delete the ticket',
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: `Failed to delete the ticket`,
                        variant: 'destructive',
                    });
                }
            });
    };

    return (
        <DropdownMenu open={dropdown} onOpenChange={setDropdown} modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0 hover:bg-gray-200'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='p-0 grid'>
                <AlertDialog open={warning} onOpenChange={setWarning}>
                    <AlertDialogTrigger className='text-sm pl-4 pr-8 py-2 w-fit h-full text-left font-medium text-black hover:bg-gray-100'>
                        Assign To Me
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will assign you to this ticket. You will be notified of any changes to this ticket.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDropdown(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className='bg-secondary-foreground hover:bg-secondary-hover'
                                onClick={() => {
                                    setDropdown(false);
                                    handleAssignTicket();
                                }}
                            >
                                Assign Me
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog open={alert} onOpenChange={setAlert}>
                    <AlertDialogTrigger className='text-sm pl-4 pr-8 py-2 w-fit h-full text-left font-medium text-destructive hover:bg-gray-100'>
                        Delete Ticket
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the ticket and all the associated data (comments,
                                attachments, etc.)
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDropdown(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className='bg-destructive hover:bg-destructive-hover'
                                onClick={() => {
                                    setDropdown(false);
                                    handleDeleteTicket();
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
