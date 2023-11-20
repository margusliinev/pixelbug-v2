import ButtonSpinner from '@/components/ButtonSpinner';
import { Label, Input, Textarea, Button, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { getProjects } from '@/features/projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { DefaultAPIError, ProjectWithLead } from '@/types';
import { TicketType, Priority } from '@prisma/client';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '@/features/tickets/ticketsSlice';
import BreadCrumbs from '@/components/Breadcrumbs';

export default function NewTicketPage() {
    const { isLoading } = useAppSelector((store) => store.tickets);
    const { isLoading: isLoadingProjects, projects } = useAppSelector((store) => store.projects);
    const [projectError, setProjectError] = useState<string>();
    const [typeError, setTypeError] = useState<string>('');
    const [titleError, setTitleError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [priorityError, setPriorityError] = useState<string>('');
    const [isProjectError, setIsProjectError] = useState<boolean>(false);
    const [isTypeError, setIsTypeError] = useState<boolean>(false);
    const [isTitleError, setIsTitleError] = useState<boolean>(false);
    const [isDescriptionError, setIsDescriptionError] = useState<boolean>(false);
    const [isPriorityError, setIsPriorityError] = useState<boolean>(false);
    const projectRef = useRef<HTMLButtonElement>(null);
    const typeRef = useRef<HTMLButtonElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const priorityRef = useRef<HTMLButtonElement>(null);
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
        setIsProjectError(false);
        setIsTypeError(false);
        setIsTitleError(false);
        setIsDescriptionError(false);
        setIsPriorityError(false);
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
                    setIsProjectError(true);
                }
                if (error.fields?.title) {
                    setTitleError(error.fields.title);
                    setIsTitleError(true);
                }
                if (error.fields?.description) {
                    setDescriptionError(error.fields.description);
                    setIsDescriptionError(true);
                }
                if (error.fields?.type) {
                    setTypeError(error.fields.type);
                    setIsTypeError(true);
                }
                if (error.fields?.priority) {
                    setPriorityError(error.fields.priority);
                    setIsPriorityError(true);
                }
            });
    };

    useEffect(() => {
        void dispatch(getProjects());
    }, [dispatch]);

    useEffect(() => {
        if (isProjectError) {
            projectRef.current?.focus();
        } else if (isTypeError) {
            typeRef.current?.focus();
        } else if (isTitleError) {
            titleRef.current?.focus();
        } else if (isDescriptionError) {
            descriptionRef.current?.focus();
        } else if (isPriorityError) {
            priorityRef.current?.focus();
        }
    }, [isProjectError, isTypeError, isTitleError, isDescriptionError, isPriorityError]);

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
                            <SelectTrigger
                                id='project'
                                aria-invalid={projectError ? true : undefined}
                                ref={projectRef}
                                aria-describedby='project-error'
                            >
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
                                <SelectTrigger id='type' ref={typeRef} aria-invalid={typeError ? true : undefined} aria-describedby='type-error'>
                                    <SelectValue placeholder='type' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='BUG'>
                                        <div className='flex items-center'>
                                            <div className='w-6'>
                                                <svg width='18px' height='18px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                    <path
                                                        d='M17.416 2.62412C17.7607 2.39435 17.8538 1.9287 17.624 1.58405C17.3943 1.23941 16.9286 1.14628 16.584 1.37604L13.6687 3.31955C13.1527 3.11343 12.5897 3.00006 12.0001 3.00006C11.4105 3.00006 10.8474 3.11345 10.3314 3.31962L7.41603 1.37604C7.07138 1.14628 6.60573 1.23941 6.37596 1.58405C6.1462 1.9287 6.23933 2.39435 6.58397 2.62412L8.9437 4.19727C8.24831 4.84109 7.75664 5.70181 7.57617 6.6719C8.01128 6.55973 8.46749 6.50006 8.93763 6.50006H15.0626C15.5328 6.50006 15.989 6.55973 16.4241 6.6719C16.2436 5.70176 15.7519 4.841 15.0564 4.19717L17.416 2.62412Z'
                                                        fill='#ef4444'
                                                    />
                                                    <path
                                                        d='M1.25 14.0001C1.25 13.5859 1.58579 13.2501 2 13.2501H5V11.9376C5 11.1019 5.26034 10.327 5.70435 9.68959L3.22141 8.69624C2.83684 8.54238 2.6498 8.10589 2.80366 7.72131C2.95752 7.33673 3.39401 7.1497 3.77859 7.30356L6.91514 8.55841C7.50624 8.20388 8.19807 8.00006 8.9375 8.00006H15.0625C15.8019 8.00006 16.4938 8.20388 17.0849 8.55841L20.2214 7.30356C20.606 7.1497 21.0425 7.33673 21.1963 7.72131C21.3502 8.10589 21.1632 8.54238 20.7786 8.69624L18.2957 9.68959C18.7397 10.327 19 11.1019 19 11.9376V13.2501H22C22.4142 13.2501 22.75 13.5859 22.75 14.0001C22.75 14.4143 22.4142 14.7501 22 14.7501H19V15.0001C19 16.1808 18.7077 17.2932 18.1915 18.2689L20.7786 19.3039C21.1632 19.4578 21.3502 19.8943 21.1963 20.2789C21.0425 20.6634 20.606 20.8505 20.2214 20.6966L17.3288 19.5394C16.1974 20.8664 14.5789 21.7655 12.75 21.9604V15.0001C12.75 14.5858 12.4142 14.2501 12 14.2501C11.5858 14.2501 11.25 14.5858 11.25 15.0001V21.9604C9.42109 21.7655 7.80265 20.8664 6.67115 19.5394L3.77859 20.6966C3.39401 20.8505 2.95752 20.6634 2.80366 20.2789C2.6498 19.8943 2.83684 19.4578 3.22141 19.3039L5.80852 18.2689C5.29231 17.2932 5 16.1808 5 15.0001V14.7501H2C1.58579 14.7501 1.25 14.4143 1.25 14.0001Z'
                                                        fill='#ef4444'
                                                    />
                                                </svg>
                                            </div>
                                            <span>Bug</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='FEATURE'>
                                        <div className='flex items-center'>
                                            <div className='w-6'>
                                                <svg
                                                    fill='#059669'
                                                    height='16px'
                                                    width='16px'
                                                    version='1.1'
                                                    id='Layer_1'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 512.002 512.002'
                                                    xmlSpace='preserve'
                                                >
                                                    <g>
                                                        <g>
                                                            <path
                                                                d='M247.527,264.474l-54.037-16.785L4.892,436.289c-6.521,6.521-6.521,17.086,0,23.607l47.214,47.214
			                                        c3.261,3.261,7.533,4.891,11.803,4.891c4.272,0,8.543-1.63,11.803-4.891L264.31,318.512L247.527,264.474z'
                                                            />
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d='M508.684,231.248l-61.051-81.81l32.78-96.678c2.032-6.01,0.489-12.673-4.011-17.162c-4.5-4.499-11.173-6.031-17.162-4.01
                                                    l-96.678,32.78l-81.81-61.051c-5.097-3.804-11.901-4.381-17.564-1.5c-5.663,2.89-9.194,8.738-9.119,15.096l1.304,102.069
                                                    l-83.354,58.953c-5.184,3.674-7.846,9.967-6.847,16.238c0.988,6.282,5.467,11.445,11.531,13.336l97.494,30.292l30.292,97.494
                                                    c1.891,6.065,7.053,10.542,13.336,11.531c0.869,0.141,1.74,0.207,2.609,0.207c5.369,0,10.466-2.516,13.63-6.985l58.953-83.283
                                                    l102.069,1.443c0.076,0,0.151,0,0.217,0c6.272,0,12.021-3.661,14.879-9.258C513.063,243.288,512.488,236.345,508.684,231.248z'
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span>Feature</span>
                                        </div>
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
                                <SelectTrigger
                                    id='priority'
                                    ref={priorityRef}
                                    aria-invalid={priorityError ? true : undefined}
                                    aria-describedby='priority-error'
                                >
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
