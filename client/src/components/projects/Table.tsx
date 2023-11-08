import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage, Button, Input } from '../ui';
import { ProjectWithLead } from '@/types';
import { Link } from 'react-router-dom';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import StatusCell from './StatusCell';

interface DataTableProps<ProjectWithLead, TValue> {
    columns: ColumnDef<ProjectWithLead, TValue>[];
    data: ProjectWithLead[];
}

export function ProjectsTable<TValue>({ columns, data }: DataTableProps<ProjectWithLead, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <>
            <div className='flex items-center justify-between gap-2 py-2'>
                <Input
                    placeholder='Find projects by title...'
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className='w-full xs:w-96'
                />
                <Link to={'/app/projects/new'} className='whitespace-nowrap'>
                    <Button type='button'>New Project</Button>
                </Link>
            </div>
            <div className='rounded-lg border my-2 bg-white p-6 h-fit mt-3'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                                    {headerGroup.headers.map((header) => {
                                        if (header.column.id === 'name') {
                                            return;
                                        }
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className='cursor-pointer capitalize hover:bg-gray-100'
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        if (cell.column.id === 'name') {
                                            return;
                                        }
                                        if (cell.column.id === 'title') {
                                            return (
                                                <TableCell key={cell.id}>
                                                    <div className='flex items-center gap-2'>
                                                        <img src={cell.row.original.title.avatar} className='w-8 h-8' />
                                                        <p>{cell.row.original.title.text}</p>
                                                    </div>
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'lead') {
                                            return (
                                                <TableCell key={cell.id}>
                                                    <div className='flex items-center gap-2'>
                                                        <Avatar className='h-8 w-8 rounded-full'>
                                                            <AvatarImage
                                                                src={cell.row.original.lead.photo ? cell.row.original.lead.photo : undefined}
                                                                className='rounded-full'
                                                            />
                                                            <AvatarFallback className='rounded-full bg-gray-200'>
                                                                {cell.row.original.lead.name[0].toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <p>{cell.row.original.lead.name}</p>
                                                    </div>
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'status') {
                                            return (
                                                <TableCell key={cell.id}>
                                                    <StatusCell status={cell.row.original.status} />
                                                </TableCell>
                                            );
                                        }
                                        return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>;
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>No results.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className='hidden md:flex items-center justify-start space-x-2 py-4 pl-4'>
                    <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
            <div className='flex md:hidden items-center justify-start space-x-2 py-4'>
                <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </>
    );
}
