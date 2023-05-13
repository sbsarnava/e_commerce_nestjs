import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    findOne(id: number): Promise<User> | null {
        return this.repo.findOne({ where: { id } });
    }

    findByEmail(email: string): Promise<User> | null {
        return this.repo.findOne({ where: { email } });
    }
}
