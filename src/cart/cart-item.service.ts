import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ProductAddToCartDTO } from './dto/product-add-to-cart.dto';

@Injectable()
export class CartItemService {
    constructor(@InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>, private productsService: ProductsService) {}

    async findOne(productId: number) {
        const product = await this.productsService.findOne(productId);
        if (!product) {
            throw new NotFoundException('Product Not Found');
        }
        return this.cartItemRepo.findOne({ where: { product } });
    }

    async create(productAddToCartDTO: ProductAddToCartDTO): Promise<CartItem> {
        const product = await this.productsService.findOne(productAddToCartDTO.productId);
        if (!product) {
            throw new NotFoundException('Product Not Found');
        }
        let cartItem = await this.cartItemRepo.findOne({ where: { id: product.id } });
        if (cartItem) {
            cartItem.quantity += productAddToCartDTO.quantity;
            return this.cartItemRepo.save(cartItem);
        } else {
            cartItem = this.cartItemRepo.create({ product: product, quantity: productAddToCartDTO.quantity });
            return this.cartItemRepo.save(cartItem);
        }
    }

    remove(cartItem: CartItem) {
        return this.cartItemRepo.remove(cartItem);
    }
}
