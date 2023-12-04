import type { ProjectStatus } from '@prisma/client';
import { avatarOptions } from '@/assets/avatars/AvatarOptions';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { ReactElement, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { createProject } from '@/features/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';
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
import ButtonSpinner from '@/components/spinners/ButtonSpinner';
import BreadCrumbs from '@/components/Breadcrumbs';

interface AvatarOption {
    value: string;
    name: string;
    icon: ReactElement;
}

export default function NewProjectPage() {
    const { isLoading } = useAppSelector((store) => store.projects);
    const [avatarError, setAvatarError] = useState<string>('');
    const [titleError, setTitleError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [statusError, setStatusError] = useState<string>('');
    const [startDateError, setStartDateError] = useState<string>('');
    const [dueDateError, setDueDateError] = useState<string>('');
    const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(avatarOptions[0]);
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
        void dispatch(createProject({ avatar: selectedAvatar.value, title, description, status, startDate, dueDate }))
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
                if (error.fields?.avatar) {
                    setAvatarError(error.fields.avatar);
                }
                if (error.fields?.title) {
                    setTitleError(error.fields.title);
                }
                if (error.fields?.description) {
                    setDescriptionError(error.fields.description);
                }
                if (error.fields?.status) {
                    setStatusError(error.fields.status);
                }
                if (error.fields?.startDate) {
                    setStartDateError(error.fields.startDate);
                }
                if (error.fields?.dueDate) {
                    setDueDateError(error.fields.dueDate);
                }
            });
    };

    const handleAvatarClick = (avatar: AvatarOption) => {
        setAvatarError('');
        setSelectedAvatar(avatar);
    };

    return (
        <section>
            <BreadCrumbs url='projects' child='new' />
            <div className='bg-white rounded-lg border p-6 h-fit mt-4'>
                <form className='grid gap-4 w-full max-w-2xl' onSubmit={handleSubmit} noValidate>
                    <h1 className='text-xl font-semibold'>Create Project</h1>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='avatar'>Avatar</Label>
                        <div className='grid'>
                            <Popover modal={false}>
                                <PopoverTrigger asChild id='avatar'>
                                    <div
                                        className='p-0 flex items-center text-sm gap-3 cursor-pointer w-fit'
                                        aria-invalid={avatarError ? true : undefined}
                                        aria-describedby='avatar-error'
                                    >
                                        <div>{selectedAvatar.icon}</div>
                                        <p>Select Image</p>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 translate-y-2' onOpenAutoFocus={(e) => e.preventDefault()}>
                                    <div className='grid gap-4'>
                                        <div className='space-y-1'>
                                            <h4 className='font-medium leading-none'>Select Image</h4>
                                            <p className='text-sm text-muted-foreground'>Choose an avatar for your project.</p>
                                        </div>
                                        <div className='grid grid-cols-5 gap-2 py-4 w-64'>
                                            {avatarOptions.map((avatar) => (
                                                <div key={avatar.name} onClick={() => handleAvatarClick(avatar)}>
                                                    {avatar.icon}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            {avatarError ? (
                                <p className='pt-1 text-sm text-destructive' id='avatar-error'>
                                    {avatarError}
                                </p>
                            ) : null}
                        </div>
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='title'>Title</Label>
                        <Input
                            id='title'
                            name='title'
                            type='text'
                            aria-invalid={titleError ? true : undefined}
                            aria-describedby='title-error'
                            maxLength={100}
                            value={title}
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
                    <fieldset className='space-y-1'>
                        <Label htmlFor='status'>Status</Label>
                        <Select
                            value={status}
                            onValueChange={(value: ProjectStatus) => {
                                setStatusError('');
                                setStatus(value);
                            }}
                        >
                            <SelectTrigger
                                id='status'
                                className='w-full'
                                aria-invalid={statusError ? true : undefined}
                                aria-describedby='status-error'
                            >
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
                    <Button type='submit' className='mt-2 w-32' aria-label='Create Project' disabled={isLoading}>
                        {isLoading ? <ButtonSpinner /> : 'Create Project'}
                    </Button>
                </form>
            </div>
        </section>
    );
}
