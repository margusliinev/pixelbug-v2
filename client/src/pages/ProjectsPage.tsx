import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';

export default function ProjectsPage() {
    return (
        <section>
            <Link to={'/app/projects/new'}>
                <Button type='button'>New Project</Button>
            </Link>
        </section>
    );
}
