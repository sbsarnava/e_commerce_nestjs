import { Test, TestingModule } from '@nestjs/testing';
import { CartItemService } from './cart-item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';

describe('CartItem', () => {
    let service: CartItemService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CartItemService,
                { provide: getRepositoryToken(CartItem), useValue: {} },
                ProductsService,
                { provide: getRepositoryToken(Product), useValue: {} },
            ],
        }).compile();

        service = module.get<CartItemService>(CartItemService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
