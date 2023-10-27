import { Controller, Get, Body, Patch, Put, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { AuthenticatedRequest } from 'src/types';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    async getCurrentUser(@Req() req: AuthenticatedRequest) {
        const { user } = await this.usersService.getCurrentUser(req.user.id);
        return { success: true, data: user };
    }

    @Patch('me')
    @FormDataRequest({ storage: FileSystemStoredFile, fileSystemStoragePath: './uploads' })
    async updateUserProfile(@Req() req: AuthenticatedRequest, @Body() updateUserProfileDto: UpdateUserProfileDto) {
        const { user } = await this.usersService.updateUserProfile(req.user.id, updateUserProfileDto);
        return { success: true, data: user };
    }

    @Put('me')
    updateUserPassword(@Req() req: AuthenticatedRequest, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
        console.log(updateUserPasswordDto);
        // return this.usersService.updateUserProfile(req.user.id, updateUserPasswordDto);
    }

    @Delete('me')
    deleteUserById(@Req() req: AuthenticatedRequest) {
        return this.usersService.deleteUserById(req.user.id);
    }
}
