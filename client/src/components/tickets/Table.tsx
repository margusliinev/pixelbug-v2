import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';
import { TicketWithProject } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
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

interface DataTableProps<TicketWithProject, TValue> {
    columns: ColumnDef<TicketWithProject, TValue>[];
    data: TicketWithProject[];
}

export function TicketsTable<TValue>({ columns, data }: DataTableProps<TicketWithProject, TValue>) {
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
    const navigate = useNavigate();

    return (
        <>
            <div className='flex items-center justify-between gap-2 pb-4'>
                <div className='flex items-center gap-4'>
                    <Input
                        placeholder='Search by title...'
                        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                        className='w-full xs:w-96'
                    />
                    <div className='hidden md:block'>
                        <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
                            <SelectTrigger className='w-[150px]'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 30].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize} Entries
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Link to={'/app/tickets/new'} className='whitespace-nowrap'>
                    <Button type='button'>New Ticket</Button>
                </Link>
            </div>
            <div className='rounded-lg border bg-white px-6 py-4'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                                    {headerGroup.headers.map((header) => {
                                        if (header.id === 'title') {
                                            return (
                                                <TableHead key={header.id} className='px-0 xxxs:px-4'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        }
                                        if (header.id === 'projectTitle') {
                                            return (
                                                <TableHead key={header.id} className='hidden xxs:table-cell'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        }
                                        if (header.id === 'reporter') {
                                            return (
                                                <TableHead key={header.id} className='hidden 2xl:table-cell'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        }
                                        if (header.id === 'assignee') {
                                            return (
                                                <TableHead key={header.id} className='hidden 2xl:table-cell'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        }
                                        if (header.id === 'status') {
                                            return (
                                                <TableHead key={header.id} className='hidden md:table-cell'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        }
                                        if (header.id === 'priority') {
                                            return (
                                                <TableHead key={header.id} className='hidden xs:table-cell pl-0'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        }
                                        if (header.id === 'actions') {
                                            return (
                                                <TableHead key={header.id} className='grid place-items-end px-0 xxxs:px-4'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        }
                                        return;
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
                                    onClick={() => navigate(`/app/tickets/${row.original.id}`)}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        if (cell.column.id === 'title') {
                                            return (
                                                <TableCell key={cell.id} className='px-0 xxxs:px-4 max-w-[200px] overflow-hidden'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'projectTitle') {
                                            return (
                                                <TableCell key={cell.id} className='hidden xxs:table-cell'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'reporter') {
                                            return (
                                                <TableCell key={cell.id} className='hidden 2xl:table-cell'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'assignee') {
                                            return (
                                                <TableCell key={cell.id} className='hidden 2xl:table-cell'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'status') {
                                            return (
                                                <TableCell key={cell.id} className='hidden md:table-cell'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'priority') {
                                            return (
                                                <TableCell key={cell.id} className='hidden xs:table-cell'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'actions') {
                                            return (
                                                <TableCell key={cell.id} className='px-0 xxxs:px-4 w-12 text-center'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        return;
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='capitalize'>
                                    No tickets found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className='grid xxxs:flex items-center justify-start space-x-2 py-4'>
                    <div className='flex items-center jusify-start space-x-2 py-4 xxxs:py-0'>
                        <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            Previous
                        </Button>
                        <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next
                        </Button>
                    </div>
                    <span className='flex items-center gap-1'>
                        <p>Page</p>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>
                    </span>
                </div>
            </div>
        </>
    );
}
