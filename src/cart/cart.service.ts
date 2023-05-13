import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductAddToCartDTO } from './dto/product-add-to-cart.dto';
import { CartItemService } from './cart-item.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartService {
    constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>, private cartItemService: CartItemService) {}

    async addToCart(productAddToCartDTO: ProductAddToCartDTO, user: User) {
        const cartItem = await this.cartItemService.create(productAddToCartDTO);
        let cart = await this.cartRepo.findOne({ where: { userId: user.id } });
        if (cart) {
            cart.cartItems.push(cartItem);
            return this.cartRepo.save(cart);
        } else {
            cart = this.cartRepo.create({ userId: user.id, cartItems: [cartItem] });
            return this.cartRepo.save(cart);
        }
    }

    findAll() {
        return `This action returns all cart`;
    }

    findOne(id: number) {
        return `This action returns a #${id} cart`;
    }

    update(id: number, updateCartDto: UpdateCartDto) {
        return `This action updates a #${id} cart`;
    }

    remove(id: number) {
        return `This action removes a #${id} cart`;
    }
}
