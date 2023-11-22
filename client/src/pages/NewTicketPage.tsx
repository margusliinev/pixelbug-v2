import { Label, Input, Textarea, Button, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { getProjects } from '@/features/projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { DefaultAPIError, ProjectWithLead } from '@/types';
import { Priority, TicketType } from '@prisma/client';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '@/features/tickets/ticketsSlice';
import ButtonSpinner from '@/components/ButtonSpinner';
import BreadCrumbs from '@/components/Breadcrumbs';
import TypeOption from '@/components/tickets/TypeOption';

export default function NewTicketPage() {
    const { isLoading } = useAppSelector((store) => store.tickets);
    const { isLoading: isLoadingProjects, projects } = useAppSelector((store) => store.projects);
    const [projectError, setProjectError] = useState<string>();
    const [typeError, setTypeError] = useState<string>('');
    const [titleError, setTitleError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [priorityError, setPriorityError] = useState<string>('');
    const [project, setProject] = useState<ProjectWithLead['title']>('');
    const [type, setType] = useState<TicketType>('BUG');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<Priority>('LOW');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void dispatch(createTicket({ projectId: project, type, title, description, priority }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    navigate('/app/tickets');
                    toast({
                        title: 'Ticket created',
                        variant: 'default',
                    });
                }
            })
            .catch((error: DefaultAPIError) => {
                if (error.status === 401) {
                    navigate('/');
                }
                if (error.fields?.projectId) {
                    setProjectError(error.fields.projectId);
                }
                if (error.fields?.title) {
                    setTitleError(error.fields.title);
                }
                if (error.fields?.description) {
                    setDescriptionError(error.fields.description);
                }
                if (error.fields?.type) {
                    setTypeError(error.fields.type);
                }
                if (error.fields?.priority) {
                    setPriorityError(error.fields.priority);
                }
            });
    };

    useEffect(() => {
        void dispatch(getProjects());
    }, [dispatch]);

    return (
        <section>
            <BreadCrumbs url='tickets' child='new' />
            <div className='bg-white rounded-lg border p-6 h-fit mt-4'>
                <form className='grid gap-4 w-full max-w-2xl' onSubmit={handleSubmit} noValidate>
                    <h1 className='text-xl font-semibold'>Create Ticket</h1>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='project'>Project</Label>
                        <Select
                            disabled={projects.length === 0}
                            value={project}
                            onValueChange={(value: ProjectWithLead['title']) => {
                                setProjectError('');
                                setProject(value);
                            }}
                        >
                            <SelectTrigger id='project' aria-invalid={projectError ? true : undefined} aria-describedby='project-error'>
                                <SelectValue placeholder={projects.length === 0 && !isLoadingProjects ? 'No active projects' : 'Choose a project'} />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((project) => {
                                    return (
                                        <SelectItem key={project.id} value={project.id}>
                                            {project.title}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {projectError ? (
                            <p className='pt-1 text-sm text-destructive' id='project-error'>
                                {projectError}
                            </p>
                        ) : null}
                    </fieldset>
                    <fieldset className='space-y-1'>
                        <Label htmlFor='title'>Title</Label>
                        <Input
                            id='title'
                            name='title'
                            type='text'
                            aria-invalid={titleError ? true : undefined}
                            aria-describedby='title-error'
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
                    <div className='grid gap-4 xs:flex items-start'>
                        <fieldset className='space-y-1 w-full'>
                            <Label htmlFor='type'>Type</Label>
                            <Select
                                value={type}
                                onValueChange={(value: TicketType) => {
                                    setTypeError('');
                                    setType(value);
                                }}
                            >
                                <SelectTrigger id='type' aria-invalid={typeError ? true : undefined} aria-describedby='type-error'>
                                    <SelectValue placeholder='type' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='BUG'>
                                        <TypeOption type='BUG' />
                                    </SelectItem>
                                    <SelectItem value='FEATURE'>
                                        <TypeOption type='FEATURE' />
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {typeError ? (
                                <p className='pt-1 text-sm text-destructive' id='type-error'>
                                    {typeError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-1 w-full'>
                            <Label htmlFor='priority'>Priority</Label>
                            <Select
                                value={priority}
                                onValueChange={(value: Priority) => {
                                    setPriorityError('');
                                    setPriority(value);
                                }}
                            >
                                <SelectTrigger id='priority' aria-invalid={priorityError ? true : undefined} aria-describedby='priority-error'>
                                    <SelectValue placeholder='priority' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='LOW'>Low</SelectItem>
                                    <SelectItem value='MEDIUM'>Medium</SelectItem>
                                    <SelectItem value='HIGH'>High</SelectItem>
                                    <SelectItem value='CRITICAL'>Critical</SelectItem>
                                </SelectContent>
                            </Select>
                            {priorityError ? (
                                <p className='pt-1 text-sm text-destructive' id='priority-error'>
                                    {priorityError}
                                </p>
                            ) : null}
                        </fieldset>
                    </div>
                    <Button type='submit' className='mt-2 w-32' aria-label='Create Ticket' disabled={isLoading}>
                        {isLoading ? <ButtonSpinner /> : 'Create Ticket'}
                    </Button>
                </form>
            </div>
        </section>
    );
}
