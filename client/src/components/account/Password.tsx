import { useState, useEffect, useRef } from 'react';
import { updateUserPassword } from '@/features/user/userSlice';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, TabsContent } from '../ui';
import { useAppDispatch } from '@/hooks';
import { DefaultAPIError } from '@/types';
import ButtonSpinner from '../ButtonSpinner';

export default function Password() {
    const [isLoading, setIsLoading] = useState(false);
    const [isCurrentPasswordError, setIsCurrentPasswordError] = useState(false);
    const [isNewPasswordError, setIsNewPasswordError] = useState(false);
    const [isConfirmNewPasswordError, setIsConfirmNewPasswordError] = useState(false);
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get('current') as string;
        const newPassword = formData.get('new') as string;
        const confirmNewPassword = formData.get('confirm') as string;
        setIsLoading(true);
        setIsCurrentPasswordError(false);
        setIsNewPasswordError(false);
        setIsConfirmNewPasswordError(false);
        dispatch(updateUserPassword({ currentPassword, newPassword, confirmNewPassword }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    (e.target as HTMLFormElement).reset();
                }
            })
            .catch((error: DefaultAPIError) => {
                console.log(error);
                if (error.fields?.currentPassword) {
                    setIsCurrentPasswordError(true);
                    setCurrentPasswordError(error.fields.currentPassword);
                }
                if (error.fields?.newPassword) {
                    setIsNewPasswordError(true);
                    setNewPasswordError(error.fields.newPassword);
                }
                if (error.fields?.confirmNewPassword) {
                    setIsConfirmNewPasswordError(true);
                    setConfirmNewPasswordError(error.fields.confirmNewPassword);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (isCurrentPasswordError) {
            currentPasswordRef.current?.focus();
        } else if (isNewPasswordError) {
            newPasswordRef.current?.focus();
        } else if (isConfirmNewPasswordError) {
            confirmNewPasswordRef.current?.focus();
        }
    }, [isCurrentPasswordError, isNewPasswordError, isConfirmNewPasswordError]);

    return (
        <TabsContent value='password' className='mt-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
                </CardHeader>
                <CardContent className='max-w-2xl'>
                    <form className='grid gap-4' onSubmit={handleSubmit} noValidate>
                        <fieldset className='space-y-1' disabled={isLoading}>
                            <Label htmlFor='current'>Current password</Label>
                            <Input
                                type='password'
                                id='current'
                                name='current'
                                ref={currentPasswordRef}
                                aria-invalid={currentPasswordError ? true : undefined}
                                aria-describedby='currentPassword-error'
                                onChange={() => setCurrentPasswordError('')}
                            />
                            {currentPasswordError ? (
                                <p className='pt-1 text-sm text-destructive' id='currentPassword-error'>
                                    {currentPasswordError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-1' disabled={isLoading}>
                            <Label htmlFor='new'>New password</Label>
                            <Input
                                type='password'
                                id='new'
                                name='new'
                                ref={newPasswordRef}
                                aria-invalid={newPasswordError ? true : undefined}
                                aria-describedby='newPassword-error'
                                onChange={() => setNewPasswordError('')}
                            />
                            {newPasswordError ? (
                                <p className='pt-1 text-sm text-destructive' id='newPassword-error'>
                                    {newPasswordError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-1' disabled={isLoading}>
                            <Label htmlFor='confirm'>Confirm new password</Label>
                            <Input
                                type='password'
                                id='confirm'
                                name='confirm'
                                ref={confirmNewPasswordRef}
                                aria-invalid={confirmNewPasswordError ? true : undefined}
                                aria-describedby='confirmNewPassword-error'
                                onChange={() => setConfirmNewPasswordError('')}
                            />
                            {confirmNewPasswordError ? (
                                <p className='pt-1 text-sm text-destructive' id='confirmNewPassword-error'>
                                    {confirmNewPasswordError}
                                </p>
                            ) : null}
                        </fieldset>
                        <Button type='submit' className='mt-2 w-36' disabled={isLoading}>
                            {isLoading ? <ButtonSpinner /> : 'Save password'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
