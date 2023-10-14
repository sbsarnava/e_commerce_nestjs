import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductAddToCartDTO } from './dto/product-add-to-cart.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserJWT } from 'src/models/user-jwt.model';
import { UpdateCartDto } from './dto/update-cart.dto';
import { IscustomerCartInterceptor } from './interceptors/iscustomer/iscustomer.interceptor';
import { IsCustGuard } from 'src/guards/iscust/iscust.guard';
import { UtilService } from 'src/util/util.service';
import { DeleteCartitem } from './dto/delete-cart-item.dto';
import { IscustomerCartItemInterceptor } from './interceptors/iscustomer-cart-item/iscustomer-cart-item.interceptor';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@ApiHeader({
  name: 'Authentication',
  description: 'JWT Bearer Token',
})
@Controller('cart')
@UseGuards(AuthGuard, IsCustGuard)
export class CartController {
  constructor(private readonly cartService: CartService, private readonly utilService: UtilService) {}

  @ApiResponse({ status: 201, description: 'The item has been added' })
  @Post('add-to-cart')
  @UseInterceptors(IscustomerCartInterceptor)
  addToCart(@Body() productAddToCartDTO: ProductAddToCartDTO, @Request() request: any) {
    const user: UserJWT = request.user;
    return this.cartService.addToCart(productAddToCartDTO, user);
  }

  @ApiResponse({ status: 201, description: 'The cart has been successfully updated.'})
  @Post('update-cart')
  @UseInterceptors(IscustomerCartItemInterceptor)
  updateCart(@Body() updateCart: UpdateCartDto, @Request() request: any) {
    const user: UserJWT = request.user;
    return this.cartService.updateCart(user, updateCart);
  }

  @ApiResponse({ status: 200, description: 'Displays cart'})
  @Get()
  @UseInterceptors(IscustomerCartInterceptor)
  displayCart(@Request() request: any) {
    const user: UserJWT = request.user;
    return this.cartService.displayCart(user);
  }

  @ApiResponse({ status: 200, description: 'The cart has been successfully deleted.'})
  @Delete()
  deleteCart(@Request() request: any) {
    const user: UserJWT = request.user;
    return this.cartService.deleteCart(user);
  }

  @ApiResponse({ status: 200, description: 'The item has been successfully deleted.'})
  @Post('delete-item')
  @UseInterceptors(IscustomerCartItemInterceptor)
  deleteItem(@Request() request: any, @Body() deleteCartItem: DeleteCartitem) {
    const user: UserJWT = this.utilService.getUserFromRequest(request);
    return this.cartService.deleteCartItem(deleteCartItem.cartItemId);
  }
}
