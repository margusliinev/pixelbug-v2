import { ProjectWithLead } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui';

export const columns: ColumnDef<ProjectWithLead>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='px-2 group hover:bg-transparent'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Name
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
    },
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='px-2 group hover:bg-transparent'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Title
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
    },
    {
        accessorKey: 'startDate',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='px-2 group hover:bg-transparent'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Start Date
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (project) => format(new Date(project.row.original.startDate), 'PPP'),
    },
    {
        accessorKey: 'dueDate',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='px-2 group hover:bg-transparent'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Due Date
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (project) => format(new Date(project.row.original.dueDate), 'PPP'),
    },
    {
        accessorKey: 'lead',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='px-2 group hover:bg-transparent'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Lead
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='px-2 group hover:bg-transparent'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Status
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (project) => project.row.original.status.replace(/_/g, ' '),
    },
];
