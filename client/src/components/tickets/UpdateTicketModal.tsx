import { DefaultAPIError, TicketData } from '@/types';
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    useToast,
} from '../ui';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { TicketType, Priority, TicketStatus } from '@prisma/client';
import { updateTicket } from '@/features/tickets/ticketsSlice';
import { getUsers } from '@/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import TypeOption from './TypeOption';
import ButtonSpinner from '../spinners/ButtonSpinner';

export default function UpdateTicketModal({ ticket }: { ticket: TicketData }) {
    const { users } = useAppSelector((store) => store.users);
    const { user } = useAppSelector((store) => store.user);
    const { isLoading } = useAppSelector((store) => store.tickets);
    const [open, setOpen] = useState(false);
    const [typeError, setTypeError] = useState<string>('');
    const [titleError, setTitleError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [priorityError, setPriorityError] = useState<string>('');
    const [statusError, setStatusError] = useState<string>('');
    const [assigneeError, setAssigneeError] = useState<string>('');
    const [type, setType] = useState<TicketType>(ticket.type);
    const [title, setTitle] = useState<string>(ticket.title);
    const [description, setDescription] = useState<string>(ticket.description);
    const [priority, setPriority] = useState<Priority>(ticket.priority);
    const [status, setStatus] = useState<string>(ticket.status);
    const [assignee, setAssignee] = useState<string | null>(ticket.assignee.id ?? null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTicket = {};
        if (type !== ticket.type) {
            Object.assign(updatedTicket, { type });
        }
        if (title !== ticket.title) {
            Object.assign(updatedTicket, { title });
        }
        if (description !== ticket.description) {
            Object.assign(updatedTicket, { description });
        }
        if (priority !== ticket.priority) {
            Object.assign(updatedTicket, { priority });
        }
        if (status !== ticket.status) {
            Object.assign(updatedTicket, { status });
        }
        if (assignee !== ticket.assignee.id) {
            Object.assign(updatedTicket, { assigneeId: assignee });
        }
        dispatch(updateTicket({ ticketId: ticket.id, ...updatedTicket }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    setOpen(false);
                    toast({
                        title: 'Ticket updated',
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                }
                if (err.status === 403) {
                    setOpen(false);
                    toast({
                        title: `${err.message}`,
                        variant: 'destructive',
                    });
                }
                if (err.fields?.title) {
                    setTitleError(err.fields.title);
                }
                if (err.fields?.description) {
                    setDescriptionError(err.fields.description);
                }
                if (err.fields?.type) {
                    setTypeError(err.fields.type);
                }
                if (err.fields?.priority) {
                    setPriorityError(err.fields.priority);
                }
                if (err.fields?.status) {
                    setStatusError(err.fields.status);
                }
                if (err.fields?.assigneeId) {
                    setAssigneeError(err.fields.assigneeId);
                }
            });
    };

    useEffect(() => {
        if (open) {
            void dispatch(getUsers());
        }
    }, [dispatch, open]);

    return (
        <>
            <div className={open ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-hidden' : 'hidden'}></div>
            <Dialog open={open} onOpenChange={setOpen} modal={false}>
                <DialogTrigger
                    className='bg-primary text-white transition-colors w-fit h-10 px-3 rounded-md text-sm font-medium hover:bg-primary-hover'
                    onClick={() => setOpen(true)}
                >
                    Update Ticket
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Ticket</DialogTitle>
                    </DialogHeader>
                    <form className='grid gap-3' onSubmit={handleSubmit} noValidate>
                        <fieldset className='space-y-1'>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                                id='title'
                                name='title'
                                type='text'
                                aria-invalid={titleError ? true : undefined}
                                aria-describedby='title-error'
                                value={title}
                                maxLength={100}
                                onChange={(e) => {
                                    setTitleError('');
                                    setTitle(e.target.value);
                                }}
                            ></Input>
                            {titleError ? (
                                <p className='pt-1 text-sm text-destructive' id='title-error'>
                                    {titleError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-1'>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea
                                className='min-h-[100px]'
                                id='description'
                                name='description'
                                aria-invalid={descriptionError ? true : undefined}
                                aria-describedby='description-error'
                                value={description}
                                maxLength={300}
                                onChange={(e) => {
                                    setDescriptionError('');
                                    setDescription(e.target.value);
                                }}
                            ></Textarea>
                            {descriptionError ? (
                                <p className='pt-1 text-sm text-destructive' id='description-error'>
                                    {descriptionError}
                                </p>
                            ) : null}
                        </fieldset>
                        <div className='grid gap-4 xs:flex items-start'>
                            <fieldset className='space-y-1 w-full'>
                                <Label htmlFor='type'>Type</Label>
                                <Select
                                    value={type}
                                    onValueChange={(value: TicketType) => {
                                        setTypeError('');
                                        setType(value);
                                    }}
                                >
                                    <SelectTrigger id='type' aria-invalid={typeError ? true : undefined} aria-describedby='type-error'>
                                        <SelectValue placeholder='type' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='BUG'>
                                            <TypeOption type='BUG' />
                                        </SelectItem>
                                        <SelectItem value='FEATURE'>
                                            <TypeOption type='FEATURE' />
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {typeError ? (
                                    <p className='pt-1 text-sm text-destructive' id='type-error'>
                                        {typeError}
                                    </p>
                                ) : null}
                            </fieldset>
                            <fieldset className='space-y-1 w-full'>
                                <Label htmlFor='priority'>Priority</Label>
                                <Select
                                    value={priority}
                                    onValueChange={(value: Priority) => {
                                        setPriorityError('');
                                        setPriority(value);
                                    }}
                                >
                                    <SelectTrigger id='priority' aria-invalid={priorityError ? true : undefined} aria-describedby='priority-error'>
                                        <SelectValue placeholder='priority' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='LOW'>Low</SelectItem>
                                        <SelectItem value='MEDIUM'>Medium</SelectItem>
                                        <SelectItem value='HIGH'>High</SelectItem>
                                        <SelectItem value='CRITICAL'>Critical</SelectItem>
                                    </SelectContent>
                                </Select>
                                {priorityError ? (
                                    <p className='pt-1 text-sm text-destructive' id='priority-error'>
                                        {priorityError}
                                    </p>
                                ) : null}
                            </fieldset>
                        </div>
                        {user?.role !== 'USER' ? (
                            <>
                                <fieldset className='space-y-1 w-full'>
                                    <Label htmlFor='status'>Status</Label>
                                    <Select
                                        value={status}
                                        onValueChange={(value: TicketStatus) => {
                                            setStatusError('');
                                            setStatus(value);
                                        }}
                                    >
                                        <SelectTrigger id='status' aria-invalid={statusError ? true : undefined} aria-describedby='status-error'>
                                            <SelectValue placeholder='status' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='UNASSIGNED'>Unassigned</SelectItem>
                                            <SelectItem value='ASSIGNED'>Assigned</SelectItem>
                                            <SelectItem value='IN_DEVELOPMENT'>In Development</SelectItem>
                                            <SelectItem value='ON_HOLD'>On Hold</SelectItem>
                                            <SelectItem value='RESOLVED'>Resolved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {statusError ? (
                                        <p className='pt-1 text-sm text-destructive' id='status-error'>
                                            {statusError}
                                        </p>
                                    ) : null}
                                </fieldset>
                                <fieldset className='space-y-1 w-full'>
                                    <Label htmlFor='assignee'>Assignee</Label>
                                    <Select
                                        value={assignee ?? undefined}
                                        onValueChange={(value: string) => {
                                            setAssigneeError('');
                                            setAssignee(value);
                                        }}
                                    >
                                        <SelectTrigger
                                            id='assignee'
                                            aria-invalid={assigneeError ? true : undefined}
                                            aria-describedby='assignee-error'
                                        >
                                            <SelectValue placeholder='Assign developer' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => {
                                                if (user.role === 'DEVELOPER' || user.role === 'ADMIN') {
                                                    return (
                                                        <SelectItem value={user.id} key={user.id}>
                                                            {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user.username}
                                                        </SelectItem>
                                                    );
                                                }
                                            })}
                                        </SelectContent>
                                    </Select>
                                    {assigneeError ? (
                                        <p className='pt-1 text-sm text-destructive' id='assignee-error'>
                                            {assigneeError}
                                        </p>
                                    ) : null}
                                </fieldset>
                            </>
                        ) : null}
                        <Button type='submit' className='mt-4 w-32 whitespace-nowrap' disabled={isLoading}>
                            {isLoading ? <ButtonSpinner /> : 'Update Ticket'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
