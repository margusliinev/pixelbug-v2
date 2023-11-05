import type { ProjectStatus } from '@prisma/client';
import ButtonSpinner from '@/components/ButtonSpinner';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { useEffect, useRef, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { createProject } from '@/features/projects/projectsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { DefaultAPIError } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
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
    useToast,
} from '@/components/ui';

export default function NewProjectPage() {
    const { isLoading } = useAppSelector((store) => store.projects);
    const [titleError, setTitleError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [statusError, setStatusError] = useState<string>('');
    const [startDateError, setStartDateError] = useState<string>('');
    const [dueDateError, setDueDateError] = useState<string>('');
    const [isTitleError, setIsTitleError] = useState<boolean>(false);
    const [isDescriptionError, setIsDescriptionError] = useState<boolean>(false);
    const [isStatusError, setIsStatusError] = useState<boolean>(false);
    const [isStartDateError, setIsStartDateError] = useState<boolean>(false);
    const [isDueDateError, setIsDueDateError] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);
    const startDateRef = useRef<HTMLButtonElement>(null);
    const dueDateRef = useRef<HTMLButtonElement>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<ProjectStatus>('PLANNING');
    const [startDate, setStartDate] = useState<Date>();
    const [dueDate, setDueDate] = useState<Date>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsTitleError(false);
        setIsDescriptionError(false);
        setIsStatusError(false);
        setIsStartDateError(false);
        setIsDueDateError(false);
        void dispatch(createProject({ title, description, status, startDate, dueDate }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    navigate('/app/projects');
                    toast({
                        title: 'Project created',
                        variant: 'default',
                    });
                }
            })
            .catch((error: DefaultAPIError) => {
                if (error.status === 401) {
                    navigate('/');
                }
                if (error.fields?.title) {
                    setTitleError(error.fields.title);
                    setIsTitleError(true);
                }
                if (error.fields?.description) {
                    setDescriptionError(error.fields.description);
                    setIsDescriptionError(true);
                }
                if (error.fields?.status) {
                    setStatusError(error.fields.status);
                    setIsStatusError(true);
                }
                if (error.fields?.startDate) {
                    setStartDateError(error.fields.startDate);
                    setIsStartDateError(true);
                }
                if (error.fields?.dueDate) {
                    setDueDateError(error.fields.dueDate);
                    setIsDueDateError(true);
                }
            });
    };

    useEffect(() => {
        if (isTitleError) {
            titleRef.current?.focus();
        } else if (isDescriptionError) {
            descriptionRef.current?.focus();
        } else if (isStatusError) {
            statusRef.current?.focus();
        } else if (isStartDateError) {
            startDateRef.current?.focus();
        } else if (isDueDateError) {
            dueDateRef.current?.focus();
        }
    }, [isTitleError, isDescriptionError, isStatusError, isStartDateError, isDueDateError]);

    return (
        <section>
            <div className='flex items-center gap-1 text-lg text-primary-hover pt-1'>
                <div className='flex items-center gap-1 group'>
                    <span aria-hidden='true' className='transition-colors group-hover:text-emerald-500 rotate-180 text-sm font-semibold mt-0.5'>
                        &rarr;
                    </span>
                    <Link to='/app/projects' className='font-medium'>
                        All Projects
                    </Link>
                </div>
            </div>
            <div className='bg-white rounded-lg border p-6 h-fit mt-3'>
                <form className='grid gap-4 w-full max-w-2xl' onSubmit={handleSubmit} noValidate>
                    <h1 className='text-xl font-semibold'>Create Project</h1>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='title'>Project Title</Label>
                        <Input
                            id='title'
                            name='title'
                            type='text'
                            ref={titleRef}
                            aria-invalid={titleError ? true : undefined}
                            aria-describedby='title-error'
                            value={title}
                            onChange={(e) => {
                                setTitleError('');
                                setTitle(e.target.value);
                            }}
                        ></Input>
                        {titleError ? (
                            <p className='pt-1 text-sm text-destructive' id='firstName-error'>
                                {titleError}
                            </p>
                        ) : null}
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea
                            id='description'
                            name='description'
                            ref={descriptionRef}
                            aria-invalid={descriptionError ? true : undefined}
                            aria-describedby='description-error'
                            value={description}
                            onChange={(e) => {
                                setDescriptionError('');
                                setDescription(e.target.value);
                            }}
                        ></Textarea>
                        {descriptionError ? (
                            <p className='pt-1 text-sm text-destructive' id='firstName-error'>
                                {descriptionError}
                            </p>
                        ) : null}
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='status'>Status</Label>
                        <Select
                            value={status}
                            onValueChange={(value: ProjectStatus) => {
                                setStatusError('');
                                setStatus(value);
                            }}
                        >
                            <SelectTrigger id='status' className='w-full'>
                                <SelectValue
                                    placeholder='Status'
                                    ref={statusRef}
                                    aria-invalid={statusError ? true : undefined}
                                    aria-describedby='status-error'
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='PLANNING'>Planning</SelectItem>
                                <SelectItem value='DEVELOPMENT'>Development</SelectItem>
                                <SelectItem value='ON_HOLD'>On Hold</SelectItem>
                                <SelectItem value='MAINTENANCE'>Maintenance</SelectItem>
                                <SelectItem value='COMPLETED'>Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        {statusError ? (
                            <p className='pt-1 text-sm text-destructive' id='firstName-error'>
                                {statusError}
                            </p>
                        ) : null}
                    </fieldset>
                    <div className='grid gap-4 xs:flex items-start'>
                        <fieldset className='space-y-2 grid w-full'>
                            <Label htmlFor='startDate'>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id='startDate'
                                        variant={'outline'}
                                        className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
                                        ref={startDateRef}
                                        aria-invalid={startDateError ? true : undefined}
                                        aria-describedby='startDate-error'
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                        {startDate ? format(startDate, 'PPP') : <span>Pick a start date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0'>
                                    <Calendar
                                        mode='single'
                                        selected={startDate}
                                        onSelect={(date) => {
                                            setStartDateError('');
                                            setStartDate(date);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {startDateError ? (
                                <p className='pt-1 text-sm text-destructive' id='firstName-error'>
                                    {startDateError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-2 grid w-full'>
                            <Label htmlFor='dueDate'>Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id='dueDate'
                                        variant={'outline'}
                                        className={cn('w-full justify-start text-left font-normal', !dueDate && 'text-muted-foreground')}
                                        ref={dueDateRef}
                                        aria-invalid={dueDateError ? true : undefined}
                                        aria-describedby='dueDate-error'
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                        {dueDate ? format(dueDate, 'PPP') : <span>Pick a due date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0'>
                                    <Calendar
                                        mode='single'
                                        selected={dueDate}
                                        onSelect={(date) => {
                                            setDueDateError('');
                                            setDueDate(date);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {dueDateError ? (
                                <p className='pt-1 text-sm text-destructive' id='firstName-error'>
                                    {dueDateError}
                                </p>
                            ) : null}
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
