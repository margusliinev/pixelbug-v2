import { CommentData, DefaultAPIError } from '@/types';
import { Avatar, AvatarFallback, AvatarImage, Textarea, useToast } from '../ui';
import { formatRelative } from 'date-fns';
import { enIE } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Edit, Trash } from '@/assets/icons';
import { useState, useEffect, useRef } from 'react';
import { CheckIcon, X } from 'lucide-react';
import { deleteComment, updateComment } from '@/features/comments/commentsSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
    comment: CommentData;
    setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

export default function SingleComment({ comment, setComments }: Props) {
    const { user } = useAppSelector((store) => store.user);
    const editCommentRef = useRef<HTMLTextAreaElement>(null);
    const [isCommentError, setIsCommentError] = useState(false);
    const [commentError, setCommentError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const content = formData.get('edit-comment');
        setIsCommentError(false);
        dispatch(updateComment({ commentId: comment.id, content: content as string }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    setCommentError('');
                    setIsEditing(false);
                    setComments((prev) => prev.map((prevComment) => (prevComment.id === res.data.id ? res.data : prevComment)));
                    toast({
                        title: 'Comment updated',
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                } else if (err.status === 403) {
                    toast({
                        title: 'You are not authorized to update this comment',
                        variant: 'destructive',
                    });
                }
                if (err?.fields?.content) {
                    setIsCommentError(true);
                    setCommentError(err?.fields?.content);
                }
            });
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(deleteComment(comment.id))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    setComments((prev) => prev.filter((prevComment) => prevComment.id !== res.data));
                    toast({
                        title: 'Comment deleted',
                        variant: 'default',
                    });
                }
            })
            .catch((err: DefaultAPIError) => {
                if (err.status === 401) {
                    navigate('/');
                } else if (err.status === 403) {
                    toast({
                        title: 'You are not authorized to delete this comment',
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: 'Failed to delete comment',
                        variant: 'destructive',
                    });
                }
            });
    };

    useEffect(() => {
        if (isCommentError) {
            editCommentRef.current?.select();
        }
    }, [isCommentError]);

    return (
        <li className='py-4 px-2 border-b last-of-type:border-none grid gap-2'>
            <article className='flex items-center gap-2'>
                <Avatar className='rounded-full h-8 w-8'>
                    <AvatarImage src={comment.user.photo} />
                    <AvatarFallback className='bg-neutral-200'>{comment.user.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className='text-sm'>
                    {formatRelative(new Date(comment.createdAt), new Date(), {
                        locale: enIE,
                    })[0].toUpperCase() + formatRelative(new Date(comment.createdAt), new Date(), { locale: enIE }).slice(1)}
                </span>
                {user && user.id === comment.user.id && !isEditing && (
                    <div className='flex items-center gap-2'>
                        <button
                            type='button'
                            className='text-sm'
                            aria-label='Edit comment'
                            onClick={() => {
                                setCommentError('');
                                setIsEditing(true);
                            }}
                        >
                            <Edit />
                        </button>
                        <button type='button' className='text-sm' aria-label='Delete comment' onClick={handleDelete}>
                            <Trash />
                        </button>
                    </div>
                )}
                {user && user.id === comment.user.id && isEditing && (
                    <div className='flex items-center gap-2'>
                        <button type='submit' className='text-sm' aria-label='Confirm Edit' form='confirm-edit'>
                            <CheckIcon color='#059669' size={'22'} />
                        </button>
                        <button type='button' className='text-sm' aria-label='Cancel Edit' onClick={() => setIsEditing(false)}>
                            <X color='#ef4444' size={'22'} />
                        </button>
                    </div>
                )}
            </article>
            {isEditing ? (
                <form onSubmit={handleSubmit} noValidate id='confirm-edit'>
                    <Textarea
                        name='edit-comment'
                        className='text-sm sm:text-base'
                        placeholder='Add your comment...'
                        aria-label='Add your comment'
                        defaultValue={comment.content}
                        ref={editCommentRef}
                        aria-invalid={commentError ? true : undefined}
                        aria-describedby='comment-error'
                        maxLength={100}
                        onChange={() => setCommentError('')}
                    ></Textarea>
                    {commentError ? (
                        <p className='pt-1 text-sm text-destructive' id='comment-error'>
                            {commentError}
                        </p>
                    ) : null}
                </form>
            ) : (
                <p className='text-sm sm:text-base'>{comment.content}</p>
            )}
        </li>
    );
}
