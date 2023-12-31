import { Controller, Get, Body, Patch, Put, Delete, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { AuthenticatedRequest } from 'src/types';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        const { users } = await this.usersService.getAllUsers();
        return { success: true, message: 'Users retrieved', data: users };
    }

    @Get('me')
    async getCurrentUser(@Req() req: AuthenticatedRequest) {
        const { user } = await this.usersService.getCurrentUser(req.user.id);
        return { success: true, message: 'User retrieved', data: user };
    }

    @Patch('me')
    @FormDataRequest({ storage: FileSystemStoredFile, fileSystemStoragePath: './uploads' })
    async updateUserProfile(@Req() req: AuthenticatedRequest, @Body() updateUserProfileDto: UpdateUserProfileDto) {
        const { user } = await this.usersService.updateUserProfile(req.user.id, updateUserProfileDto);
        return { success: true, message: 'Profile updated', data: user };
    }

    @Put('me')
    async updateUserPassword(@Req() req: AuthenticatedRequest, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
        await this.usersService.updateUserPassword(req.user.id, updateUserPasswordDto);
        return { success: true, message: 'Password updated' };
    }

    @Delete('me')
    async deleteUserById(@Req() req: AuthenticatedRequest, @Res({ passthrough: true }) res: Response) {
        res.clearCookie('__session');
        await this.usersService.deleteUserById(req.user.id);
        return { success: true, message: 'Your account was deleted' };
    }
}
