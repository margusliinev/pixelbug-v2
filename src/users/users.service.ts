import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private cloudinary: CloudinaryService,
    ) {}

    private exclude(user: User, key: keyof User) {
        delete user[key];
        return user;
    }

    async getCurrentUser(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException({ success: false, message: 'User not found', status: 404, fields: null });
        }

        this.exclude(user, 'password');

        return { user };
    }

    async updateUserProfile(userId: string, updateUserProfileDto: UpdateUserProfileDto) {
        const { username, email, firstName, lastName, phone, jobTitle, photo } = updateUserProfileDto;

        const exisitingUsername = await this.prisma.user.findUnique({
            where: {
                username: username.toLowerCase(),
                NOT: {
                    id: userId,
                },
            },
        });
        if (exisitingUsername) {
            throw new ConflictException({
                success: false,
                message: 'Validation failed',
                status: 409,
                fields: { username: 'Username is already in use' },
            });
        }

        const existingEmail = await this.prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
                NOT: {
                    id: userId,
                },
            },
        });
        if (existingEmail) {
            throw new ConflictException({
                success: false,
                message: 'Validation failed',
                status: 409,
                fields: { email: 'Email is already in use' },
            });
        }

        const updateData: Partial<User> = {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            firstName: firstName || null,
            lastName: lastName || null,
            jobTitle: jobTitle || null,
        };

        if (phone) {
            const existingPhone = await this.prisma.user.findUnique({ where: { phone: phone, NOT: { id: userId } } });
            if (existingPhone) {
                throw new ConflictException({
                    success: false,
                    message: 'Validation failed',
                    status: 409,
                    fields: { phone: 'Phone number is already in use' },
                });
            }
            updateData.phone = phone;
        } else {
            updateData.phone = null;
        }

        if (photo) {
            const url = await this.cloudinary.uploadPhoto(photo);
            updateData.photo = url;
        }

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        this.exclude(updatedUser, 'password');

        return { user: updatedUser };
    }

    async updateUserPassword(userId: string, updateUserPasswordDto: UpdateUserPasswordDto) {
        const { currentPassword, newPassword, confirmNewPassword } = updateUserPasswordDto;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to change password', status: 500, fields: null });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new ConflictException({
                success: false,
                message: 'Validation failed',
                status: 409,
                fields: { currentPassword: 'Current password is incorrect' },
            });
        }

        if (newPassword !== confirmNewPassword) {
            throw new ConflictException({
                success: false,
                message: 'Validation failed',
                status: 409,
                fields: { confirmNewPassword: 'Passwords do not match' },
            });
        }

        const hash = await bcrypt.hash(newPassword, 10);

        const updatedUser = await this.prisma.user.update({ where: { id: userId }, data: { password: hash } });
        if (!updatedUser) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to change password', status: 500, fields: null });
        }
    }

    async deleteUserById(userId: string) {
        const deletedUser = await this.prisma.user.delete({ where: { id: userId } });
        if (!deletedUser) {
            throw new InternalServerErrorException({ success: false, message: 'Failed to delete user', status: 500, fields: null });
        }
    }
}
