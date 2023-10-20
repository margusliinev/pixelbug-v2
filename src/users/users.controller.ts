import { Controller, Get, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
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
