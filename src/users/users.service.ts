import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    login(loginUserDto: LoginUserDto) {}

    create(createUserDto: CreateUserDto) {
        bcrypt.genSalt(SALT_ROUNDS).then((salt) => {
            bcrypt.hash(createUserDto.password, salt).then((hashedPassword) => {
                createUserDto.password = hashedPassword;
                console.log(createUserDto);
            });
        });
    }

    findOne(id: number): Promise<User> | null {
        return this.userRepository.findOne({ where: { id } });
    }
}
