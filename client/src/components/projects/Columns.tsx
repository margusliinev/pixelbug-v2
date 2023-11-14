import { ProjectWithLead } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import StatusCell from './StatusCell';
import ActionButton from './ActionsButton';

export const columns: ColumnDef<ProjectWithLead>[] = [
    {
        accessorKey: 'name',
        header: () => {
            return;
        },
        cell: () => {
            return;
        },
    },
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
        cell: (project) => {
            return (
                <div className='flex items-center gap-2 w-fit'>
                    <Avatar className='h-8 w-8 rounded-none'>
                        <AvatarImage
                            src={project.row.original.title.avatar ? project.row.original.title.avatar : undefined}
                            className='rounded-none'
                        />
                        <AvatarFallback className='rounded-none bg-gray-200'>{project.row.original.title.text[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p>{project.row.original.title.text}</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'startDate',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='group hover:bg-transparent' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Start Date
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (project) => format(new Date(project.row.original.startDate), 'PPP'),
    },
    {
        accessorKey: 'lead',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='group hover:bg-transparent' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Lead
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (project) => {
            return (
                <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8 rounded-full'>
                        <AvatarImage src={project.row.original.lead.photo ? project.row.original.lead.photo : undefined} className='rounded-full' />
                        <AvatarFallback className='rounded-full bg-gray-200'>{project.row.original.lead.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p>{project.row.original.lead.name}</p>
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
        cell: (project) => {
            const projectStatus = project.row.original.status;
            return <StatusCell status={projectStatus} />;
        },
    },
    {
        accessorKey: 'dueDate',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='group hover:bg-transparent' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Due Date
                    <ArrowUpDown className='ml-2 h-4 w-4 group-hover:text-primary' />
                </Button>
            );
        },
        cell: (project) => format(new Date(project.row.original.dueDate), 'PPP'),
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
        cell: (project) => <ActionButton project={project.row.original} />,
    },
];
