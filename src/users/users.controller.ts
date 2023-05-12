import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/login')
    login() {}

    @Post('/register')
    register(@Body() createUserDto: CreateUserDto) {
        this.usersService.create(createUserDto);
    }

    @Post('/logout')
    logout() {}
}
