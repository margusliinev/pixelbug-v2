import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from '@prisma/client';

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
            throw new NotFoundException({ success: false, message: 'User not found', fields: null });
        }

        this.exclude(user, 'password');

        return { user };
    }

    async updateUserProfile(userId: string, updateUserProfileDto: UpdateUserProfileDto) {
        const exisitingUsername = await this.prisma.user.findUnique({
            where: {
                username: updateUserProfileDto.username.toLowerCase(),
                NOT: {
                    id: userId,
                },
            },
        });
        if (exisitingUsername) {
            throw new ConflictException({
                success: false,
                message: 'Validation failed',
                fields: { email: 'Username is already in use' },
            });
        }

        const existingEmail = await this.prisma.user.findUnique({
            where: {
                email: updateUserProfileDto.email.toLowerCase(),
                NOT: {
                    id: userId,
                },
            },
        });
        if (existingEmail) {
            throw new ConflictException({
                success: false,
                message: 'Validation failed',
                fields: { email: 'Email is already in use' },
            });
        }

        const updateData: Partial<User> = {
            username: updateUserProfileDto.username.toLowerCase(),
            email: updateUserProfileDto.email.toLowerCase(),
        };

        if (updateUserProfileDto.firstName) {
            updateData.firstName = updateUserProfileDto.firstName;
        }
        if (updateUserProfileDto.lastName) {
            updateData.lastName = updateUserProfileDto.lastName;
        }
        if (updateUserProfileDto.jobTitle) {
            updateData.jobTitle = updateUserProfileDto.jobTitle;
        }
        if (updateUserProfileDto.photo) {
            const url = await this.cloudinary.uploadPhoto(updateUserProfileDto.photo);
            updateData.photo = url;
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        this.exclude(updatedUser, 'password');

        return { user: updatedUser };
    }

    updateUserPassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto) {
        console.log(updateUserPasswordDto);
        return `This action updates a #${id} user`;
    }

    deleteUserById(id: string) {
        return `This action removes a #${id} user`;
    }
}
