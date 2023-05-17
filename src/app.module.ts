import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cart-item.entity';
import { AuthGuard } from './guards/auth/auth.guard';
import { IsstaffGuard } from './guards/isstaff/isstaff.guard';
import { UtilService } from './util/util.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            entities: [User, Product, Cart, CartItem],
            database: 'e_commerce.sqlite',
            synchronize: true,
        }),
        UsersModule,
        ProductsModule,
        CartModule,
    ],
    controllers: [AppController],
    providers: [AppService, UtilService],
})
export class AppModule {}
