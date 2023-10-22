import { Controller, Get, Body, Patch, Put, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { AuthenticatedRequest } from 'src/types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    async getCurrentUser(@Req() req: AuthenticatedRequest) {
        const { user } = await this.usersService.getCurrentUser(req.user.id);
        return { success: true, data: user };
    }

    @Patch(':id')
    updateUserProfile(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
        return this.usersService.updateUserProfile(id, updateUserProfileDto);
    }

    @Put(':id')
    updateUserPassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
        return this.usersService.updateUserProfile(id, updateUserPasswordDto);
    }

    @Delete(':id')
    deleteUserById(@Param('id') id: string) {
        return this.usersService.deleteUserById(id);
    }
}
