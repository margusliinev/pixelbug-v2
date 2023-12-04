import { useState, useEffect, useRef } from 'react';
import { CommentData, DefaultAPIError } from '@/types';
import { Button, Textarea, useToast } from '../ui';
import { useAppDispatch } from '@/hooks';
import { createComment } from '@/features/comments/commentsSlice';
import ButtonSpinner from '../spinners/ButtonSpinner';
import CommentsList from './CommentsList';
import { useNavigate } from 'react-router-dom';

interface Props {
    comments: CommentData[];
    setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
    ticketId: string;
}

export default function Comments({ comments, setComments, ticketId }: Props) {
    const [isCommentError, setIsCommentError] = useState(false);
    const [commentError, setCommentError] = useState('');
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const content = formData.get('content');
        setIsCommentError(false);
        setIsLoading(true);
        dispatch(createComment({ ticketId, content: content as string }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    setIsLoading(false);
                    setComments([res.data, ...comments]);
                    toast({
                        title: 'Comment created',
                        variant: 'default',
                    });
                    (e.target as HTMLFormElement).reset();
                }
            })
            .catch((err: DefaultAPIError) => {
                setIsLoading(false);
                if (err.status === 401) {
                    navigate('/');
                }
                if (err?.fields?.content) {
                    setIsCommentError(true);
                    setCommentError(err?.fields?.content);
                }
            });
    };

    useEffect(() => {
        if (isCommentError) {
            commentRef.current?.select();
        }
    }, [isCommentError]);

    return (
        <div className='rounded-lg p-6 bg-white my-4 border shadow-sm'>
            <form className='grid gap-4 mb-4 max-w-2xl' onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <Textarea
                        name='content'
                        placeholder='Add your comment...'
                        className='min-h-[100px]'
                        aria-label='Add your comment'
                        ref={commentRef}
                        aria-invalid={commentError ? true : undefined}
                        aria-describedby='comment-error'
                        maxLength={100}
                        onChange={() => setCommentError('')}
                    />
                    {commentError ? (
                        <p className='pt-1 text-sm text-destructive' id='comment-error'>
                            {commentError}
                        </p>
                    ) : null}
                </fieldset>
                <Button type='submit' className='w-20'>
                    {isLoading ? <ButtonSpinner /> : 'Submit'}
                </Button>
            </form>
            <h1 className='text-lg font-semibold leading-7 mb-2'>
                Comments <span>{`(${comments.length})`}</span>
            </h1>
            <CommentsList comments={comments} setComments={setComments} />
        </div>
    );
}
