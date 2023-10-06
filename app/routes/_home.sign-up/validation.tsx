import type { User } from '@prisma/client';

const usernameRegex = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){3,39}$/;
const emailRegex = /^[^\s@]{1,50}@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%&*,.?]{8,50}$/;

export function validateUsername(username: User['username']) {
    if (typeof username !== 'string' || username.length === 0) {
        return 'Username is required';
    }
    if (username.length < 3 || username.length > 39) {
        return 'Username must be between 3 and 39 characters';
    }

    if (username.startsWith('-')) {
        return 'Username cannot start with a hyphen';
    }

    if (username.endsWith('-')) {
        return 'Username cannot end with a hyphen';
    }

    if (!usernameRegex.test(username)) {
        return 'Username can only contain letters (A-Z), numbers (0-9), and hyphens (-)';
    }

    return null;
}

export function validateEmail(email: User['email']) {
    if (typeof email !== 'string' || email.length === 0) {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Email is invalid';
    }

    return null;
}

export function validatePassword(password: User['password']) {
    if (typeof password !== 'string' || password.length === 0) {
        return 'Password is required';
    }
    if (password.length < 8 || password.length > 50) {
        return 'Password must be between 8 and 50 characters';
    }

    if (!/(?=.*[A-Za-z])/.test(password)) {
        return 'Password must contain at least one letter';
    }

    if (!/(?=.*\d)/.test(password)) {
        return 'Password must contain at least one number';
    }

    if (!passwordRegex.test(password)) {
        return 'Password can only contain the following special characters: !@#$%&*,.?';
    }

    return null;
}
