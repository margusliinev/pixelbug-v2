import ButtonSpinner from '@/components/ButtonSpinner';
import {
    Button,
    Calendar,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from '@/components/ui';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { createProject } from '@/features/projects/projectsSlice';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ProjectStatus } from '@prisma/client';

export default function NewProjectPage() {
    const { isLoading } = useAppSelector((store) => store.projects);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.PLANNING);
    const [startDate, setStartDate] = useState<Date>();
    const [dueDate, setDueDate] = useState<Date>();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void dispatch(createProject({ title, description, status, startDate, dueDate }));
    };

    return (
        <section>
            <div className='bg-white rounded-lg border p-6 h-fit'>
                <form className='grid gap-4 w-full max-w-2xl' onSubmit={handleSubmit} noValidate>
                    <h1 className='text-xl font-semibold'>Create Project</h1>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='title'>Project Title</Label>
                        <Input id='title' name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}></Input>
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></Textarea>
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='status'>Status</Label>
                        <Select value={status} onValueChange={(value: ProjectStatus) => setStatus(value)}>
                            <SelectTrigger id='status' className='w-full'>
                                <SelectValue placeholder='Status' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='PLANNING'>Planning</SelectItem>
                                <SelectItem value='DEVELOPMENT'>Development</SelectItem>
                                <SelectItem value='ON_HOLD'>On Hold</SelectItem>
                                <SelectItem value='MAINTENANCE'>Maintenance</SelectItem>
                                <SelectItem value='COMPLETED'>Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </fieldset>
                    <div className='grid gap-4 xs:flex items-center'>
                        <fieldset className='space-y-2 grid w-full'>
                            <Label htmlFor='startDate'>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                        {startDate ? format(startDate, 'PPP') : <span>Pick a start date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0'>
                                    <Calendar mode='single' selected={startDate} onSelect={setStartDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </fieldset>
                        <fieldset className='space-y-2 grid w-full'>
                            <Label htmlFor='dueDate'>Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn('w-full justify-start text-left font-normal', !dueDate && 'text-muted-foreground')}
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                        {dueDate ? format(dueDate, 'PPP') : <span>Pick a due date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0'>
                                    <Calendar mode='single' selected={dueDate} onSelect={setDueDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </fieldset>
                    </div>
                    <Button type='submit' className='mt-2 w-32' aria-label='Sign up' disabled={isLoading}>
                        {isLoading ? <ButtonSpinner /> : 'Create Project'}
                    </Button>
                </form>
            </div>
        </section>
    );
}
