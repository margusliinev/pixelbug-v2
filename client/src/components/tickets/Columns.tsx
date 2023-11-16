import { TicketWithProject } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import { Bug, Feature } from '@/assets/icons';
import StatusCell from './StatusCell';
import ActionButton from './ActionButton';
import PriorityCell from './PriorityCell';

export const columns: ColumnDef<TicketWithProject>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='group hover:bg-transparent px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Title
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (ticket) => {
            return (
                <div className='flex items-center gap-2 w-fit'>
                    <div className='h-8 w-8'>{ticket.row.original.type === 'BUG' ? <Bug /> : <Feature />}</div>
                    <p>{ticket.row.original.title.length > 40 ? ticket.row.original.title.substring(0, 40) + '...' : ticket.row.original.title}</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'projectTitle',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='group hover:bg-transparent px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Project
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (ticket) => ticket.row.original.projectTitle,
    },
    {
        accessorKey: 'reporter',
        sortingFn: (a, b) => {
            const aName = a.original.reporter.name;
            const bName = b.original.reporter.name;
            if (aName > bName) {
                return -1;
            }
            if (aName < bName) {
                return 1;
            }
            return 0;
        },
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='group hover:bg-transparent' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Reporter
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (ticket) => {
            return (
                <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8 rounded-full'>
                        <AvatarImage
                            src={ticket.row.original.reporter.photo ? ticket.row.original.reporter.photo : undefined}
                            className='rounded-full'
                        />
                        <AvatarFallback className='rounded-full bg-gray-200'>{ticket.row.original.reporter.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p>{ticket.row.original.reporter.name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'assignee',
        sortingFn: (a, b) => {
            const aName = a.original.assignee.name;
            const bName = b.original.assignee.name;
            if (aName > bName) {
                return -1;
            }
            if (aName < bName) {
                return 1;
            }
            return 0;
        },
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='group hover:bg-transparent' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Assignee
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (ticket) => {
            return (
                <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8 rounded-full'>
                        <AvatarImage
                            src={ticket.row.original.assignee.photo ? ticket.row.original.assignee.photo : undefined}
                            className='rounded-full'
                        />
                        <AvatarFallback className='rounded-full bg-gray-200'>
                            {ticket.row.original.assignee.name === 'Unassigned' ? '-' : ticket.row.original.assignee.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <p>{ticket.row.original.assignee.name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='group hover:bg-transparent' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (ticket) => {
            const ticketStatus = ticket.row.original.status;
            return <StatusCell status={ticketStatus} />;
        },
    },
    {
        accessorKey: 'priority',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='group hover:bg-transparent' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Priority
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (ticket) => {
            const ticketPriority = ticket.row.original.priority;
            return <PriorityCell priority={ticketPriority} />;
        },
    },
    {
        accessorKey: 'actions',
        header: () => {
            return (
                <Button variant='ghost' className='cursor-default group hover:bg-transparent capitalize px-0 pb-4'>
                    actions
                </Button>
            );
        },
        cell: (ticket) => <ActionButton ticket={ticket.row.original} />,
    },
];
