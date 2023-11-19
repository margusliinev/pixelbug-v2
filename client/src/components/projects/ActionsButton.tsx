import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
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
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    useToast,
} from '../ui';
import { DefaultAPIError, ProjectWithLead } from '@/types';
import { useAppDispatch } from '@/hooks';
import { archiveProject, deleteProject } from '@/features/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';

export default function ActionButton({ project }: { project: ProjectWithLead }) {
    const [warning, setWarning] = useState(false);
    const [alert, setAlert] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleArchiveProject = () => {
        dispatch(archiveProject(project.id))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast({
                        title: `Project was archived`,
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                } else if (err.status === 403) {
                    toast({
                        title: 'Only project lead can archive the project',
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: `Failed to archive the project`,
                        variant: 'destructive',
                    });
                }
            });
    };

    const handleDeleteProject = () => {
        dispatch(deleteProject(project.id))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast({
                        title: `Project was deleted`,
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                } else if (err.status === 403) {
                    toast({
                        title: 'Only project lead can delete the project',
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
        <DropdownMenu open={dropdown} onOpenChange={setDropdown} modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='p-0'>
                <AlertDialog open={warning} onOpenChange={setWarning}>
                    <AlertDialogTrigger className='text-sm pl-4 pr-0 py-2 w-full h-full text-left font-medium text-black hover:bg-gray-100'>
                        Archive
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will remove this project from your active workspace and will then be only visible in the archive.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDropdown(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className='bg-secondary-foreground hover:bg-secondary-hover'
                                onClick={() => {
                                    setDropdown(false);
                                    handleArchiveProject();
                                }}
                            >
                                Archive
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog open={alert} onOpenChange={setAlert}>
                    <AlertDialogTrigger className='text-sm pl-4 pr-0 py-2 w-full h-full text-left font-medium text-destructive hover:bg-gray-100'>
                        Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the project and all the associated data (tickets, comments,
                                project details).
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDropdown(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className='bg-destructive hover:bg-destructive-hover'
                                onClick={() => {
                                    setDropdown(false);
                                    handleDeleteProject();
                                }}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
