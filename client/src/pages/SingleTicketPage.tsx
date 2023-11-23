import { format, formatDistanceStrict } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getTickets } from '@/features/tickets/ticketsSlice';
import { getComments } from '@/features/comments/commentsSlice';
import { Ticket } from '@/assets/icons';
import { Button } from '@/components/ui';
import BreadCrumbs from '@/components/Breadcrumbs';
import PriorityCell from '@/components/tickets/PriorityCell';
import StatusCell from '@/components/tickets/StatusCell';
import PageSpinner from '@/components/PageSpinner';
import Comments from '@/components/comments/Comments';

export default function SingleTicketPage() {
    const { isLoading, tickets } = useAppSelector((store) => store.tickets);
    const { comments } = useAppSelector((store) => store.comments);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const ticket = tickets.find((ticket) => ticket.id === id);

    useEffect(() => {
        void dispatch(getComments(id || ''));
        if (tickets.length > 0) return;
        void dispatch(getTickets());
    }, [dispatch, id, tickets.length]);

    if (isLoading) {
        return <PageSpinner />;
    }

    if (!ticket) {
        return (
            <div className='grid place-items-center w-full text-center'>
                <div className='flex flex-col items-center gap-2'>
                    <Ticket height={10} width={10} />
                    <h1 className='font-semibold text-lg mb-1'>No Ticket Found</h1>
                    <h2 className='text-secondary-foreground text-md'>Please go back and find the ticket again!</h2>
                    <Link to={'/app/tickets'} className='whitespace-nowrap mt-4'>
                        <Button type='button'>All Tickets</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section>
            <BreadCrumbs url='tickets' child={ticket.id} alias='ticket' />
            <div className='bg-white rounded-lg border p-6 mt-4 shadow-sm'>
                <div className='px-4 sm:px-0'>
                    <h1 className='text-lg font-semibold leading-7'>Ticket Details</h1>
                </div>
                <div className='mt-6 border-t border-neutral-200 text-sm xs:text-base'>
                    <dl className='divide-y divide-neutral-200'>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Type</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0 capitalize'>{ticket.type.toLowerCase()}</dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Project</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.projectTitle}</dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Title</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.title}</dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6 grid items-center'>Description</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.description}</dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Reporter</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.reporter.name}</dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Assignee</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{ticket.assignee.name}</dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Priority</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                                <PriorityCell priority={ticket.priority} />
                            </dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Status</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0 -ml-2'>
                                <StatusCell status={ticket.status} />
                            </dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6 text-gray-900'>Created At</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                                <p>{format(new Date(ticket.createdAt), 'PPP')}</p>
                            </dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6 text-gray-900'>Resolved At</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                                <p>{ticket.resolvedAt ? format(new Date(ticket.resolvedAt), 'PPP') : 'Ticket is not yet resolved'}</p>
                            </dd>
                        </div>
                        <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6 text-gray-900'>Resolution time</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                                <p>
                                    {ticket.resolvedAt
                                        ? formatDistanceStrict(new Date(ticket.resolvedAt), new Date(ticket.createdAt))
                                        : 'Will be calculated once ticket is resolved'}
                                </p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <Comments comments={comments} />
        </section>
    );
}
