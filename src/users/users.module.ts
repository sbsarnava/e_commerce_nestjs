import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'env';
import { UsersRepository } from './users.repo';
import { IsstaffGuard } from 'src/guards/isstaff/isstaff.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersService, UsersRepository, IsstaffGuard, AuthGuard],
})
export class UsersModule {}
