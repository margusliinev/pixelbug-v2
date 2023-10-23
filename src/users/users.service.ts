import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

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

    updateUserProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
        console.log(updateUserProfileDto);
        return `This action updates a #${id} user`;
    }

    updateUserPassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto) {
        console.log(updateUserPasswordDto);
        return `This action updates a #${id} user`;
    }

    deleteUserById(id: string) {
        return `This action removes a #${id} user`;
    }
}
