import { Injectable } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
    getAllUsers() {
        const user = {
            username: 'test',
            email: 'test@gmail.com',
            password: '123456',
        };
        return { user };
    }

    getUserById(id: string) {
        return `This action returns a #${id} user`;
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
