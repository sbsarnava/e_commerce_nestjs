import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductAddToCartDTO } from './dto/product-add-to-cart.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add-to-cart')
    @UseGuards(AuthGuard)
    addToCart(@Body() productAddToCartDTO: ProductAddToCartDTO, @Request() request: any) {
        const user: User = request.user;
        return this.cartService.addToCart(productAddToCartDTO, user);
    }

    @Get()
    findAllItemsInCart() {
        return this.cartService.findAll();
    }

    @Get(':id')
    findOneItemInCart(@Param('id') id: string) {
        return this.cartService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
        return this.cartService.update(+id, updateCartDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cartService.remove(+id);
    }
}
