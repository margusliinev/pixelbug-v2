import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    useToast,
} from '../ui';
import { DefaultAPIError, ProjectData } from '@/types';
import { useAppDispatch } from '@/hooks';
import { deleteProject } from '@/features/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';

export default function DeleteProjectModal({ project }: { project: ProjectData }) {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = () => {
        dispatch(deleteProject(project.id))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    navigate('/app/projects');
                    toast({
                        title: 'Project was deleted',
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                } else if (err.status === 403) {
                    toast({
                        title: `${err.message}`,
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: `Failed to delete the project`,
                        variant: 'destructive',
                    });
                }
            });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className='bg-destructive text-white transition-colors w-fit h-10 px-3 rounded-md text-sm font-medium hover:bg-destructive-hover'>
                Delete Project
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project and all the associated data (tickets, comments etc.)
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-destructive hover:bg-destructive-hover' onClick={handleSubmit}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
