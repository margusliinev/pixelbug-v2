import { useEffect } from 'react';
import { ProjectsTable } from '@/components/projects/Table';
import { columns } from '@/components/projects/Columns';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getProjects } from '@/features/projects/projectsSlice';
import PageSpinner from '@/components/PageSpinner';

export default function ProjectsPage() {
    const { isLoading, projects } = useAppSelector((store) => store.projects);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!projects || projects.length === 0) {
            void dispatch(getProjects());
        }
    }, [dispatch, projects]);

    if (isLoading) {
        return <PageSpinner />;
    }

    return (
        <section>
            <ProjectsTable columns={columns} data={projects} />
        </section>
    );
}
