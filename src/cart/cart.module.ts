import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartItemService } from './cart-item.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartItem]), ProductsModule],
    controllers: [CartController],
    providers: [CartService, CartItemService],
})
export class CartModule {}
