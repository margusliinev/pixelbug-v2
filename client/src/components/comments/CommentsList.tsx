import { CommentWithUser } from '@/types';
import SingleComment from './SingleComment';

export default function CommentsList({ comments }: { comments: CommentWithUser[] }) {
    return (
        <ul className='grid gap-4'>
            {comments.map((comment) => {
                return <SingleComment key={comment.id} comment={comment} />;
            })}
        </ul>
    );
}
