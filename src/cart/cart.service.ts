import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductAddToCartDTO } from './dto/product-add-to-cart.dto';
import { CartItemService } from './cart-item.service';
import { UserJWT } from 'src/models/user-jwt.model';

@Injectable()
export class CartService {
    constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>, private cartItemService: CartItemService) {}

    async addToCart(productAddToCartDTO: ProductAddToCartDTO, user: UserJWT) {
        const cartItem = await this.cartItemService.create(productAddToCartDTO);
        let cart = await this.cartRepo.findOne({ where: { user: user } });
        if (cart) {
            const isCartItemPresent = cart.cartItems.some((item) => item === cartItem);
            if (isCartItemPresent) {
                const cartItemIndex = cart.cartItems.indexOf(cartItem);
                cart.cartItems[cartItemIndex] = cartItem;
            } else {
                cart.cartItems.push(cartItem);
            }
            return this.cartRepo.save(cart);
        } else {
            cart = this.cartRepo.create({ user: user, cartItems: [cartItem] });
            return this.cartRepo.save(cart);
        }
    }

    async updateCart(user: UserJWT, updateCartDto: UpdateCartDto) {
        const cartItem = await this.cartItemService.findOne(updateCartDto.productId);
        const cart = await this.cartRepo.findOne({ where: { user } });
        if (!cart) {
            throw new NotFoundException('There is no cart associated with the user');
        }
        const indexOfCartItem = cart.cartItems.findIndex((item) => item === cartItem);
        cart.cartItems[indexOfCartItem].quantity += updateCartDto.quantity;
        return this.cartRepo.save(cart);
    }

    async displayCart(user: UserJWT) {
        const cart = await this.cartRepo.findOne({ where: { id: user.userId } });
        if (!cart) {
            throw new NotFoundException('Cart was not found');
        }
        return cart;
    }

    async deleteCart(user: UserJWT) {
        const cart = await this.cartRepo.find({ where: { user: user } });
        if (!cart) {
            throw new NotFoundException('Cart was not found');
        }
        return this.cartRepo.remove(cart);
    }
}
