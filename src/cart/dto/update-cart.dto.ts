import { PartialType } from '@nestjs/mapped-types';
import { ProductAddToCartDTO } from './product-add-to-cart.dto';

export class UpdateCartDto extends PartialType(ProductAddToCartDTO) {}
