import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getTickets } from '@/features/tickets/ticketsSlice';
import { Ticket } from '@/assets/icons';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { TicketsTable } from '@/components/tickets/Table';
import { columns } from '@/components/tickets/Columns';

export default function TicketsPage() {
    const { tickets } = useAppSelector((store) => store.tickets);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tickets.length > 0) {
            return;
        } else {
            void dispatch(getTickets());
        }
    }, [dispatch, tickets.length]);

    if (!tickets || tickets.length < 1) {
        return (
            <div className='grid place-items-center w-full text-center'>
                <div className='flex flex-col items-center gap-2'>
                    <Ticket height={10} width={10} />
                    <h1 className='font-semibold text-lg mb-1'>No Tickets Found</h1>
                    <h2 className='text-secondary-foreground text-md'>Get started by creating a new ticket!</h2>
                    <Link to={'/app/tickets/new'} className='whitespace-nowrap mt-4'>
                        <Button type='button'>New Ticket</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section>
            <TicketsTable columns={columns} data={tickets} />
        </section>
    );
}
