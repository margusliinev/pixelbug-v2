import { DefaultAPIError, ProjectData } from '@/types';
import { ProjectStatus } from '@prisma/client';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
    Button,
    Calendar,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
} from '../ui';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateProject } from '@/features/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';
import ButtonSpinner from '../ButtonSpinner';

export default function UpdateProjectModal({ project }: { project: ProjectData }) {
    const { isLoading } = useAppSelector((store) => store.projects);
    const [open, setOpen] = useState(false);
    const [titleError, setTitleError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [statusError, setStatusError] = useState<string>('');
    const [startDateError, setStartDateError] = useState<string>('');
    const [dueDateError, setDueDateError] = useState<string>('');
    const [title, setTitle] = useState<string>(project.title);
    const [description, setDescription] = useState<string>(project.description);
    const [status, setStatus] = useState<string>(project.status);
    const [startDate, setStartDate] = useState<Date | undefined>(project.startDate ? new Date(project.startDate) : undefined);
    const [dueDate, setDueDate] = useState<Date | undefined>(project.dueDate ? new Date(project.dueDate) : undefined);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedProject = {};
        if (title !== project.title) {
            Object.assign(updatedProject, { title });
        }
        if (description !== project.description) {
            Object.assign(updatedProject, { description });
        }
        if (status !== project.status) {
            Object.assign(updatedProject, { status });
        }
        if (startDate?.toISOString() !== new Date(project.startDate).toISOString()) {
            Object.assign(updatedProject, { startDate });
        }
        if (dueDate?.toISOString() !== new Date(project.dueDate).toISOString()) {
            Object.assign(updatedProject, { dueDate });
        }
        dispatch(updateProject({ projectId: project.id, ...updatedProject }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    setOpen(false);
                    toast({
                        title: 'Project updated',
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                }
                if (err.status === 403) {
                    setOpen(false);
                    toast({
                        title: `${err.message}`,
                        variant: 'destructive',
                    });
                }
                if (err.fields?.title) {
                    setTitleError(err.fields.title);
                }
                if (err.fields?.description) {
                    setDescriptionError(err.fields.description);
                }
                if (err.fields?.status) {
                    setStatusError(err.fields.status);
                }
                if (err.fields?.startDate) {
                    setStartDateError(err.fields.startDate);
                }
                if (err.fields?.dueDate) {
                    setDueDateError(err.fields.dueDate);
                }
            });
    };

    return (
        <>
            <div className={open ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-hidden' : 'hidden'}></div>
            <Dialog open={open} onOpenChange={setOpen} modal={false}>
                <DialogTrigger
                    className='bg-primary text-white transition-colors w-fit h-10 px-3 rounded-md text-sm font-medium hover:bg-primary-hover'
                    onClick={() => setOpen(true)}
                >
                    Update Project
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Project</DialogTitle>
                    </DialogHeader>
                    <form className='grid gap-3' onSubmit={handleSubmit} noValidate>
                        <fieldset className='space-y-1'>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                                id='title'
                                name='title'
                                type='text'
                                aria-invalid={titleError ? true : undefined}
                                aria-describedby='title-error'
                                value={title}
                                maxLength={100}
                                onChange={(e) => {
                                    setTitleError('');
                                    setTitle(e.target.value);
                                }}
                            ></Input>
                            {titleError ? (
                                <p className='pt-1 text-sm text-destructive' id='title-error'>
                                    {titleError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-1'>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea
                                className='min-h-[100px]'
                                id='description'
                                name='description'
                                aria-invalid={descriptionError ? true : undefined}
                                aria-describedby='description-error'
                                value={description}
                                maxLength={300}
                                onChange={(e) => {
                                    setDescriptionError('');
                                    setDescription(e.target.value);
                                }}
                            ></Textarea>
                            {descriptionError ? (
                                <p className='pt-1 text-sm text-destructive' id='description-error'>
                                    {descriptionError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-1 w-full'>
                            <Label htmlFor='status'>Status</Label>
                            <Select
                                value={status}
                                onValueChange={(value: ProjectStatus) => {
                                    setStatusError('');
                                    setStatus(value);
                                }}
                            >
                                <SelectTrigger id='status' aria-invalid={statusError ? true : undefined} aria-describedby='status-error'>
                                    <SelectValue placeholder='status' />
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
                                <p className='pt-1 text-sm text-destructive' id='status-error'>
                                    {statusError}
                                </p>
                            ) : null}
                        </fieldset>
                        <div className='grid gap-4 xs:flex items-start'>
                            <fieldset className='space-y-1 w-full'>
                                <Label htmlFor='startDate'>Start Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id='startDate'
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
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
                                    <p className='pt-1 text-sm text-destructive' id='startDate-error'>
                                        {startDateError}
                                    </p>
                                ) : null}
                            </fieldset>
                            <fieldset className='space-y-1 w-full'>
                                <Label htmlFor='dueDate'>Due Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id='dueDate'
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !dueDate && 'text-muted-foreground')}
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
                                    <p className='pt-1 text-sm text-destructive' id='dueDate-error'>
                                        {dueDateError}
                                    </p>
                                ) : null}
                            </fieldset>
                        </div>
                        <Button type='button' className='mt-4 w-32 whitespace-nowrap' disabled={isLoading}>
                            {isLoading ? <ButtonSpinner /> : 'Update Project'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
