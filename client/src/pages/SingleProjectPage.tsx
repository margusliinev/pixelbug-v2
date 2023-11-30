import { format, formatDistanceStrict } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Folder } from '@/assets/icons';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import { getProject } from '@/features/project/projectSlice';
import BreadCrumbs from '@/components/Breadcrumbs';
import StatusCell from '@/components/projects/StatusCell';
import PageSpinner from '@/components/PageSpinner';

export default function SingleProjectPage() {
    const { isLoading, project } = useAppSelector((store) => store.project);
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (project && project.id === id) return;
        void dispatch(getProject(id || ''));
    }, [dispatch, id, project]);

    if (isLoading) {
        return <PageSpinner />;
    }

    if (!project) {
        return (
            <div className='grid place-items-center w-full text-center'>
                <div className='flex flex-col items-center gap-2'>
                    <Folder width={10} height={10} />
                    <h1 className='font-semibold text-lg mb-1'>No Project Found</h1>
                    <h2 className='text-secondary-foreground text-md'>Please go back and find the project again!</h2>
                    <Link to={'/app/tickets'} className='whitespace-nowrap mt-4'>
                        <Button type='button'>All Projects</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section>
            <div className='grid gap-4 justify-items-start xs:flex xs:items-center xs:justify-between'>
                <BreadCrumbs url='projects' child={project.id} alias='project' />
                <div className='flex items-center gap-2 '></div>
            </div>
            <div className='bg-white rounded-lg border p-6 mt-4 shadow-sm'>
                <div className='px-4 sm:px-0 flex items-center gap-2'>
                    <Avatar className='h-8 w-8 rounded-none'>
                        <AvatarImage src={project.avatar ? project.avatar : undefined} className='rounded-none' />
                        <AvatarFallback className='rounded-none bg-gray-200'>{project.title[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h1 className='text-md font-semibold leading-7'>{project.title}</h1>
                </div>
                <div className='mt-6 border-t border-neutral-200 text-sm'>
                    <dl className='divide-y divide-neutral-200'>
                        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6 grid items-center'>Description</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>{project.description}</dd>
                        </div>
                        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Lead</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0 flex items-center gap-2'>
                                <Avatar className='h-8 w-8 rounded-full'>
                                    <AvatarImage src={project.lead.photo ? project.lead.photo : undefined} className='rounded-none' />
                                    <AvatarFallback className='rounded-none bg-gray-200'>{project.lead.name[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {project.lead.name}
                            </dd>
                        </div>
                        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6'>Status</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0 -ml-2'>
                                <StatusCell status={project.status} />
                            </dd>
                        </div>
                        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6 text-gray-900'>Start Date</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                                <p>{format(new Date(project.startDate), 'PPP')}</p>
                            </dd>
                        </div>
                        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6 text-gray-900'>Due Date</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                                <p>{project.dueDate ? format(new Date(project.dueDate), 'PPP') : 'Project is not yet completed'}</p>
                            </dd>
                        </div>
                        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                            <dt className='font-medium leading-6 text-gray-900'>Completion Time</dt>
                            <dd className='mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0'>
                                <p>
                                    {project.endDate
                                        ? formatDistanceStrict(new Date(project.endDate), new Date(project.createdAt))
                                        : 'Will be calculated once ticket is resolved'}
                                </p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
}
