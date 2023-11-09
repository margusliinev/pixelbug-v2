import { useEffect } from 'react';
import { ProjectsTable } from '@/components/projects/Table';
import { columns } from '@/components/projects/Columns';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getProjects } from '@/features/projects/projectsSlice';
import { Folder } from '@/assets/icons';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import PageSpinner from '@/components/PageSpinner';

export default function ProjectsPage() {
    const { isLoading, projects } = useAppSelector((store) => store.projects);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getProjects());
    }, [dispatch]);

    if (isLoading) {
        return <PageSpinner />;
    }

    if (!projects || projects.length < 1) {
        return (
            <div className='grid place-items-center w-full text-center'>
                <div className='flex flex-col items-center gap-2'>
                    <Folder height={10} width={10} />
                    <h1 className='font-semibold text-lg mb-1'>No Projects Found</h1>
                    <h2 className='text-secondary-foreground text-md'>Get started by creating a new project!</h2>
                    <Link to={'/app/projects/new'} className='whitespace-nowrap mt-4'>
                        <Button type='button'>New Project</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section>
            <ProjectsTable columns={columns} data={projects} />
        </section>
    );
}
