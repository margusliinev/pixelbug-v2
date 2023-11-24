import { CommentWithUser } from '@/types';
import { Button, Textarea } from '../ui';
import { useAppSelector } from '@/hooks';
import ButtonSpinner from '../ButtonSpinner';
import CommentsList from './CommentsList';

export default function Comments({ comments }: { comments: CommentWithUser[] }) {
    const { isLoading } = useAppSelector((store) => store.comments);

    return (
        <div className='rounded-lg p-6 bg-white my-4 border shadow-sm'>
            <form className='grid gap-4 mb-4 max-w-2xl' noValidate>
                <Textarea placeholder='Add your comment...' className='min-h-[100px]' />
                <Button type='submit' className='w-fit'>
                    {isLoading ? <ButtonSpinner /> : 'Submit'}
                </Button>
            </form>
            <h1 className='text-lg font-semibold leading-7 mb-2'>
                Comments <span>{`(${comments.length})`}</span>
            </h1>
            <CommentsList comments={comments} />
        </div>
    );
}
