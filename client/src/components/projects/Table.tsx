import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';
import { ProjectWithLead } from '@/types';
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
                <Link to={'/app/projects/new'} className='whitespace-nowrap'>
                    <Button type='button'>New Project</Button>
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
                                        if (header.id === 'startDate') {
                                            return (
                                                <TableHead key={header.id} className='hidden lg:table-cell'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        }
                                        if (header.id === 'lead') {
                                            return (
                                                <TableHead key={header.id} className='hidden xs:table-cell'>
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
                                        if (header.id === 'dueDate') {
                                            return (
                                                <TableHead key={header.id} className='hidden 2xl:table-cell'>
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
                                    onClick={(e) => {
                                        if ((e.target as HTMLElement).closest('button')) return;
                                        navigate(`/app/projects/${row.original.id}`);
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        if (cell.column.id === 'title') {
                                            return (
                                                <TableCell key={cell.id} className='px-0 xxxs:px-4 max-w-[200px] overflow-hidden'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'startDate') {
                                            return (
                                                <TableCell key={cell.id} className='hidden lg:table-cell'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        if (cell.column.id === 'lead') {
                                            return (
                                                <TableCell key={cell.id} className='hidden xs:table-cell'>
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
                                        if (cell.column.id === 'dueDate') {
                                            return (
                                                <TableCell key={cell.id} className='hidden 2xl:table-cell'>
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
                                    No projects found
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
