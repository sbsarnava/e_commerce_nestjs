import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductAddToCartDTO } from './dto/product-add-to-cart.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserJWT } from 'src/models/user-jwt.model';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add-to-cart')
    @UseGuards(AuthGuard)
    addToCart(@Body() productAddToCartDTO: ProductAddToCartDTO, @Request() request: any) {
        const user: UserJWT = request.user;
        return this.cartService.addToCart(productAddToCartDTO, user);
    }

    @Post('update-cart')
    @UseGuards(AuthGuard)
    updateCart(@Body() updateCart: UpdateCartDto, @Request() request: any) {
        const user: UserJWT = request.user;
        return this.cartService.updateCart(user, updateCart);
    }

    @Get()
    @UseGuards(AuthGuard)
    displayCart(@Request() request: any) {
        const user: UserJWT = request.user;
        return this.cartService.displayCart(user);
    }

    @Delete()
    @UseGuards(AuthGuard)
    deleteCart(@Request() request: any) {
        const user: UserJWT = request.user;
        return this.cartService.deleteCart(user);
    }
}
