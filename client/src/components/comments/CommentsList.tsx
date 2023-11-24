import { CommentWithUser } from '@/types';
import SingleComment from './SingleComment';

interface Props {
    comments: CommentWithUser[];
    setComments: React.Dispatch<React.SetStateAction<CommentWithUser[]>>;
}

export default function CommentsList({ comments, setComments }: Props) {
    return (
        <ul className='grid'>
            {comments.map((comment) => {
                return <SingleComment key={comment.id} comment={comment} setComments={setComments} />;
            })}
        </ul>
    );
}
