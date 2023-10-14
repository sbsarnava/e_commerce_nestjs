import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IsstaffGuard } from 'src/guards/isstaff/isstaff.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, description: 'Logs in User'})
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }

  @ApiResponse({ status: 201, description: 'Registers users'})
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiResponse({ status: 200, description: 'Returns details of users'})
  @Get('who-am-i')
  @UseGuards(AuthGuard)
  whoAmI(@Request() request: any) {
    return request.user;
  }

  @ApiResponse({ status: 200, description: 'Returns an response if the user is staff'})
  @Get('am-i-staff')
  @UseGuards(IsstaffGuard)
  amIStaff(@Request() request: any) {
    return request.user;
  }
}
