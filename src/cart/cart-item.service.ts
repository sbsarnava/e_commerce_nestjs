import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ProductAddToCartDTO } from './dto/product-add-to-cart.dto';

@Injectable()
export class CartItemService {
    constructor(@InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>, private productsService: ProductsService) {}

    async create(productAddToCartDTO: ProductAddToCartDTO): Promise<CartItem> {
        const product = this.productsService.findOne(productAddToCartDTO.productId);
        if (!product) {
            throw new NotFoundException('Product Not Found');
        }
        const cartItem = this.cartItemRepo.create({ productId: await product, quantity: productAddToCartDTO.quantity });
        if (!cartItem) {
            throw new BadRequestException();
        }
        return cartItem;
    }
}
