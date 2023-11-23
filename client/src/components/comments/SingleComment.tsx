import { CommentWithUser } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui';

export default function SingleComment({ comment }: { comment: CommentWithUser }) {
    return (
        <li>
            <div className='flex items-center gap-2'>
                <Avatar className='rounded-full'>
                    <AvatarImage src={comment.user.photo} />
                    <AvatarFallback className='bg-neutral-200'>
                        {comment.user.firstName ? comment.user.firstName.charAt(0).toUpperCase() : comment.user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <p>{comment.content}</p>
            </div>
        </li>
    );
}
