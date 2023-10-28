import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { updateUserProfile } from '@/features/user/userSlice';
import { DefaultAPIError } from '@/types';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    TabsContent,
} from '../ui';
import ButtonSpinner from '../ButtonSpinner';

export default function Profile() {
    const [photoError, setPhotoError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [jobTitleError, setJobTitleError] = useState('');
    const [isPhotoError, setIsPhotoError] = useState(false);
    const [isFirstNameError, setIsFirstNameError] = useState(false);
    const [isLastNameError, setIsLastNameError] = useState(false);
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isJobTitleError, setIsJobTitleError] = useState(false);
    const photoRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const jobTitleRef = useRef<HTMLInputElement>(null);
    const { isLoading, user } = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setIsPhotoError(false);
        setIsFirstNameError(false);
        setIsLastNameError(false);
        setIsUsernameError(false);
        setIsEmailError(false);
        setIsJobTitleError(false);
        dispatch(updateUserProfile(formData))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    (e.target as HTMLFormElement).reset();
                }
            })
            .catch((error: DefaultAPIError) => {
                if (error.fields?.photo) {
                    setIsPhotoError(true);
                    setPhotoError(error.fields.photo);
                }
                if (error.fields?.firstName) {
                    setIsFirstNameError(true);
                    setFirstNameError(error.fields.firstName);
                }
                if (error.fields?.lastName) {
                    setIsLastNameError(true);
                    setLastNameError(error.fields.lastName);
                }
                if (error.fields?.username) {
                    setIsUsernameError(true);
                    setUsernameError(error.fields.username);
                }
                if (error.fields?.email) {
                    setIsEmailError(true);
                    setEmailError(error.fields.email);
                }
                if (error.fields?.jobTitle) {
                    setIsJobTitleError(true);
                    setJobTitleError(error.fields.jobTitle);
                }
            });
    };

    useEffect(() => {
        if (isPhotoError) {
            photoRef.current?.focus();
        } else if (isFirstNameError) {
            firstNameRef.current?.focus();
        } else if (isLastNameError) {
            lastNameRef.current?.focus();
        } else if (isUsernameError) {
            usernameRef.current?.focus();
        } else if (isEmailError) {
            emailRef.current?.focus();
        } else if (isJobTitleError) {
            jobTitleRef.current?.focus();
        }
    }, [isPhotoError, isFirstNameError, isLastNameError, isEmailError, isUsernameError, isJobTitleError]);

    return (
        <TabsContent value='profile' className='mt-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Make changes to your profile here. Click save when you&apos;re done.</CardDescription>
                </CardHeader>
                <CardContent className='max-w-2xl'>
                    <form className='grid gap-4' onSubmit={handleSubmit} noValidate>
                        <div className='grid w-full items-center gap-4 xxs:flex'>
                            <Avatar className='h-24 w-24 rounded-md'>
                                <AvatarImage src={user?.photo ? user?.photo : undefined} className='rounded-md' />
                                <AvatarFallback className='rounded-md bg-gray-200 text-2xl'>
                                    {user?.firstName ? user?.firstName.charAt(0).toUpperCase() : user?.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <fieldset className='w-full space-y-1' disabled={isLoading}>
                                <Label htmlFor='photo' className='mb-4 text-sm tracking-tight text-secondary-foreground'>
                                    JPG or PNG. 0.5 MB max.
                                </Label>
                                <Input
                                    type='file'
                                    name='photo'
                                    id='photo'
                                    accept='image/*'
                                    className='w-full max-w-xxs'
                                    ref={photoRef}
                                    aria-invalid={photoError ? true : undefined}
                                    aria-describedby='photo-error'
                                    onChange={() => setPhotoError('')}
                                />
                                {photoError ? (
                                    <p className='pt-1 text-sm text-destructive' id='photo-error'>
                                        {photoError}
                                    </p>
                                ) : null}
                            </fieldset>
                        </div>
                        <div className='grid gap-3 xxs:flex w-full items-center xxs:gap-4 xxs:items-start'>
                            <fieldset className='w-full space-y-1' disabled={isLoading}>
                                <Label htmlFor='firstName'>First Name</Label>
                                <Input
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    defaultValue={user?.firstName ? user?.firstName : ''}
                                    ref={firstNameRef}
                                    aria-invalid={firstNameError ? true : undefined}
                                    aria-describedby='firstName-error'
                                    onChange={() => setFirstNameError('')}
                                />
                                {firstNameError ? (
                                    <p className='pt-1 text-sm text-destructive' id='firstName-error'>
                                        {firstNameError}
                                    </p>
                                ) : null}
                            </fieldset>
                            <fieldset className='w-full space-y-1' disabled={isLoading}>
                                <Label htmlFor='lastName'>Last Name</Label>
                                <Input
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    defaultValue={user?.lastName ? user?.lastName : ''}
                                    ref={lastNameRef}
                                    aria-invalid={lastNameError ? true : undefined}
                                    aria-describedby='lastName-error'
                                    onChange={() => setLastNameError('')}
                                />
                                {lastNameError ? (
                                    <p className='pt-1 text-sm text-destructive' id='lastName-error'>
                                        {lastNameError}
                                    </p>
                                ) : null}
                            </fieldset>
                        </div>
                        <fieldset className='space-y-1' disabled={isLoading}>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                type='text'
                                id='username'
                                name='username'
                                defaultValue={user?.username}
                                ref={usernameRef}
                                aria-invalid={usernameError ? true : undefined}
                                aria-describedby='username-error'
                                onChange={() => setUsernameError('')}
                            />
                            {usernameError ? (
                                <p className='pt-1 text-sm text-destructive' id='username-error'>
                                    {usernameError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-1' disabled={isLoading}>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                type='text'
                                id='email'
                                name='email'
                                defaultValue={user?.email}
                                ref={emailRef}
                                aria-invalid={emailError ? true : undefined}
                                aria-describedby='email-error'
                                onChange={() => setEmailError('')}
                            />
                            {emailError ? (
                                <p className='pt-1 text-sm text-destructive' id='email-error'>
                                    {emailError}
                                </p>
                            ) : null}
                        </fieldset>
                        <fieldset className='space-y-1' disabled={isLoading}>
                            <Label htmlFor='jobTitle'>Job Title</Label>
                            <Input
                                type='text'
                                id='jobTitle'
                                name='jobTitle'
                                defaultValue={user?.jobTitle ? user?.jobTitle : ''}
                                ref={jobTitleRef}
                                aria-invalid={jobTitleError ? true : undefined}
                                aria-describedby='jobTitle-error'
                                onChange={() => setJobTitleError('')}
                            />
                            {jobTitleError ? (
                                <p className='pt-1 text-sm text-destructive' id='jobTitle-error'>
                                    {jobTitleError}
                                </p>
                            ) : null}
                        </fieldset>
                        <Button type='submit' className='mt-2 w-32' disabled={isLoading}>
                            {isLoading ? <ButtonSpinner /> : 'Save changes'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
