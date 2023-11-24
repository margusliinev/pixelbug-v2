import { CommentWithUser } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui';
import { formatRelative } from 'date-fns';

export default function SingleComment({ comment }: { comment: CommentWithUser }) {
    return (
        <li className='py-4 px-2 border-b last-of-type:border-none grid gap-2'>
            <article className='flex items-center gap-2'>
                <Avatar className='rounded-full h-8 w-8'>
                    <AvatarImage src={comment.user.photo} />
                    <AvatarFallback className='bg-neutral-200'>
                        {comment.user.firstName ? comment.user.firstName.charAt(0).toUpperCase() : comment.user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className='capitalize text-sm'>{formatRelative(new Date(comment.updatedAt), new Date())}</span>
            </article>
            <p>{comment.content}</p>
        </li>
    );
}
